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

        let indexLigne = document.createElement('th','articleImage');
        indexLigne.textContent = basket[i].imageUrl;

        let nameProduct = document.createElement('td');
        nameProduct.textContent = basket[i].name;

        let varnishProduct = document.createElement('td');
        varnishProduct.textContent = basket[i].quantity;

        let priceProduct = document.createElement('td');
        priceProduct.textContent = basket[i].price/100 + " " + "euros";

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
        ligneTableau.appendChild(indexLigne);
        ligneTableau.appendChild(nameProduct);
        ligneTableau.appendChild(varnishProduct);
        ligneTableau.appendChild(priceProduct);
        ligneTableau.appendChild(suppTab);

        tableau.appendChild(ligneTableau);
        panierPart.appendChild(tableau);
    }

    const prixInHtml = document.getElementById("finalPrice");
    if (localStorage.length > 0) {
        prixInHtml.innerHTML = calculPrixPanier() + " € (euros)";
        function calculPrixPanier() {
            let totalPriceItem = basket.reduce((accumulator, item) => {
                return accumulator + item.totalPrice;
            }, 0);
        
            return totalPriceItem;
        };
    
    }
