import {getProductsLocalToCart} from './cart.js';
const cartContainer = document.getElementById('productsCartContainer')
const totalCart = document.querySelector('.header__totalToPay');
const cartCounter = document.querySelector('.header__cartCounter'); 

let totalToPay = 0;

const getProductsLocal = () => {
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);
    totalToPay = 0;
    cartContainer.innerHTML = "";
    totalCart.innerHTML = 0;
    cartCounter.classList.remove('header__cartCounter--active')
    if(!storedProductsCart || !storedProductsCart.length) {
        cartContainer.innerHTML = `
        <p class="message">No has agregado nada al carrito</p>
        `;
    } else {
        storedProductsCart.forEach(product => {
            cartContainer.innerHTML += `
            <div class="header__product">
                <img class="header__deleteProductIcon" data-id="${product.id}" src="https://icons.veryicon.com/png/o/miscellaneous/rice-reading-applet/delete-307.png" alt="delete product icon">
                <img class="header__imageProduct" src="${product.product.productImage}" alt="">
                <div>
                    <p class="header__nameProduct">${product.product.productName}</p>
                    <p class="header__amountProduct"><span>${product.quantity} x </span>$${(product.product.productPrice - product.product.priceDiscount).toLocaleString()}</p>
                </div>
            </div>
            `
            totalToPay += (product.quantity * (product.product.productPrice - product.product.priceDiscount));
            totalCart.innerHTML = `$${totalToPay !== 0?totalToPay.toLocaleString():0}`;
            cartCounter.classList.add('header__cartCounter--active')
        });
        cartCounter.innerHTML = storedProductsCart.length;
    }
    getElements()
}

export {getProductsLocal}

const getElements = () => {
    const btnDelete = document.querySelectorAll('.header__deleteProductIcon')
    btnDelete.forEach(btn => {
        const id = btn.getAttribute('data-id');
        btn.addEventListener('click',()=> {
            deleteProduct(id)
        })
    })
}

const deleteProduct = (id) => {
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);
    const findProduct = storedProductsCart.findIndex(item=> item.id === id)
    storedProductsCart.splice(findProduct,1)
    const productsCartString = JSON.stringify(storedProductsCart)
    localStorage.setItem('productsCart', productsCartString); 
    getProductsLocalToCart();
    getProductsLocal()
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

scrollToTop()
getProductsLocal()


