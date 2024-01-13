const urlApiProducts = "https://miniback-ecommerce-dev-xtxr.2.us-1.fl0.io/products";
const inputsForm = document.querySelectorAll('.form__input')
const form = document.getElementById('createProduct')
const validationForm = document.querySelector('.incorrect')
const saveProductMessage = document.querySelector('.correct')

form.addEventListener('submit', (event) => {
    saveNewProduct(event)
})


const saveNewProduct = (event) => {
    event.preventDefault()
    if (!inputsForm[0].value || !inputsForm[1].value || !inputsForm[2].value || !inputsForm[3].value || !inputsForm[4].value || !inputsForm[4].value) {
        validationForm.classList.add('incorrect--active')
        return
    }

    const newProduct = {
    categoryName: inputsForm[2].value,
    productName: inputsForm[0].value,
    productImage: inputsForm[1].value,
    productPrice: Number(inputsForm[4].value),
    priceDiscount: Number(inputsForm[5].value),
    stock: Number(inputsForm[3].value),
    isTop: inputsForm[6].checked?true:false
    }

    validationForm.classList.remove('incorrect--active')
    saveProductMessage.classList.add('correct--active')
    setTimeout(() =>{
        saveProductMessage.classList.remove('correct--active')
    }, 10000)
    form.reset()
    postNewProduct(newProduct)
}


const postNewProduct = async (product) => {
    try {
        const response = await fetch(urlApiProducts, {
            method:'POST',
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json"
            }
        });
        return response
    } catch(error) {
        console.log(error)
        return error
    }
}