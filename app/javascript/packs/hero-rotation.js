/*
$(() => {
  if (checkWidth()) {
    setTimeout(() => {
      getImages()
    }, 4000);
  }
});

let counter = 0
let imagesList = []
let baseUrl = window.location.href

if (baseUrl.match(/\/$/)) {
  baseUrl = baseUrl.replace(/\/$/i, "")
} if (baseUrl.match(/\/..?$/i)) {
  baseUrl = baseUrl.replace(/\/..?$/i, "")
}

const checkWidth = () => {
  return document.documentElement.clientWidth > 965
}

const getImages = () => {
  $.get(`${baseUrl}/hero_images`)
    .done(response => {
      counter = response.length
      imagesList = response

      setTimeout(() => {
        loadImages(response)
      }, 4000);
    })
};

const loadImages = (images) => {
  let index = 0
  for (let i = 0; i < images.length; i++) {
    setTimeout(() => {
      cacheImage(images[i])
    }, i * 2000);

    setTimeout(() => {
      loadImage(images[i])

      if (index < images.length) {
        loadImages(images[index]);
        index++
      }
    }, i * 6000);
  }
};

const cacheImage = (img) => {
  let imgUrl = `${baseUrl}${img.included[0].attributes.hero_image_thumbnail_url}`
  let newImage = new Image()
  newImage.src = imgUrl
  $('div.image-cache')[0].style.backgroundImage = `url(${imgUrl})`
}

const loadImage = (img) => {
  counter -= 1
  let hero = $('.styled-box')[0];

  if (img && checkWidth()) {
    let imgUrl = `${baseUrl}${img.included[0].attributes.hero_image_thumbnail_url}`

    hero.style.backgroundImage = `url(${imgUrl})`
    hero.classList.add('rotation-test')
  }

  if (counter == 0) {
    setTimeout(() => {
      replay()
    }, 5000);
  }
}

const replay = () => {
  counter = imagesList.length
  if (checkWidth()) {
    loadImages(imagesList)
  }
};
*/


window.addEventListener('load', () => {

    const heroBackgroundSpeed = 6000;

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
        const [ activeElem, inactiveElem] = getImageElements();
        const nextImage = images[getNextImage(images, activeElem.style.backgroundImage)];
        inactiveElem.style.backgroundImage = nextImage;

        inactiveElem.classList.add('active');
        activeElem.classList.remove('active');

        setTimeout(() => {
            renderNextImage(images);
        }, heroBackgroundSpeed);
    };

    $.get(`${getBaseURL()}/hero_images`).done(response => {
        const images = response.map(res => `url("${res.included[0].attributes.hero_image_thumbnail_url}")`);

        setTimeout(() => {
            renderNextImage(images);
        }, heroBackgroundSpeed);
    });
});
