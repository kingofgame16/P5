const inHtml = document.getElementById('main'); //récupération id=main

fetch('http://localhost:3000/api/furniture') //fetch sur l'url de l'API
    .then(response => { // me renvoie un premiere prommesse
        if (response.ok) {
            return response.json() // Si response ok, retourne un objet json
        } else {
            Promise.reject(response.status); // sinon, me retroune la cause de l'echec
        };
    })
    .then(data => { // si response ok, renvoie d'une seconde promesse
        data.forEach(objet => { // boucle pour générer dynamiquement du HTML dans le DOM

            let priceProd = objet.price / 100; //variable prix pour le diviser par 100

            //j'injecte mon HTML avec les bonnes variables directement dans le DOM
            inHtml.innerHTML += `
                <div class="card card-body col-12 col-md-6 col-lg-4 mx-auto m-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.imageUrl}">
                    <h2>${objet.name}</h2>
                    <p>${priceProd.toFixed(2)} €</p>
                    <a href="produit.html?id=${objet._id}" class="btn-outline-info text-center">Pour plus de détails</a>
                </div>
                `;
        });

    }).catch((error) => {
        console.log(error);
    });
