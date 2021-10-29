class Report {
  constructor(reportResponse) {
    this.title = reportResponse.data.attributes.title;
    this.tags = reportResponse.data.attributes.tags;
    this.id = reportResponse.data.id;
    this.title = reportResponse.data.attributes.title;
    this.link = reportResponse.data.attributes.link;
    this.image_url = reportResponse.included[0].attributes.url;
    this.position = reportResponse.data.attributes.position;
    this.date = reportResponse.data.attributes.date;
  }
}

Report.prototype.reportCardHtml = function reportCardHtml() {
  const tags = this.tags.map(tag => {
    return tag.tag_type === 'topic_area' ? (`<span>${tag.title}</span>`) : null;
  }).join('');

  return (`
    <div class="card" data-sortdate="${Date.parse(this.date)}">
      <a href="/reports/${this.id}">
        <img class="card__image" src=${this.image_url} />
      </a>
      <div class="card__content-type">PUBLICATION</div>
      <div class="card__title">
        <a class="card__link" href="/reports/${this.id}">${this.title}</a>
        <div class="card__tags">tags: ${tags}</div>
      </div>
    </div>
  `);
};

class Event {
  constructor(eventResponse) {
    this.id = eventResponse.data.id;
    this.type = eventResponse.data.type;
    this.tags = eventResponse.data.attributes.tags;
    this.title = eventResponse.data.attributes.title;
    this.event_type = eventResponse.data.attributes.event_type;
    this.image_url = eventResponse.included[0].attributes.url;
    this.description = eventResponse.data.attributes.description;
    this.registration_link = eventResponse.data.attributes.registration_link;
    this.start = eventResponse.data.attributes.start;
    this.end = eventResponse.data.attributes.end;
    this.address = eventResponse.data.attributes.address;
    this.city = eventResponse.data.attributes.city;
    this.state = eventResponse.data.attributes.state;
    this.zipcode = eventResponse.data.attributes.zipcode;
  }

  static nextThreeHtml(events) {
    const receiveUpdatesUrl = $('.next-three-events__receive-updates-url')[0].innerHTML;
    const noEventsMessageHtml = (`
      <div>
        <div class="next-three-events__event--title">No upcoming events at this time.</div>
        <div class="next-three-events__button--receive-updates">
        <a class="button" rel="noopener noreferrer" href="${receiveUpdatesUrl}" target="_blank">Receive Updates</a>
        </div>
      </div>
      `);

    const nextThreeEventsHtml = events.map(event => {
      const eventDateAndHours = `${moment(event.start).format('MMM Do, h:mmA')} - ${moment(event.end).format('h:mmA')}`;
      return (`
      <a href='/events/${event.id}' style='text-decoration: none'>
        <div class='next-three-events__event'>
          <div class='next-three-events__title'>${event.title}</div>
          <div class='next-three-events__content'>${eventDateAndHours} | ${event.city}</div>
        </div>
      </a>
      `);
    }).join('');

    return (`
      <div class="card">
        <div class="next-three-events">
          <div class="next-three-events__header">Join us for an event!<span class="next-three-events__triangle"></span></div>
          <div class="next-three-events__events">
            ${events.length > 0 ? nextThreeEventsHtml : noEventsMessageHtml}
          </div>
        </div>
      </div>
    `);
  }
}

Event.prototype.eventCardHtml = function eventCardHtml() {
  const tags = this.tags.map(tag => {
    return tag.tag_type === 'topic_area' ? (`<span>${tag.title}</span>`) : null;
  }).join('');

  const eventType = new Date(this.end) > new Date()  ? 'UPCOMING EVENT' : 'PAST EVENT';

  return (`
    <div class="card" data-sortdate="${Date.parse(this.start)}">
      <a href="/events/${this.id}">
        <img class="card__image" src=${this.image_url} />
      </a>
      <div class="card__content-type">${eventType}</div>
      <div class="card__title">
        <a class="card__link" href="/events/${this.id}">${this.title}</a>
        <div class="card__tags">tags: ${tags}</div>
      </div>
    </div>
  `);
};

