$(() => {
  const allTaggings = {
    content_type: 'everything',
    topic_area: 'all topic areas'
  }
  fetchFilteredTaggings(allTaggings)
  loadDropDownTags()
})

function loadDropDownTags() {
  $.get({
    url: '/tags.json',
    dataType: 'json',
  }).done((response) => {
    const contentTypes = response.filter(tag => tag.data.attributes.tag_type === 'content_type')
    const contentTypesSelectOptions = contentTypes.slice(0, 3).map(tag => `<option data-id=${tag.data.attributes.id} value=${tag.data.attributes.title} class="find-out__tag-title">${tag.data.attributes.title}</option>`).join('')
    const contentTypesDropdown = (`<select><option value='everything' selected>everything</option>${contentTypesSelectOptions}</select`)
    document.getElementById('find-out__dropdown-content-type').innerHTML = contentTypesDropdown

    const topicAreas = response.filter(tag => tag.data.attributes.tag_type === 'topic_area')
    const topicAreasSelectOptions = topicAreas.map(tag => `<option data-id=${tag.data.attributes.id} value=${tag.data.attributes.title} class="find-out__tag-title">${tag.data.attributes.title}</option>`).join('')
    const topicAreasDropdown = (`<select><option value='all topic areas' selected>all topic areas</option>${topicAreasSelectOptions}</select`)
    document.getElementById('find-out__dropdown-topic-area').innerHTML = topicAreasDropdown

    onTagClick()
  })
}

const closeOverlay = () => {
  $('div.overlay').on('click', (event) => {
    event.preventDefault()
    $('div.overlay').html('').removeClass('overlay')
  })
}

const openOverlay = () => {
  $('div.overlay').html('')
  $('body').append('<div class="overlay"></div>')
}

// const onDropdownMouseOver = () => {
//   const showDropdown = () => {
//     console.log('showDropdown ... ')
//   }
//   const hideDropdown = () => {
//     console.log('hideDropdown ... ')
//   }

//   $('select').hover(showDropdown, hideDropdown, function (event) {
//     event.preventDefault()
//       const selectedOptions = Array.from(document.getElementsByTagName('option')).filter(tag => tag.selected)
//       const dataObject = {
//         content_type: selectedOptions[0].innerText,
//         topic_area: selectedOptions[1].innerText
//       }
//       console.log('content_type: ', dataObject.content_type)
//     console.log('[onDropdownMouseOver event]: ', event)

//     openOverlay()
//     onTagClick()
//     closeOverlay()
//   })
// }

const onTagClick = () => {
  $('select').on('change', (event) => {
    event.preventDefault()

    const selectedOptions = Array.from(document.getElementsByTagName('option')).filter(tag => tag.selected)
    const dataObject = {
      content_type: selectedOptions[0].innerText,
      topic_area: selectedOptions[1].innerText
    }

    openOverlay()
    fetchFilteredTaggings(dataObject)
  })
}

const loadTopicAreaNarrative = (title, body) => {

  $('.find-out__topic-area-narrative-title').text(title)
  $('.find-out__topic-area-narrative-body').text(body)
}

const fetchFilteredTaggings = (dataObject) => {
  $.get({
    url: '/taggings.json',
    dataType: 'json',
    data: dataObject,
  }).done(response => {
    loadTopicAreaNarrative(dataObject.topic_area, response.topic_area_narrative)

    const resultsDiv = $('.find-out__results')
    resultsDiv.empty()

    response.taggings.forEach(res => {
      if (res.data.attributes.announcement_id) {
        createAnnouncement(res, resultsDiv)
      }
      if (res.data.attributes.event_id) {
        createEvent(res, resultsDiv)
      }
      if (res.data.attributes.report_id) {
        createReport(res, resultsDiv)
      }
    })
    closeOverlay()
  })
}

function createAnnouncement(obj, resultsDiv) {
  $.get(`/announcements/${obj.data.attributes.announcement_id}.json`)
    .then(announcementResponse => {
      const announcement = new Announcement(announcementResponse)
      const announcementCard = announcement.announcementCardHtml()
      resultsDiv.append(announcementCard)
    })
}

function createEvent(obj, resultsDiv) {
  $.get(`/events/${obj.data.attributes.event_id}.json`)
    .then(eventResponse => {
      const event = new Event(eventResponse)
      const eventCard = event.eventCardHtml()
      resultsDiv.append(eventCard)
    })
}

function createReport(obj, resultsDiv) {
  $.get(`/reports/${obj.data.attributes.report_id}.json`)
    .then(reportResponse => {
      const report = new Report(reportResponse)
      const reportCard = report.reportCardHtml()
      resultsDiv.append(reportCard)
    })
}

class Event {
  constructor(obj) {
    // this.id = obj.data.id //not nested under attributes
    // this.type = obj.data.type //not nested under attributes
    this.tags = obj.data.attributes.tags //NOTE: nested array, create tagsHtml variable in eventCardHtml
    // this.address = obj.data.attributes.address
    // this.city = obj.data.attributes.city
    // this.description = obj.data.attributes.description
    // this.end = obj.data.attributes.end
    // this.event_type = obj.data.attributes.event_type
    // this.image_id = obj.data.attributes.image_id
    // this.position = obj.data.attributes.position
    // this.registration_link = obj.data.attributes.registration_link
    // this.start = obj.data.attributes.start
    this.title = obj.data.attributes.title
    // this.zipcode = obj.data.attributes.zipcode
  }
}

Event.prototype.eventCardHtml = function () {
  const tagsHtml = this.tags.map(tag => {
    return (`
      <span><em> *${tag.title}</em></span>
    `)
  }).join('')
  return (`
  <div class="find-out__tagged-item">
    <h3><strong>Event: </strong>${this.title}</h3>
    <p><strong>Tags: </strong>${tagsHtml}</>
  </div>
`)
}

class Announcement {
  constructor(obj) {
    this.title = obj.data.attributes.title
    this.tags = obj.data.attributes.tags
    this.id = obj.data.attributes.id
    this.title = obj.data.attributes.title
    this.link = obj.data.attributes.link
    this.image_id = obj.data.attributes.image_id
    this.position = obj.data.attributes.position
  }
}

Announcement.prototype.announcementCardHtml = function () {
  const tagsHtml = this.tags.map(tag => {
    return (`
      <span><em> *${tag.title}</em></span>
    `)
  }).join('')
  return (`
  <div class="find-out__tagged-item">
    <h3><strong>News: </strong>${this.title}</h3>
    <p><strong>Tags: </strong>${tagsHtml}</>
  </div>
`)
}

class Report {
  constructor(obj) {
    this.title = obj.data.attributes.title
    this.tags = obj.data.attributes.tags
    this.id = obj.data.attributes.id
    this.title = obj.data.attributes.title
    this.link = obj.data.attributes.link
    this.image_id = obj.data.attributes.image_id
    this.position = obj.data.attributes.position
  }
}

Report.prototype.reportCardHtml = function () {
  const tagsHtml = this.tags.map(tag => {
    return (`
      <span><em> *${tag.title}</em></span>
    `)
  }).join('')
  return (`
  <div class="find-out__tagged-item">
    <h3><strong>Publication: </strong>${this.title}</h3>
    <p><strong>Tags: </strong>${tagsHtml}</>
  </div>
`)
}