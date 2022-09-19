//
let burgerBtn = document.querySelector('.burger__btn');
let lines = burgerBtn.children;
let boxMenu = document.querySelector('.header__box_popup-menu');

burgerBtn.addEventListener('click', function() {
  for (let line of lines) {
    line.classList.toggle('active');
    boxMenu.classList.toggle('active');
  }
});

//

let itemsMenu = document.querySelectorAll('.menu__toggle');

for (let item of itemsMenu) {
  item.addEventListener('click', function() {
    let submenu = item.nextElementSibling;
    item.classList.toggle('active');
    submenu.classList.toggle('active');
  })
}

//

let navigationBtns = document.querySelectorAll('.navigation__title-btn');

for (let btn of navigationBtns) {
  btn.addEventListener('click', function() {
    this.lastElementChild.classList.toggle('active');

    let menu = this.parentElement.nextElementSibling;
    menu.classList.toggle('active');
  })
}

//

let upwardsChat = document.querySelector('.upwards__box_chat');
let upwardsChatBtn = document.querySelector('.upwards__messengers-btn');

upwardsChat.addEventListener('click', function() {
  upwardsChat.classList.add('active');
});

upwardsChatBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  upwardsChat.classList.remove('active');
})

//

let arrowTop = document.querySelector('.upwards__box_arrow');

arrowTop.addEventListener('click', function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
});
