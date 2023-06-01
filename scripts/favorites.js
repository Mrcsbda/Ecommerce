const URL_API = "https://miniback-ecommerce-production.up.railway.app/";
const favoritesContainer = document.querySelector('.main__products')
const title  = document.querySelector('.main__noFavorites')
let favoritesId = []

const getProducts = async () => {
    try {
        const endpoint = "products";
        const response = await fetch(`${URL_API}${endpoint}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        return [];
    }
};

const printFavorites = async () => {
    const data = await getProducts()
    let favoritesIdString = localStorage.getItem('Favorites');
    favoritesId = favoritesIdString === null?[]:favoritesIdString.split(',').filter(Boolean)
    favoritesContainer.innerHTML = "";
    const dataFilter = data.filter(item => favoritesId.includes(item.id.toString()))
    console.log(dataFilter)
    dataFilter.forEach(product => {
        favoritesContainer.innerHTML += `
    <div class="main__product">
        <img class="main__iconFavoriteDelete" data-id="${product.id}" src="../images/icons/deleteFavorites.svg" alt="icon favorite active"/>
        <figure class="main__imageProductContainer">
          <img src="${product.productImage}" alt="image product" />
        </figure>
        <div>
          <p class="main__categorieProduct">${product.categoryName}</p>
          <h3 class="main__nameProduct">
            ${product.productName}
          </h3>
          <div class="main__priceProduct">
            <span class="main__price">$${product.priceDiscount !== 0
                ? (product.productPrice - product.priceDiscount).toLocaleString()
                : (product.productPrice).toLocaleString()
              }</span>
            <span class="main__withoutDiscount">$${(product.productPrice).toLocaleString()}</span>
          </div>
        </div>
        <div class="main__buttonsProductContainer">
          <button class="main__btnMinus">-</button>
          <span>Add</span>
          <button class="main__btnPlus">+</button>
        </div>
      </div>
    `
    });

    !dataFilter.length?title.classList.add('main__noFavorites--active'):title.classList.remove('main__noFavorites--active')
    getBtnsCard()
}

const getBtnsCard = () => {
    const btnDelete = document.querySelectorAll('.main__iconFavoriteDelete')
    btnDelete.forEach((btn) => {
        const id = btn.getAttribute('data-id');
        btn.addEventListener("click", () => {
            deleteFavorites(id)
        });
      });
}


const deleteFavorites = (id) => {
    let favoritesIdString = localStorage.getItem('Favorites');
    favoritesId = favoritesIdString === null?[]:favoritesIdString.split(',').filter(Boolean);
    const findItem = favoritesId.findIndex((item)=> item === id);
    favoritesId.splice(findItem,1)
    localStorage.setItem('Favorites', favoritesId)
    printFavorites()
}

printFavorites()
