const btnOpenMenu = document.getElementById('btnOpenMenu');
const btnCloseMenu = document.getElementById('btnCloseMenu');
const navMobile = document.querySelector('.header__navMobile');

btnOpenMenu.addEventListener('click', ()=> {
    navMobile.classList.add('header__navMobile--active')
    document.body.classList.add('body__navMobile--active')
})


btnCloseMenu.addEventListener('click', ()=> {
    navMobile.classList.remove('header__navMobile--active')
    document.body.classList.remove('body__navMobile--active')
})