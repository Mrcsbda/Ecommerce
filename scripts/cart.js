import { getProductsLocal } from './modalCart.js';
const urlApi = "https://ecommerce-miniback.onrender.com";
const cartContainer = document.querySelector('.main__productsToPayContainer')
const storedProductsCartString = localStorage.getItem('productsCart');
const storedProductsCart = JSON.parse(storedProductsCartString);
const subtotal = document.querySelector('.subtotal')
const total = document.querySelector('.main__productTotalPurchaseValue')
const btnCheckout = document.querySelector('.checkout')
const btnReturnHome = document.querySelector('.returnHome')
const form = document.querySelector('.main__formproductPurchase')
const btnCancelPurchase = document.querySelector('.main__btnCancelPurchase')
const inputName = document.getElementById('name')
const inputAddress = document.getElementById('address')
const inputPhone = document.getElementById('phone')
let productsCart = storedProductsCart ? storedProductsCart : [];
let totalToPay = 0;


const getProductsLocalToCart = async () => {
    totalToPay = 0;
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);
    if (!cartContainer) return
    cartContainer.innerHTML = "";
    if (!storedProductsCart || !storedProductsCart.length) {
        cartContainer.innerHTML = `
        <p class="message">No has agregado nada al carrito</p>
        `;
    } else {
        storedProductsCart.forEach(product => {
            cartContainer.innerHTML += `
            <section class="main__productToPay" data-id="${product.id}">
                <div class="product__informationContainer">
                    <img src="${product.product.productImage}" alt="">
                    <p>${product.product.productName}</p>
                </div>
                <div class="main__productPriceContainer">
                    <p class="main__productPrice">Precio</p>
                    <p class="main__productPricesContainer">
                        <span class="main__priceWithDiscount">$${(product.product.productPrice - product.product.priceDiscount).toLocaleString()}</span>
                        <span class="main__normalPrice">$${product.product.productPrice.toLocaleString()}</span>
                    </p>
                    <p class="main__productSave">Ahorraste: $${(product.product.priceDiscount * product.quantity).toLocaleString()}</p>
                </div>
                <div class="main__productButtonAmountContainer">
                    <p class="main__productButtonTitle">Cantidad</p>
                    <div class="main__productButtonAmount">
                        <button data-id="${product.id}" class="main__btnMinus">-</button>
                        <p data-id="${product.id}" class="main__productQuantity">${printValueCard(product.id)}</p>
                        <button data-id="${product.id}" class="main__btnPlus">+</button>
                    </div>
                </div>
                <div class="main_productTotalContainer">
                    <p class="main__productTotal">Total</p>
                    <p>$${((product.product.productPrice - product.product.priceDiscount) * product.quantity).toLocaleString()}</p>
                </div>
                <div class="main__productActionContainer">
                    <p class="main__productActionTitle">Acción</p>
                    <p class="main__producsActions">
                        <span class="main__productActionSave">Guardar</span>
                        <span class="main__productActionDelete" data-id="${product.id}">Borrar</span>
                    </p>
                </div>
            </section>
            `
            totalToPay +=  (product.quantity * (product.product.productPrice - product.product.priceDiscount));
        });
        subtotal.innerHTML =`$${totalToPay.toLocaleString()}`;
        total.innerHTML = `$${totalToPay.toLocaleString()}`;
    }

    if(!storedProductsCart.length) {
        subtotal.innerHTML = `$${0}`;
        total.innerHTML = `$${0}`;
    }
    getBtnsCard()
}

export { getProductsLocalToCart }

const getBtnsCard = () => {
    const plusButtons = document.querySelectorAll(".main__btnPlus");
    const minusButtons = document.querySelectorAll(".main__btnMinus");
    const btnDelete = document.querySelectorAll(".main__productActionDelete");

    plusButtons.forEach((btn) => {
        const id = btn.getAttribute('data-id');
        btn.addEventListener("click", () => {
            addQuantityProduct(id)
        });
    });

    minusButtons.forEach((btn) => {
        const id = btn.getAttribute('data-id');
        btn.addEventListener("click", () => {
            deleteQuantityProduct(id)
        });
    });

    btnDelete.forEach((btn) => {
        const id = btn.getAttribute('data-id');
        btn.addEventListener("click", () => {
            deteleAllCard(id)
        });
    });
}

