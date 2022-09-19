let slider = document.getElementById('slider-vanilla'),
    sliderItems = document.getElementById('slider-vanilla__box'),
    prev = document.getElementsByClassName('brands__arrow-prev'),
    next = document.getElementsByClassName('brands__arrow-next');

function slide(wrapper, items, prevBtns, nextBtns) {
  let posInitial,
      slides = items.getElementsByClassName('slider-vanilla__item'),
      slidesLength = slides.length,
      width = window.getComputedStyle(slides[0]).minWidth,
      margin = window.getComputedStyle(slides[0]).marginRight,
      slideSize = parseInt(width) + parseInt(margin),
      index = 0;

  for (let i = 0; i < slidesLength; i++) {
    let clone = slides[i].cloneNode(true);
    if (i === slidesLength - 1) {
      items.insertBefore(clone, slides[0]);
    } else {
      items.appendChild(clone);
    }
  }

  wrapper.classList.add('loaded');
  items.style.left = "-" + getAdaptiveNum() + "px";

  for (let btn of prevBtns) {
    btn.addEventListener('click', function () { shiftSlide(-1) });
  }
  for (let btn of nextBtns) {
    btn.addEventListener('click', function () { shiftSlide(1) });
  }
  items.addEventListener('transitionend', checkIndex);
  window.addEventListener('resize', function() {
    items.style.left = "-" + getAdaptiveNum() + "px";
    width = window.getComputedStyle(slides[0]).minWidth;
    margin = window.getComputedStyle(slides[0]).marginRight;
    slideSize = parseInt(width) + parseInt(margin);
    for (let slide of slides) { slide.style.opacity = '1'; }
    changeOpacity(index);
  });

  function getAdaptiveNum() {
    let num = 486;
    if (document.body.clientWidth >= 1920) {
      num = 486;
    } else if (document.body.clientWidth <= 600) {
      num = 333;
      num += (600 - document.body.clientWidth) / 2;
    } else {
      num += (1920 - document.body.clientWidth) / 2;
    }
    return num;
  }

  function shiftSlide(dir) {
    items.classList.add('shifting');
    posInitial = items.offsetLeft;

    if (dir == 1) {
      for (let slide of slides) { slide.style.opacity = '1'; }
      items.style.left = (posInitial - slideSize) + "px";
      index++;
      changeOpacity(index);
    } else if (dir == -1) {
      for (let slide of slides) { slide.style.opacity = '1' }
      items.style.left = (posInitial + slideSize) + "px";
      index--;
      changeOpacity(index);
    }
  }

  function changeOpacity(index) {
    if (document.body.clientWidth > 426) {
      if (index === -1) {
        slides[8].style.opacity = '0.1';
        slides[15].style.opacity = '0.1';
        slides[9].style.opacity = '0.5';
        slides[14].style.opacity = '0.5';
      } else if (index === slidesLength) {
        slides[1].style.opacity = '0.1';
        slides[8].style.opacity = '0.1';
        slides[2].style.opacity = '0.5';
        slides[7].style.opacity = '0.5';
      } else {
        slides[index + 1].style.opacity = '0.1';
        slides[index + 8].style.opacity = '0.1';
        slides[index + 2].style.opacity = '0.5';
        slides[index + 7].style.opacity = '0.5';
      }
    } else {
      if (index === -1) {
        slides[9].style.opacity = '0';
        slides[12].style.opacity = '0';
      } else if (index === slidesLength) {
        slides[2].style.opacity = '0';
        slides[5].style.opacity = '0';
      } else {
        slides[index + 2].style.opacity = '0';
        slides[index + 5].style.opacity = '0';
      }
    }
  }
    
  function checkIndex () {
    items.classList.remove('shifting');
    let indent = getAdaptiveNum() - slideSize;
    if (index === -1) {
      items.style.left = (-(slidesLength * slideSize) - indent) + "px";
      index = slidesLength - 1;
    }
    if (index === slidesLength) {
      items.style.left = (-(1 * slideSize) - indent) + "px";
      index = 0;
    }
  }
}

slide(slider, sliderItems, prev, next);