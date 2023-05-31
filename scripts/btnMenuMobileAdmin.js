const btnMenu = document.getElementById('btnMenu');
const navMobile = document.querySelector('.header__navContainer');

btnMenu.addEventListener('click', ()=> {
    navMobile.classList.toggle('header__navContainer--active')
})
