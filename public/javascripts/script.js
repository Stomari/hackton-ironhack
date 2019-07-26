const bigBravocado = document.querySelector('#big-bravocado');

bigBravocado.addEventListener('mouseover', () => {
  bigBravocado.setAttribute('src', './images/Bravocado Character@2x_blink2.png')
});

bigBravocado.addEventListener('mouseout', () => {
  bigBravocado.setAttribute('src', './images/Bravocado Character@2x.png')
});

const fade = document.querySelector('.fade');

const fadeContainer = fade.parentElement;

const fadeContainerPos = fadeContainer.offsetTop;

window.addEventListener('scroll', () => {
  // fadeContainerPos = fadeContainer.offsetTop - fadeContainer.scrollTop;
  if (fadeContainerPos - window.innerHeight / 4 <= window.pageYOffset) {
    fade.style.opacity = '1';
    // fade.style.marginTop = '0';
    fade.style.transform = 'scale(1)';
  } else {
    fade.style.opacity = '0';
    // fade.style.marginTop = '800px';
    fade.style.transform = 'scale(0)';
  }
});
