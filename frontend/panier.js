let basket = JSON.parse(localStorage.getItem('basket'));

const basketTabElement = document.querySelector('.basket');

if(basket !== null){
    basketTabElement.classList.replace('invisible','visible')
    document.querySelector('.etatPanier').classList.replace('visible','invisible')
}



/* if(data === null){
    const EmptyBasket = `
    <div class="container-fluid">
        <img class="center-block gif" alt="" src="images/polizas_gif.gif" />
        <p class="text-center lead">Votre panier est vide :'(</p>
    </div>`; 

    Element3.innerHTML = EmptyBasket;

}else{
    let structurePanier =[]

for(k=0; k < data.length; k++){

        structurePanier = structurePanier +`
        <div class="row m-2 pt-3 panierLine">
            <div class="col-md-3 col-lg-2">
                <img alt="${data.name}" class="img-fluid" src="${data.image}">
            </div>
            <div class="col-md-4">
                <a href="produit.html?id=${data._id}"><h2>${data.name}</h2></a>
                <p><strong>Quantité</strong> : ${data.quantite}</p>
                <p><strong>Lentilles</strong> : ${data.varnished}</p>
            </div>
            <div class="col-md-5 col-lg-4"
                <p class="prixProduitPanier"><strong>Prix : <span>${data.totalPrice} €</span></strong></p>   
            </div>
            <div class="col-md-1">
                <button class="btn btn-danger mb-3" onclick="deleteItem('${data._id}')">Supprimer</button>  
            </div>
        </div>
        `;
}
if(k == data.length){

    Element3.innerHTML = structurePanier;
}
} */










//const btnCommande = document.getElementById("btnCom");


/* function calculePrice(priceProdUnit) {
    let quantites = document.getElementById('quantiteProduit');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    })
} */