class Announcement {
  constructor(announcementResponse) {
    this.id = announcementResponse.data.id;
    this.title = announcementResponse.data.attributes.title;
    this.body = announcementResponse.data.attributes.body;
    this.tags = announcementResponse.data.attributes.tags;
    this.link = announcementResponse.data.attributes.link;
    this.image_url = announcementResponse.included[0].attributes.url;
    this.published_date = announcementResponse.data.attributes.published_date;
  }
}

Announcement.prototype.announcementCardHtml = function announcementCardHtml() {
  const tags = this.tags.map(tag => {
    return tag.tag_type === 'topic_area' ? (`<span>${tag.title}</span>`) : null;
  }).join('');

  return (`
    <div class="card" data-sortdate="${Date.parse(this.published_date)}">
      <a href="/announcements/${this.id}">
        <img class="card__image" src=${this.image_url} />
      </a>
      <div class="card__content-type">NEWS</div>
      <div class="card__title">
        <a class="card__link" href="/announcements/${this.id}">${this.title}</a>
        <div class="card__tags">tags: ${tags}</div>
      </div>
    </div>
  `);
};

function loadDropdowns(initialTaggings) {
  $.get({
    url: '/tags.json',
    dataType: 'json',
  }).done((response) => {
    const contentTypeDropdown = (`<select class="content-type__select content-type__dropdown">
      <option id='all-content-types' value='everything' ${initialTaggings.content_type === 'everything' ? 'selected' : ''}>everything</option>${
       response.filter(tag => tag.data.attributes.tag_type === 'content_type' && tag.data.attributes.title !== 'calls to action' && tag.data.attributes.title !== 'datasets')
        .map((tag) => (`<option data-id=${tag.data.attributes.id} value=${tag.data.attributes.title} class="find-out__tag-title" ${initialTaggings.content_type === tag.data.attributes.title ? 'selected' : 'ex'}>
        ${tag.data.attributes.title}
      </option>`))
      .join('')
     }</select>`)

     $('.content-type')[0].innerHTML = `You're looking for ${contentTypeDropdown}`;

    const topicAreaDropdown = (`<select class="topic-area__select topic-area__dropdown">
      <option id='all-topic-areas' value='all topic areas' ${initialTaggings.topic_area === 'all-topic-areas' ? 'selected' : ''}>all topic areas</option>${
       response.filter(tag => tag.data.attributes.tag_type === 'topic_area')
        .map(tag => `<option data-id=${tag.data.attributes.id} value=${tag.data.attributes.title}  class="find-out__tag-title" ${initialTaggings.topic_area === tag.data.attributes.title ? 'selected' : ''}>
          ${tag.data.attributes.title}
        </option>`)
        .join('')
       }</select>`);
      $('.topic-area')[0].innerHTML = `in ${topicAreaDropdown}`;
    onDropdownChange();
    cueOverlay();
  });
}

const cueOverlay = () => {
  $('.content-type__select').on('click', () => {
    $('#find-out__overlay').addClass('find-out__overlay');
  });

  $('.topic-area__select').on('click', () => {
    $('#find-out__overlay').addClass('find-out__overlay');
  });
  onClickOverlay();
};

const openOverlay = () => {
  $('.current').on('click', () => {
    $('#find-out__overlay').addClass('find-out__overlay');
    onClickOverlay();
  });
};

const onClickOverlay = () => {
  $('#find-out__overlay').on('click', () => {
    $('#find-out__overlay').removeClass('find-out__overlay');
  });
};

const onDropdownChange = () => {
  $('select').niceSelect().on('change', () => {
    openOverlay();
    const dropdownSelections = Array.from($('option')).filter(tag => tag.selected);
    const dropdownsObject = {
      content_type: dropdownSelections[0].text,
      topic_area: dropdownSelections[1].text,
    };
    fetchTaggings(dropdownsObject);
    if (dropdownsObject.content_type === 'everything' && dropdownsObject.topic_area === 'all topic areas') {
      history.pushState(null, '', '/find-out');
    } else {
      history.pushState(null, '', `/find-out/${dropdownsObject.content_type}/${dropdownsObject.topic_area}`);
    }
    $('#find-out__overlay').removeClass('find-out__overlay');
  });
};

