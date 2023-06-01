const cartContainer = document.getElementById('productsCartContainer')
const totalCart = document.querySelector('.header__totalToPay')
let totalToPay = 0;

const getProductsLocal = () => {
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);

    cartContainer.innerHTML = "";
    totalCart.innerHTML = 0;
    if(!storedProductsCart) {
        cartContainer.innerHTML = `
        <p class="message">No has agregado nada al carrito</p>
        `;
    } else {
        storedProductsCart.forEach(product => {
            cartContainer.innerHTML += `
            <div class="header__product">
                <img class="header__deleteProductIcon" src="https://icons.veryicon.com/png/o/miscellaneous/rice-reading-applet/delete-307.png" alt="delete product icon">
                <img class="header__imageProduct" src="${product.product.productImage}" alt="">
                <div>
                    <p class="header__nameProduct">${product.product.productName}</p>
                    <p class="header__amountProduct"><span>${product.quantity} x </span>$${(product.product.productPrice - product.product.priceDiscount).toLocaleString()}</p>
                </div>
            </div>
            `
            totalToPay += (product.quantity * (product.product.productPrice - product.product.priceDiscount));
            totalCart.innerHTML = `$${totalToPay !== 0?totalToPay.toLocaleString():0}`;
        });
    }
}

export {getProductsLocal}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

scrollToTop()
getProductsLocal()


