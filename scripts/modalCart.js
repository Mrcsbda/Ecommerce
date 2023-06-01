const cartContainer  = document.getElementById('productsCartContainer')

const getProductsLocal = () => {
    const storedProductsCartString = localStorage.getItem('productsCart');
    const storedProductsCart = JSON.parse(storedProductsCartString);
    console.log(storedProductsCart);
 }

 getProductsLocal()

