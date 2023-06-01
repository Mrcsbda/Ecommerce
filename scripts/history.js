const urlApiHistory = "https://miniback-ecommerce-production.up.railway.app/history";
const historyContainer = document.querySelector('.main')

const getElements = async () => {
    try {
        const response = await fetch(urlApiHistory)
        const products = await response.json()
        historyContainer.innerHTML = ""
        products.forEach(item => {
            historyContainer.innerHTML += `
        <article class="historyPurcahseContainer">
              <figure class="article__imageProductContainer">
                <img src="${item.productImage}" alt="product image">
              </figure>
              <hr>
              <section class="article__information">
                <h2>Producto</h2>
                <p>${item.productName}</p>
                <p class="article__cateogryProduct">${item.categoryName}</p>
              </section>
              <hr>
              <section class="article__information">
                <h2>Total</h2>
                <p class="article__totalPurchase">$${item.totalPurchase.toLocaleString()}</p>
              </section>
              <hr>
              <section class="article__information">
                <h2>Cantidad</h2>
                <p>${item.amountPurchased.toLocaleString()}</p>
              </section>
              <hr>
              <section class="article__information">
                <h2>Comprador</h2>
                <p>${item.userName}</p>
                <p>${item.userDirection}</p>
                <p>${item.userPhone}</p>
                <p>${new Date(item.Date).toLocaleDateString()}</p>
              </section>
        </article>
        `
        })
    } catch (error) {
        console.log(error)
    }
}

getElements()