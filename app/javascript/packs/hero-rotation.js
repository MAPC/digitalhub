$(() => {
  setTimeout(() => {
    getImages()
  }, 5000);
});

let counter = 0
let imagesList = []
let baseUrl = window.location.href

if (baseUrl.match(/\/$/)) {
  baseUrl = baseUrl.replace(/\/$/i, "")
} if (baseUrl.match(/\/..?$/i)) {
  baseUrl = baseUrl.replace(/\/..?$/i, "")
  baseUrl = baseUrl.replace(/\/..?$/i, "")
}

const getImages = () => {
  $.get(`${baseUrl}/hero_images`)
    .done(response => {
      counter = response.length
      imagesList = response
      cacheImages(response)
      loadImages(response)
    })
};

const cacheImages = (images) => {
  for (let i = 0; i < images.length; i++) {
    $.get(images[i].included[0].attributes.hero_image_thumbnail_url)
  }
};

const loadImages = (images) => {
  let index = 0
  for (let i = 0; i < images.length; i++) {
    setTimeout(() => {
    }, i * 1000);

    setTimeout(() => {
      loadImage(images[i], images[i + 1])

      if (index < images.length) {
        loadImages(images[index]);
        index++
      }
    }, i * 3000);
  }
};

const loadImage = (imageCurrent, imageNext) => {
  counter -= 1
  let hero = $('.styled-box')[0];

  if (imageCurrent) {
    let imgCurrentUrl = `${baseUrl}${imageCurrent.included[0].attributes.hero_image_thumbnail_url}`
    hero.style.backgroundImage = `url(${imgCurrentUrl})`
  }

  if (imageNext) {
    let imageNextUrl = `${baseUrl}${imageNext.included[0].attributes.hero_image_thumbnail_url}`
    hero.style.backgroundImage = `url(${imageNextUrl})`
  }

  if (counter == 0) {
    setTimeout(() => {
      replay()
    }, 5000);
  }
}

const replay = () => {
  counter = imagesList.length
  loadImages(imagesList)
};
