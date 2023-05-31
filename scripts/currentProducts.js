const urlApiProducts = "https://miniback-ecommerce-production.up.railway.app/products";
const productsContainer = document.querySelector('.main__products');

// ./modifyProduct.html

const getElementsAPI = async () => {
  try {
    const response = await fetch(urlApiProducts)
    const products = await response.json()
    productsContainer.innerHTML = ""
    products.forEach(product => {
      productsContainer.innerHTML += `
           <section class="main__product">
              <img class="main__iconDelete" data-id="${product.id}" src="../../images/icons/deleteProduct.svg" alt="delete" />
              <figure class="main__imageProductContainer">
                <img src="${product.productImage}" alt="image product" />
              </figure>
              <div>
                <p class="main__categorieProduct">${product.categoryName}</p>
                <h3 class="main__nameProduct">
                  ${product.productName}
                </h3>
                <p class="main__amountStock">Stock: ${product.stock}</p>
                <div class="main__priceProduct">
                  <span class="main__price">$${(product.productPrice - product.priceDiscount).toLocaleString()}</span>
                  <span class="main__withoutDiscount">$${(product.productPrice).toLocaleString()}</span>
                </div>
                <button class="main__modifyProduct" data-id="${product.id}">Modficar</button>
              </div>
            </section>
        `
    })
  } catch (error) {
    console.log(error)
  }

  getElementsCard()
}

const getElementsCard = () => {
  const iconDelete = document.querySelectorAll('.main__iconDelete')
  const btnModify = document.querySelectorAll('.main__modifyProduct')
  iconDelete.forEach((element) => {
    const id = element.getAttribute('data-id');
    element.addEventListener('click', () => {
      deleteProduct(id)
    })
  })

  btnModify.forEach((element) => {
    const id = element.getAttribute('data-id');
    element.addEventListener('click', () => {
      sendIdToLocalStorage(id)
    })
  })
}

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${urlApiProducts}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {

  }
  getElementsAPI()
}

const sendIdToLocalStorage = (id) => {
 localStorage.setItem('idProductToModify', id)
 window.location.href = "./modifyProduct.html"
}

getElementsAPI()