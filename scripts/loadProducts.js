const URL_API = "https://miniback-ecommerce-production.up.railway.app/";
const containerCards = document.querySelector(".main__products");
const titlePage = document.querySelector('.main__title');
const categoriesNames = document.querySelectorAll(".main__categoriesName");
const storedProductsCartString = localStorage.getItem('productsCart');
const storedProductsCart = JSON.parse(storedProductsCartString);
let favIconActive = "";
let favIconInactive = "";
let areAllCateogories = true
let filteredProduct = [];
let favoritesId = []
let productsCart = storedProductsCart?storedProductsCart:[];



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

const printCards = async (productsFiltered = null, titlePageFiltered = 'Productos') => {
  const data = await getProducts()
  containerCards.innerHTML = "";
  if (areAllCateogories) {
    titlePage.innerHTML = titlePageFiltered;
    data.forEach((product) => {
      containerCards.innerHTML += `
        <div class="main__product" data-id="${product.id}">
          <img class="main__iconFavorite favoriteActive" data-id="${product.id}" src="./images/icons/favoriteActive.svg"
            alt="icon favorite active" />
          <img class="main__iconFavorite favoriteInactive favoriteInactive--active" data-id="${product.id}" src="./images/icons/favoriteInactive.svg"
            alt="icon favorite inactive" />
          <figure class="main__imageProductContainer">
            <img src="${product.productImage}" alt="image product" />
          </figure>
          <div>
            <p class="main__categorieProduct">${product.categoryName}</p>
            <h3 class="main__nameProduct">${product.productName}</h3>
            <div class="main__priceProduct">
              <span class="main__price">$${product.priceDiscount !== 0
          ? (product.productPrice - product.priceDiscount).toLocaleString()
          : (product.productPrice).toLocaleString()
        }</span>
              <span class="main__withoutDiscount">$${(product.productPrice).toLocaleString()}</span>
            </div>
          </div>
          <div class="main__buttonsProductContainer">
            <button class="main__btnMinus" id="btnMinus" data-id="${product.id}">-</button>
            <span class="main__productQuantity" id="number" data-id="${product.id}">${printValueCard(product.id)}</span>
            <button class="main__btnPlus" id="btnPlus" data-id="${product.id}">+</button>
          </div>
        </div>
      `;
    });
  } else {
    titlePage.innerHTML = titlePageFiltered;
    productsFiltered.forEach((product) => {
      containerCards.innerHTML += `
        <div class="main__product" data-id="${product.id}">
          <img class="main__iconFavorite favoriteActive" data-id="${product.id}" src="./images/icons/favoriteActive.svg"
            alt="icon favorite active" />
          <img class="main__iconFavorite favoriteInactive" data-id="${product.id}" src="./images/icons/favoriteInactive.svg"
            alt="icon favorite inactive" />
          <figure class="main__imageProductContainer">
            <img src="${product.productImage}" alt="image product" />
          </figure>
          <div>
            <p class="main__categorieProduct">${product.categoryName}</p>
            <h3 class="main__nameProduct">${product.productName}</h3>
            <div class="main__priceProduct">
              <span class="main__price">$${product.priceDiscount
          ? (product.productPrice - product.priceDiscount).toLocaleString()
          : (product.productPrice).toLocaleString()
        }</span>
              <span class="main__withoutDiscount">$${(product.productPrice).toLocaleString()}</span>
            </div>
          </div>
          <div class="main__buttonsProductContainer">
            <button class="main__btnMinus" id="btnMinus" data-id="${product.id}">-</button>
            <span class="main__productQuantity" id="number" data-id="${product.id}">${printValueCard(product.id)}</span>
            <button class="main__btnPlus" id="btnPlus" data-id="${product.id}">+</button>
          </div>
        </div>
      `;
    });
  }
  getBtnsCard()
};

const getBtnsCard = () => {
  const plusButtons = document.querySelectorAll(".main__btnPlus");
  const minusButtons = document.querySelectorAll(".main__btnMinus");
  const favoriteInactive = document.querySelectorAll('.favoriteInactive');
  const favoriteActive = document.querySelectorAll('.favoriteActive');

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

  addFavorites(favoriteInactive, favoriteActive)
  deleteFavorites(favoriteActive, favoriteInactive)
  loadedFavorites(favoriteActive, favoriteInactive)
}

const addQuantityProduct = async (id) => {
  const data = await getProducts();
  const dataFiltered = data.find(item => item.id == id)
  const card = document.querySelector(`.main__product[data-id="${id}"]`);
  const quantityElement = card.querySelector('.main__productQuantity');
  let counter = +quantityElement.textContent;

  if(counter < dataFiltered.stock){
    counter ++
    quantityElement.textContent = counter;
    if(!productsCart.find(product=> product.id === id)) {
      productsCart.push({
        quantity: counter,
        id,
        product: dataFiltered
      }) 
    } else {
      const findProduct = productsCart.findIndex(item=> item.id === id)
      productsCart[findProduct].quantity = counter;
    }
  }

  const productsCartString = JSON.stringify(productsCart)
  localStorage.setItem('productsCart', productsCartString);
}

