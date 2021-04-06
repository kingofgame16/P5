//const inHtml = document.getElementById("main");
//const prixInHtml = document.getElementById("finalPrice");
//const btnCommande = document.getElementById("btnCom");
//let data = JSON.parse(localStorage.getItem("basket"));

function calculePrice(priceProdUnit) {
    let quantites = document.getElementById('quantiteProduit');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    })
}