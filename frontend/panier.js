let data = JSON.parse(localStorage.getItem("basket"));

const Element3 = document.getElementById("main");
const prix = document.getElementById("finalPrice");

if (localStorage.length > 0) {

    data.forEach((objet) => {
        Element3.innerHTML += `
            <div class="row m-2 pt-3 panierLine">
                <div class="col-md-3 col-lg-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.image}">
                </div>
                <div class="col-md-4">
                    <a href="produit.html?id=${objet._id}"><h2>${objet.name}</h2></a>
                    <p><strong>Quantité</strong> : ${objet.quantite}</p>
                    <p><strong>Lentilles</strong> : ${objet.varnished}</p>
                </div>
                <div class="col-md-5 col-lg-4"
                    <p class="prixProduitPanier"><strong>Prix : <span>${objet.totalPrice} €</span></strong></p>   
                </div>
                <div class="col-md-1">
                    <button class="btn btn-danger mb-3" onclick="deleteItem('${objet._id}')">Supprimer</button>  
                </div>
            </div>
            `;
    });
} else {

    Element3.innerHTML = `
        <div class="container-fluid">
            <img class="center-block gif" alt="" src="images/polizas_gif.gif" />
            <p class="text-center lead">Votre panier est vide :'(</p>
        </div>`;
};








//const btnCommande = document.getElementById("btnCom");


/* function calculePrice(priceProdUnit) {
    let quantites = document.getElementById('quantiteProduit');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    })
} */