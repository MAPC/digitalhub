window.addEventListener('load', () => {
  window.addEventListener('resize', setContainerHeight);

  let totalHeight = 0;
  const container = document.getElementById('stories');
  setContainerWidth()

  function setContainerWidth() {
    totalHeight = 0;
    for (let i = 0; i < container.children.length; i++) {
      if (container.children[i].children[0].classList.contains("story--audio")) {
        totalHeight += 10;
      } else if (container.children[i].classList.contains("story--prompt-small")) {
        totalHeight += 10;
      } else {
        totalHeight += 22.5;
      }
      container.style.height = (Math.round(totalHeight / 3)) + 'rem';
    }
  }

  function setContainerHeight() {
    if (document.documentElement.clientWidth < 1350) {
      totalHeight += 10;
      container.style.height = (Math.round(totalHeight / 3) + 25) + 'rem';
    } else if (document.documentElement.clientWidth > 600) {
      setContainerWidth()
    }
  }
});