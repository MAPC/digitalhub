window.addEventListener('load', () => {
  const heroBackgroundSpeed = 4500;
  const checkWidth = () => {
    return document.documentElement.clientWidth > 965;
  };

  const getBaseURL = () => {
    let baseUrl = window.location.href;

    if (baseUrl.match(/\/$/)) {
      baseUrl = baseUrl.replace(/\/$/i, '');
    }
    if (baseUrl.match(/\/..?$/i)) {
      baseUrl = baseUrl.replace(/\/..?$/i, '');
    }

    return baseUrl;
  };

  const getElements = elements => {
    return [
      elements.filter(el => el.classList.contains('active'))[0],
      elements.filter(el => !el.classList.contains('active'))[0],
    ];
  };

  const getImageElements = getElements.bind(
    null,
    Array.from(
      document.querySelectorAll('.hero-banner .styled-box__background-image')
    )
  );

  const getNextImage = (images, current) => {
    const nextImageIndex = images.indexOf(current) + 1;
    return images.length <= nextImageIndex ? 0 : nextImageIndex;
  };

  const renderNextImage = images => {
    const [activeElem, inactiveElem] = getImageElements();
    const nextImage =
      images[getNextImage(images, activeElem.style.backgroundImage)];
    inactiveElem.style.backgroundImage = nextImage;

    inactiveElem.classList.add('active');
    activeElem.classList.remove('active');

    if (checkWidth()) {
      setTimeout(() => {
        renderNextImage(images);
      }, heroBackgroundSpeed);
    }
  };

  let request = new XMLHttpRequest();
  request.open('GET', getBaseURL() + '/hero_images', true)
  request.onload = () => {
    if(request.status >= 200 && request.status < 400) {
      const images = JSON.parse(request.response).map(
        res => `url("${res.included[0].attributes.hero_image_thumbnail_url}")`
      );
      if (checkWidth()) {
        setTimeout(() => {
          renderNextImage(images);
        }, heroBackgroundSpeed);
      }
    } else {
      console.log('oops')
    }
  }

  request.onerror = () => {
    console.log('There was an error!')
  }

  request.send();
});
