const URL_API = "https://miniback-ecommerce-production.up.railway.app/";
const containerCards = document.querySelector(".main__products");
const titlePage = document.querySelector('.main__title');
const categoriesNames = document.querySelectorAll(".main__categoriesName");
let filteredProduct = [];
let areAllCateogories = true
let counter = 0;

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
          <img class="main__iconFavorite favoriteActive" src="./images/icons/favoriteActive.svg"
            alt="icon favorite active" />
          <img class="main__iconFavorite favoriteInactive" src="./images/icons/favoriteInactive.svg"
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
            <span class="main__productQuantity" id="number">${counter}</span>
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
          <img class="main__iconFavorite favoriteActive" src="./images/icons/favoriteActive.svg"
            alt="icon favorite active" />
          <img class="main__iconFavorite favoriteInactive" src="./images/icons/favoriteInactive.svg"
            alt="icon favorite inactive" />
          <figure class="main__imageProductContainer">
            <img src="${product.productImage}" alt="image product" />
          </figure>
          <div>
            <p class="main__categorieProduct">${product.categoryName}</p>
            <h3 class="main__nameProduct">${product.productName}</h3>
            <div class="main__priceProduct">
              <span class="main__price">${product.priceDiscount
          ? (product.productPrice - product.priceDiscount).toLocaleString()
          : (product.productPrice).toLocaleString()
        }</span>
              <span class="main__withoutDiscount">$${(product.productPrice).toLocaleString()}</span>
            </div>
          </div>
          <div class="main__buttonsProductContainer">
            <button class="main__btnMinus" id="btnMinus" data-id="${product.id}">-</button>
            <span class="main__productQuantity" id="number">${counter}</span>
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
  console.log(id)
}

const deleteQuantityProduct = async (id) => {
  console.log(id)
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

cateogryProducts()
printCards()