const addQuantityProduct = (id) => {
    const dataFiltered = storedProductsCart.find(item => item.id == id)
    const card = document.querySelector(`.main__productToPay[data-id="${id}"]`);
    const quantityElement = card.querySelector('.main__productQuantity');
    let counter = +quantityElement.textContent;

    if (counter < dataFiltered.product.stock) {
        counter++
        quantityElement.textContent = counter;
        if (!productsCart.find(product => product.id === id)) {
            productsCart.push({
                quantity: counter,
                id,
                product: dataFiltered
            })
        } else {
            const findProduct = productsCart.findIndex(item => item.id === id)
            productsCart[findProduct].quantity = counter;
        }
    }

    const productsCartString = JSON.stringify(productsCart)
    localStorage.setItem('productsCart', productsCartString);
    getProductsLocal()
    getProductsLocalToCart()
}

const deleteQuantityProduct = (id) => {
    const card = document.querySelector(`.main__productToPay[data-id="${id}"]`);
    const quantityElement = card.querySelector('.main__productQuantity');
    let counter = +quantityElement.textContent;

    if (counter > 0) {
        counter--
        quantityElement.textContent = counter;
        if (!productsCart.find(product => product.id === id)) {
            productsCart.push({
                quantity: counter,
                id,
                product: dataFiltered
            })
        } else {
            const findProduct = productsCart.findIndex(item => item.id === id)
            productsCart[findProduct].quantity = counter;
            if (productsCart[findProduct].quantity === 0) {
                productsCart.splice(findProduct, 1)
            }
        }
    }

    const productsCartString = JSON.stringify(productsCart)
    localStorage.setItem('productsCart', productsCartString);
    getProductsLocal()
    getProductsLocalToCart()
}

const deteleAllCard = (id) => {
    const findProduct = productsCart.findIndex(item => item.id === id)
    productsCart.splice(findProduct, 1)
    const productsCartString = JSON.stringify(productsCart)
    localStorage.setItem('productsCart', productsCartString);
    getProductsLocal()
    getProductsLocalToCart()
}

const printValueCard = (id) => {
    if (storedProductsCart) {
        const value = storedProductsCart.findIndex(item => item.id == id)
        return value !== -1 ? storedProductsCart[value].quantity : 0
    } else {
        return 0
    }
}

const btnsToPay = () => {
    if (!btnCheckout) return
    btnCheckout.addEventListener('click', () => {
        form.classList.toggle('main__formproductPurchase--active')
    })

    btnReturnHome.addEventListener('click', () => {
        window.location.href = "../index.html"
        form.classList.remove('main__formproductPurchase--active')
    })

    btnCancelPurchase.addEventListener('click', () => {
        form.classList.remove('main__formproductPurchase--active')
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendHistoryJSON()
    })
}

const sendHistoryJSON = () => {
    storedProductsCart.forEach(async (product) => {
        const newPurchase = {
            categoryName: product.product.categoryName,
            productName: product.product.productName,
            productImage: product.product.productImage,
            totalPurchase: ((product.product.productPrice - product.product.priceDiscount) * product.quantity),
            amountPurchased: product.quantity,
            userName: inputName.value,
            userDirection: inputAddress.value,
            userPhone: inputPhone.value,
            Date: new Date().getTime()
        }

        const newStock = {
            categoryName: product.product.categoryName,
            productName: product.product.productName,
            productImage: product.product.productImage,
            productPrice: 27900,
            priceDiscount: 2700,
            stock: product.product.stock - product.quantity,
            isTop: true,
        }

        try {
            const response = await fetch(`${urlApi}/products/${product.id}`,{
                method: 'PATCH',
                body: JSON.stringify(newStock),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const response2 = await fetch(`${urlApi}/history`,{
                method: 'POST',
                body: JSON.stringify(newPurchase),
                headers: {
                    "Content-type": "application/json"
                }
            })
        } catch (error) {
            console.log(error)

        }
    })

    form.reset()
    localStorage.removeItem('productsCart')
    getProductsLocalToCart()
    getProductsLocal()
    subtotal.innerHTML = `$${0}`;
    total.innerHTML = `$${0}`;
}

btnsToPay()
getProductsLocalToCart()
