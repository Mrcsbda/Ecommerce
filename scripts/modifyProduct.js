const urlApiProducts = "https://miniback-ecommerce-production.up.railway.app/products";
const inputsForm = document.querySelectorAll('.form__input');
const form = document.getElementById('modifyProduct')
const saveProductMessage = document.querySelector('.correct')
const returnBtn = document.querySelector('.main__return')
let id;


const getInfoId = async () => {
    id = JSON.parse(localStorage.getItem('idProductToModify'));

    const response = await fetch(`${urlApiProducts}/${id}`);
    const data = await response.json()

    inputsForm[0].value = data.productName;
    inputsForm[1].value = data.productImage;
    inputsForm[2].value = data.categoryName;
    inputsForm[3].value = data.stock;
    inputsForm[4].value = data.productPrice;
    inputsForm[5].value = data.priceDiscount;
    inputsForm[6].checked = data.isTop?true:false;
}

const modifyProduct = async (id,event) => {
    event.preventDefault()
    const newProduct = {
        categoryName: inputsForm[2].value,
        productName: inputsForm[0].value,
        productImage: inputsForm[1].value,
        productPrice: Number(inputsForm[4].value),
        priceDiscount: Number(inputsForm[5].value),
        stock: Number(inputsForm[3].value),
        isTop: inputsForm[6].checked?true:false
        }

    const response = await fetch(`${urlApiProducts}/${id}`, {
        method: 'PATCH',
            body: JSON.stringify(newProduct),
            headers: {
                "Content-type": "application/json"
            }
    });
    saveProductMessage.classList.add('correct--active')
    setTimeout(() =>{
        saveProductMessage.classList.remove('correct--active')
    }, 10000)
}

form.addEventListener('submit', (event) => {
    modifyProduct(id,event)
})

returnBtn.addEventListener('click', ()=> {
    window.location.href = "./currentProducts.html"
    localStorage.clear()
})

getInfoId()