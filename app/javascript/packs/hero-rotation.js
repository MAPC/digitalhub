$(() => {
  getImages()
});

let counter = 0
let imagesList = []

const getImages = () => {
  $.get('http://127.0.0.1:3000/hero_images')
    .done(response => {
      counter = response.length - 1
      imagesList = response
      loadImages(response)
    })
};

const loadImages = (images) => {
  let index = 0
  for (let i = 1; i < images.length; i++) {
    setTimeout(() => {
    }, i * 1000);

    setTimeout(() => {
      loadImage(images[i])

      if (index++ <= images.length) {
        loadImages(images[index]);
      }
    }, i * 5000);
  }
};

const loadImage = (img) => {
  const baseUrl = 'http://127.0.0.1:3000'
  let hero = $('.styled-box')[0];
  counter -= 1
  hero.style.backgroundImage = `url(${baseUrl}${img.included[0].attributes.hero_image_thumbnail_url})`
  replay()
}

const replay = () => {
  if (counter == 0) {
    counter = imagesList.length
    loadImages(imagesList)
  }
};
