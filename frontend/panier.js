let basket = JSON.parse(localStorage.getItem('basket'));
let panierPart = document.querySelector('table');

const basketTabElement = document.querySelector('.basket');

//Panier vide
if(basket !== null){
    basketTabElement.classList.replace('invisible','visible')
    document.querySelector('.etatPanier').classList.replace('visible','invisible')
}

//Panier non vide, affichage des produits localstorage
let tableau = document.querySelector("tbody");

    let productIds = [];

    for (let i = 0; i < basket.length; i++) {
        productIds.push(basket[i].id);
    }

    
    for (let i = 0; i < basket.length; i++) {

        let imageProduct = document.createElement('th','indexImage');
        imageProduct.textContent = basket[i].imageUrl;

        let nameProduct = document.createElement('td');
        nameProduct.textContent = basket[i].name;

        let quantityProduct = document.createElement('td');
        quantityProduct.textContent = basket[i].quantity;

        let priceProduct = document.createElement('td');
        priceProduct.textContent = basket[i].price/100*basket[i].quantity + " " + "euros";

        let suppTab = document.createElement("button");
        suppTab.innerHTML = "Delete";
        suppTab.classList.add("btn", "btn-danger");
        suppTab.onclick = deleteArticle;

        function deleteArticle (i) {
            if (basket.length >= 2) {
                alert('Le produit a été retiré du panier !');
                let index = basket.indexOf(basket[i]);
                basket.splice(index, 1);
                localStorage.setItem('basket', JSON.stringify(basket));
                location.reload();
            } else if (basket.length === 1) {
                alert('Le produit a été retiré du panier !');
                localStorage.removeItem("basket");
                location.reload();
                changeDisplay();
                basket.classList.add("d-block");
            }
        }
        let ligneTableau = document.createElement('tr');
        ligneTableau.appendChild(imageProduct);
        ligneTableau.appendChild(nameProduct);
        ligneTableau.appendChild(quantityProduct);
        ligneTableau.appendChild(priceProduct);
        ligneTableau.appendChild(suppTab);

        tableau.appendChild(ligneTableau);
        panierPart.appendChild(tableau);
    }

    const prixInHtml = document.getElementById("finalPrice");
    if (basket.length > 0) {
        prixInHtml.innerHTML = calculPrixPanier() + " € (euros)";
        function calculPrixPanier() {
            let totalPriceItem = basket.reduce((accumulator, item) => {
                return accumulator + item.price/100 * item.quantity;
            }, 0);
        
            return totalPriceItem;
        };
    
    }


const lastname = document.getElementById('lastName');
const firstname = document.getElementById('firstName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

const form = document.querySelector("#submitForm");

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const contact = { // utilisateur à envoyer en objet en POST
        firstName: firstname.value,
        lastName: lastname.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    const products = []; 
    const donnees = { contact, products }; 

    basket.forEach((furniture) => {
        products.push(furniture._id);
    });

    const options = {
        method: "POST",
        body: JSON.stringify(donnees),
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (firstname == "" || lastname == "" || address == "" || city == "" || email == "") {
        alert("Tous les champs doivent êtres remplis !")

    } else {
        fetch("https://ab-p5-api.herokuapp.com/api/furniture", options)
            // reçoit les données du back
            .then(response => { // me renvoie un premiere prommesse
                if (response.ok) {
                    return response.json() // Si response ok, retourne un objet json
                } else {
                    Promise.reject(response.status); // sinon, me retroune la cause de l'echec
                };
            })

        // traitement pour l'obtention du numéro de commmande
        .then((datas) => {
            const orderId = datas.orderId;

            window.location.href = `confirm.html?ncomm=${orderId}`;

        })

        .catch((error) => {
            alert(error);
        });
    }

});