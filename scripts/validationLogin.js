const urlApiUser = "https://miniback-ecommerce-dev-xtxr.2.us-1.fl0.io/users";
const user = document.querySelector('.form__user');
const password = document.querySelector('.form__password');
const formLogin = document.getElementById('formLogin');
const incorrectInfoMessage = document.querySelector('.main__incorrectInfo')
const btnTryAgain = document.getElementById('btnTryAgain')

const getFormInfo = async () => {
    try {
        const response = await fetch(urlApiUser);
        const data = await response.json();

        if (user.value === data.user && password.value === data.password) {
            window.location.href = "./currentProducts.html"
        }
        else {
            incorrectInfoMessage.classList.add('main__incorrectInfo--active')
        }
    } catch (error) {
        console.log(error)
    }
}

formLogin.addEventListener('submit', (event) => {
    event.preventDefault()
    getFormInfo()
})

btnTryAgain.addEventListener('click', () => {
    incorrectInfoMessage.classList.remove('main__incorrectInfo--active')
})
