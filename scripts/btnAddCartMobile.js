//Contador
const btnPlus = document.getElementById('btnPlus');
const btnMinus = document.getElementById('btnMinus');
const numberTag = document.getElementById('number');

const sum = () => {
    const currentValue = Number(numberTag.innerText);
    numberTag.innerText = currentValue + 1;
}

btnMinus.addEventListener('click', () => {
    const currentValue = Number(numberTag.innerText);
    numberTag.innerText = currentValue - 1
});

btnPlus.addEventListener('click', sum);
