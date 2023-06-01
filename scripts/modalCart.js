const cartContainer = document.getElementById('productsCartContainer')

const getProductsLocal = () => {
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);
    console.log(storedProductsCart);
}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

scrollToTop()

getProductsLocal()