const createCards = (taggings, resultsDiv) => {
  taggings.forEach(tagging => {
    if (tagging.data.attributes.announcement_id) {
      resultsDiv.append(
        new Announcement(tagging.data.attributes.tagged_item).announcementCardHtml(),
      );
    } else if (tagging.data.attributes.report_id) {
      resultsDiv.append(
        new Report(tagging.data.attributes.tagged_item).reportCardHtml(),
      );
    } else if (tagging.data.attributes.event_id) {
      resultsDiv.append(
        new Event(tagging.data.attributes.tagged_item).eventCardHtml(),
      );
    }
  });
};

const loadRemainingCards = (taggings, resultsDiv) => {
  createCards(taggings, resultsDiv);
  $('#load-more').hide();
};

const showLoadMoreButton = (remainingCards, resultsDiv) => {
  $('#load-more')
    .show()
    .unbind('click')
    .bind('click', (event) => {
      event.preventDefault();
      loadRemainingCards(remainingCards, resultsDiv);
    });
};

const loadInitialCards = (taggings, resultsDiv, dropdownsObject) => {
  if (taggings.length === 0) {
    $('.results').html('<div class="message--none">There are currently no results for the selected filters.</div>');
    $('#load-more').hide();
  } else if (dropdownsObject.content_type === 'events') {
    createCards(taggings.slice(0, 8), resultsDiv);
    if (taggings.length > 8) {
      showLoadMoreButton(taggings.slice(8, taggings.length - 1), resultsDiv);
    } else {
      $('#load-more').hide();
    }
  } else {
    createCards(taggings.slice(0, 9), resultsDiv);
    if (taggings.length > 9) {
      showLoadMoreButton(taggings.slice(9, taggings.length), resultsDiv);
    } else {
      $('#load-more').hide();
    }
  }
};

const fetchTaggings = (dropdownsObject) => {
  $.get({
    url: '/taggings.json',
    dataType: 'json',
    data: {
      content_type: dropdownsObject.content_type,
      topic_area: dropdownsObject.topic_area.replace("%20", " ")
    },
  }).done(response => {
    const headerSmallCardsLow = () => {
      $('.find-out__header').removeClass('find-out__header--large');
      $('.results').removeClass('results--cards-high');
    };

    const nextThreeEvents = () => {
      if (dropdownsObject.content_type === 'events') {
        const nextThree = response.next_three_events.map(event => {
          return new Event(event);
        });
        $('.results').prepend(Event.nextThreeHtml(nextThree));
      }
    };

    const resetDisplay = () => {
      $('.narrative-text').empty();
      $('.results').empty()
        .removeClass('results--cards-high')
        .addClass('results--cards-high');
      $('.find-out__header')
        .removeClass('find-out__header--large')
        .addClass('find-out__header--large');
    };

    resetDisplay();
    $('.narrative-text').text(response.topic_area_narrative);

    if (dropdownsObject.topic_area === 'all topic areas' && dropdownsObject.content_type !== 'events') {
      headerSmallCardsLow();
    } else if (response.taggings.length === 0) {
      headerSmallCardsLow();
    } else if (dropdownsObject.content_type === 'events' && response.taggings.length > 0) {
      nextThreeEvents();
    }

    loadInitialCards(response.taggings, $('.results'), dropdownsObject);
    onClickOverlay();
  });
};

$(() => {
  const urlPathVariables = window.location.pathname.split('/').slice(2).map(filter => filter.replace(/%20/g, " "));
  let initialTaggings;
  if (urlPathVariables[0] && urlPathVariables[1]) {
    initialTaggings = {
      content_type: urlPathVariables[0],
      topic_area: urlPathVariables[1],
    };
  } else {
    initialTaggings = {
      content_type: 'everything',
      topic_area: 'all topic areas',
    };
  }

  fetchTaggings(initialTaggings);
  loadDropdowns(initialTaggings);
  $('title')[0].text = 'MetroCommon 2050';
});