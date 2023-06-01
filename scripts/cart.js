const cartContainer = document.querySelector('.main__productsToPayContainer')

const getProductsLocalToCart = () => {
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);
    if(!cartContainer) return
    cartContainer.innerHTML = "";
    if (!storedProductsCart.length) {
        cartContainer.innerHTML = `
        <p class="message">No has agregado nada al carrito</p>
        `;
    } else {
        storedProductsCart.forEach(product => {
            cartContainer.innerHTML += `
            <section class="main__productToPay">
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
                        <button>-</button>
                        <p>0</p>
                        <button>+</button>
                    </div>
                </div>
                <div class="main_productTotalContainer">
                    <p class="main__productTotal">Total</p>
                    <p>$${((product.product.productPrice - product.product.priceDiscount)*product.quantity).toLocaleString()}</p>
                </div>
                <div class="main__productActionContainer">
                    <p class="main__productActionTitle">Acción</p>
                    <p class="main__producsActions">
                        <span class="main__productActionSave">Guardar</span>
                        <span class="main__productActionDelete">Borrar</span>
                    </p>
                </div>
            </section>
            `
        });
    }
}

export {getProductsLocalToCart}

getProductsLocalToCart()