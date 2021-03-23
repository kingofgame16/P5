import {displayProduct} from './js/product/displayProduct.js'

displayProduct()

    const addBasketBtnElement = document.querySelector('#btnAddBasket')
    
    addBasketBtnElement.addEventListener('click', () => {
        alert ('Produit bien ajouté au panier')
    })