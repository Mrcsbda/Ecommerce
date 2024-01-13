import { getProductsLocal } from './modalCart.js';
const URL_API = "https://miniback-ecommerce-dev-xtxr.2.us-1.fl0.io/";
const favoritesContainer = document.querySelector('.main__products')
const title = document.querySelector('.main__noFavorites')
const storedProductsCartString = localStorage.getItem('productsCart');
const storedProductsCart = JSON.parse(storedProductsCartString);
let productsCart = storedProductsCart?storedProductsCart:[];
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
  favoritesId = favoritesIdString === null ? [] : favoritesIdString.split(',').filter(Boolean)
  favoritesContainer.innerHTML = "";
  const dataFilter = data.filter(item => favoritesId.includes(item.id.toString()))
  dataFilter.forEach(product => {
    favoritesContainer.innerHTML += `
    <div class="main__product" data-id="${product.id}">
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
          <button class="main__btnMinus" data-id="${product.id}" >-</button>
          <span data-id="${product.id}" class="main__productQuantity">${printValueCard(product.id)}</span>
          <button class="main__btnPlus" data-id="${product.id}">+</button>
        </div>
      </div>
    `
  });

  !dataFilter.length ? title.classList.add('main__noFavorites--active') : title.classList.remove('main__noFavorites--active')
  getBtnsCard()
}

const getBtnsCard = () => {
  const btnDelete = document.querySelectorAll('.main__iconFavoriteDelete')
  const plusButtons = document.querySelectorAll(".main__btnPlus");
  const minusButtons = document.querySelectorAll(".main__btnMinus");

  btnDelete.forEach((btn) => {
    const id = btn.getAttribute('data-id');
    btn.addEventListener("click", () => {
      deleteFavorites(id)
    });
  });

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
}

const addQuantityProduct = async (id) => {
  const data = await getProducts();
  const dataFiltered = data.find(item => item.id == id)
  const card = document.querySelector(`.main__product[data-id="${id}"]`);
  const quantityElement = card.querySelector('.main__productQuantity');
  let counter = +quantityElement.textContent;

  if (counter < dataFiltered.stock) {
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
}

const deleteQuantityProduct = async (id) => {
  const card = document.querySelector(`.main__product[data-id="${id}"]`);
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
}

const printValueCard = (id) => {
  if(storedProductsCart){
    const value = storedProductsCart.findIndex(item=> item.id == id)
    return value !== -1?storedProductsCart[value].quantity:0
  } else {
    return 0
  }
}

const deleteFavorites = (id) => {
  let favoritesIdString = localStorage.getItem('Favorites');
  favoritesId = favoritesIdString === null ? [] : favoritesIdString.split(',').filter(Boolean);
  const findItem = favoritesId.findIndex((item) => item === id);
  favoritesId.splice(findItem, 1)
  localStorage.setItem('Favorites', favoritesId)
  printFavorites()
}

printFavorites()
