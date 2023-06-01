const cartContainer = document.getElementById('productsCartContainer')
const totalCart = document.querySelector('.header__totalToPay')
let totalToPay = 0;

const getProductsLocal = () => {
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);
    console.log(storedProductsCart);

    cartContainer.innerHTML = "";
    storedProductsCart.forEach(product => {
        cartContainer.innerHTML = `
        <div class="header__product">
            <img class="header__deleteProductIcon" src="./images/icons/deleteProduct.svg" alt="delete product icon">
            <img class="header__imageProduct" src="${product.product.productImage}" alt="">
            <div>
                <p class="header__nameProduct">${product.product.productName}</p>
                <p class="header__amountProduct"><span>${product.quantity} x </span>$${(product.product.productPrice).toLocaleString()}</p>
            </div>
        </div>
        `
        totalToPay += (product.quantity * product.product.productPrice);
        totalCart.innerHTML = `$${totalToPay.toLocaleString()}`;
    });

}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

scrollToTop()

getProductsLocal()