const deleteQuantityProduct = async (id) => {
  const card = document.querySelector(`.main__product[data-id="${id}"]`);
  const quantityElement = card.querySelector('.main__productQuantity');
  let counter = +quantityElement.textContent;

  if (counter > 0) {
    counter--
    quantityElement.textContent = counter;
    if(!productsCart.find(product=> product.id === id)) {
      productsCart.push({
        quantity: counter,
        id,
        product: dataFiltered
      }) 
    } else {
      const findProduct = productsCart.findIndex(item=> item.id === id)
      productsCart[findProduct].quantity = counter;
      if(productsCart[findProduct].quantity === 0) {
        productsCart.splice(findProduct,1)
      }
    }
  } 

  const productsCartString = JSON.stringify(productsCart)
  localStorage.setItem('productsCart', productsCartString);
}

const cateogryProducts = async () => {
  const data = await getProducts()
  categoriesNames.forEach((item) => {
    item.addEventListener("click", () => {
      switch (true) {
        case item.innerHTML === "Top":
          filteredProduct = data.filter((product) => product.isTop)
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        case item.innerHTML === "Comida":
          filteredProduct = data.filter((product) => product.categoryName === "Comida")
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        case item.innerHTML === "Snacks":
          filteredProduct = data.filter((product) => product.categoryName === "Snacks")
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        case item.innerHTML === "Accesorios":
          filteredProduct = data.filter((product) => product.categoryName === "Accesorios")
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        case item.innerHTML === "Estetica e Higiene":
          filteredProduct = data.filter((product) => product.categoryName === "Estetica e Higiene")
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        case item.innerHTML === "Medicina":
          filteredProduct = data.filter((product) => product.categoryName === "Medicina")
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        case item.innerHTML === "Juguetes":
          filteredProduct = data.filter((product) => product.categoryName === "Juguetes")
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        case item.innerHTML === "Placas":
          filteredProduct = data.filter((product) => product.categoryName === "Placas")
          printCards(filteredProduct, item.innerHTML)
          areAllCateogories = false;
          break;
        default:
          areAllCateogories = true
          break;
      }
    });
  });
}

const addFavorites = (IconsInactive, iconsActive) => {
  IconsInactive.forEach((iconInactive) => {
    const id = iconInactive.getAttribute('data-id');
    iconInactive.addEventListener("click", () => {
      let favoritesIdString = localStorage.getItem('Favorites');
      favoritesId = favoritesIdString === null ? [] : favoritesIdString.split(',').filter(Boolean)
      favoritesId.push(id)
      localStorage.setItem('Favorites', favoritesId)
      const idExist = favoritesId.find((item) => item === id);
      idExist === id ? iconInactive.classList.remove('favoriteInactive--active') : iconInactive.classList.add('favoriteInactive--active')
      iconsActive.forEach((iconActive) => {
        const id = iconActive.getAttribute('data-id');
        const idExist = favoritesId.find((item) => item === id);
        idExist === id ? iconActive.classList.add('favoriteActive--active') : iconActive.classList.remove('favoriteActive--active')
      });
    });
  });
}

const deleteFavorites = (iconsActive, iconsInactive) => {
  iconsActive.forEach((iconActive) => {
    const id = iconActive.getAttribute('data-id');
    iconActive.addEventListener("click", () => {
      let favoritesIdString = localStorage.getItem('Favorites');
      favoritesId = favoritesIdString === null ? [] : favoritesIdString.split(',')
      const findItem = favoritesId.findIndex((item) => item === id);
      favoritesId.splice(findItem, 1)
      localStorage.setItem('Favorites', favoritesId)
      const idExist = favoritesId.find((item) => item === id);
      !idExist ? iconActive.classList.remove('favoriteActive--active') : iconActive.classList.add('favoriteActive--active')
      iconsInactive.forEach((iconInactive) => {
        const id = iconInactive.getAttribute('data-id');
        const idExist = favoritesId.find((item) => item === id);
        !idExist ? iconInactive.classList.add('favoriteInactive--active') : iconInactive.classList.remove('favoriteInactive--active')
      });
    });
  });
}

const loadedFavorites = (iconsActive, iconsInactive) => {
  let favoritesIdString = localStorage.getItem('Favorites');
  favoritesId = favoritesIdString === null ? [] : favoritesIdString.split(',').filter(Boolean)
  iconsActive.forEach((iconActive) => {
    const id = iconActive.getAttribute('data-id');
    const idExist = favoritesId.find(item => item === id)
    idExist === id ? iconActive.classList.add('favoriteActive--active') : iconActive.classList.remove('favoriteActive--active')
  });
  iconsInactive.forEach((iconInactive) => {
    const id = iconInactive.getAttribute('data-id');
    const idExist = favoritesId.find(item => item === id)
    !idExist ? iconInactive.classList.add('favoriteInactive--active') : iconInactive.classList.remove('favoriteInactive--active')
  });
}

const printValueCard = (id) => {
  if(storedProductsCart){
    const value = storedProductsCart.findIndex(item=> item.id == id) 
    return value !== -1?storedProductsCart[value].quantity:0
  } else {
    return 0
  }
}


printCards()
cateogryProducts()



