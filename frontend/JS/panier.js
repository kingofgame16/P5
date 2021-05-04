'use strict';

let basket = JSON.parse(localStorage.getItem('basket'));
let panierPart = document.querySelector('table');

const basketTabElement = document.querySelector('.basket');

let totalPrice = 0;

//Panier vide
if (basket !== null) {
    basketTabElement.classList.replace('invisible', 'visible')
    document.querySelector('.etatPanier').classList.replace('visible', 'invisible')
}

//Panier non vide, affichage des produits localstorage
let tableau = document.querySelector('tbody');

let productIds = [];

for (let i = 0; i < basket.length; i++) {
    productIds.push(basket[i].id);
}

for (let i = 0; i < basket.length; i++) {

    let nameProduct = document.createElement('td');
    nameProduct.textContent = basket[i].name;

    let quantityProduct = document.createElement('td');
    quantityProduct.textContent = basket[i].quantity;

    let priceProduct = document.createElement('td');
    priceProduct.textContent = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(basket[i].price / 100);

    let subTotal = document.createElement('td');
    subTotal.textContent = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(basket[i].price / 100 * basket[i].quantity);

    let suppTab = document.createElement('button');
    suppTab.innerHTML = 'Supprimer';
    suppTab.classList.add('btn', 'btn-danger', 'text-reset');
    
    const deleteArticle = (i) => {
        if (basket.length >= 2) {
            alert('Le produit a été retiré du panier !');
            let index = basket.indexOf(basket[i]);
            basket.splice(index, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            location.reload();
        } else if (basket.length === 1) {
            alert('Le produit a été retiré du panier !');
            localStorage.removeItem('basket');
            location.reload();
            changeDisplay();
            basket.classList.add('d-block');
        }
    }
    suppTab.onclick = deleteArticle;

    let ligneTableau = document.createElement('tr');
    ligneTableau.appendChild(nameProduct);
    ligneTableau.appendChild(quantityProduct);
    ligneTableau.appendChild(priceProduct);
    ligneTableau.appendChild(subTotal)
    ligneTableau.appendChild(suppTab);
    tableau.appendChild(ligneTableau);
    panierPart.appendChild(tableau);
}

const prixInHtml = document.getElementById('finalPrice');

function calculPrixPanier() {
    totalPrice = basket.reduce((accumulator, item) => {
        return accumulator + item.price / 100 * item.quantity;
    }, 0);
    return totalPrice;
};

if (basket.length > 0) {
    prixInHtml.innerHTML = calculPrixPanier() + '€';
}

const lastname = document.getElementById('lastName');
const firstname = document.getElementById('firstName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

const form = document.querySelector('#submitForm');

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const contact = { // utilisateur à envoyer en objet en POST
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
    };

    const texAlert = (value) => {
        return value + ': Chiffre et symbole non autorisé\n 3 caractères minimum, 20 maximum';
    }

    const regexcitynames = (value) => {
        return /^[A-Za-z]{3,20}$/.test(value)
    }

    const regexEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }
    const regexAddress = (value) => {
        return /^[A-Za-z0-9\s]{5,50}$/.test(value)
    }

    const lastNamecontrol = () => {
        const lastName = contact.lastName
        if (regexcitynames(lastName)) {
            return true;
        } else {
            alert(texAlert('Nom'))
            return false;
        }
    };

    const firstNamecontrol = () => {
        const firstName = contact.firstName
        if (regexcitynames(firstName)) {
            return true;
        } else {
            alert(texAlert('Prénom'))
            return false;
        }
    };

    const citycontrol = () => {
        const city = contact.city
        if (regexcitynames(city)) {
            return true;
        } else {
            alert(texAlert('Ville'))
            return false;
        }
    };

    const emailcontrol = () => {
        const email = contact.email
        if (regexEmail(email)) {
            return true;
        } else {
            alert(texAlert('email non valide'))
            return false;
        }
    };

    const addresscontrol= () => {
        const address = contact.address
        if (regexAddress(address)) {
            return true;
        } else {
            alert(texAlert('adresse non valide'))
            return false;
        }
    };

    if (lastNamecontrol() && firstNamecontrol() && citycontrol() && emailcontrol() && addresscontrol()) {
        const products = [];

    basket.forEach((furniture) => {
        products.push(furniture.id);
    });

    const donnees = {
        contact,
        products
    };

    const finalCommand = {
        method: 'POST',
        body: JSON.stringify(donnees),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    fetch('http://localhost:3000/api/furniture/order', finalCommand)
        .then(response => { // me renvoie un premiere prommesse
            if (response.ok) {
                return response.json()
            } else {
                Promise.reject(response.status); // sinon, me retroune la cause de l'echec
            };
        })
        // traitement pour l'obtention du numéro de commmande
        .then(data => {
            localStorage.setItem('orderId', JSON.stringify(data.orderId));
            localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
            window.location.href = 'confirmation.html';
        })
        .catch((error) => {
            alert(error);
        });
    } else {
        alert('Veuillez bien remplir le formulaire')
    }
    
});