window.addEventListener('load', () => {

  const heroBackgroundSpeed = 5000;
  const checkWidth = () => {
    return document.documentElement.clientWidth > 965
  }

  const getBaseURL = () => {
    let baseUrl = window.location.href

    if (baseUrl.match(/\/$/)) {
      baseUrl = baseUrl.replace(/\/$/i, "")
    } if (baseUrl.match(/\/..?$/i)) {
      baseUrl = baseUrl.replace(/\/..?$/i, "")
    }

    return baseUrl
  };

  const getElements = (elements) => {
    return [
      elements.filter(el => el.classList.contains('active'))[0],
      elements.filter(el => !el.classList.contains('active'))[0],
    ];
  };
  const getImageElements = getElements.bind(null, Array.from(document.querySelectorAll('.hero-banner .styled-box__background-image')));

  const getNextImage = (images, current) => {
    const nextImageIndex = images.indexOf(current) + 1;
    return images.length <= nextImageIndex ? 0 : nextImageIndex;
  };

  const renderNextImage = images => {
    const [activeElem, inactiveElem] = getImageElements();
    const nextImage = images[getNextImage(images, activeElem.style.backgroundImage)];
    inactiveElem.style.backgroundImage = nextImage;

    inactiveElem.classList.add('active');
    activeElem.classList.remove('active');

    if (checkWidth()) {
      setTimeout(() => {
        renderNextImage(images)
      }, heroBackgroundSpeed);
    }
  };

  $.get(`${getBaseURL()}/hero_images`).done(response => {
    const images = response.map(res => `url("${res.included[0].attributes.hero_image_thumbnail_url}")`);
    if (checkWidth()) {
      setTimeout(() => {
        renderNextImage(images);
      }, heroBackgroundSpeed)
    }
  });

  const rotationTest = () => {
    let defaultImage = "url(/assets/bike-lane-9a390139592f024c13cf339a039dec2e7a7f42b5bb5a1951f59c0f55ddf6ab56.jpg)"
    let imageDivs = Array.from(getImageElements())
    return imageDivs[0].style.backgroundImage != defaultImage
  };

  window.rotationTest = rotationTest;
});
