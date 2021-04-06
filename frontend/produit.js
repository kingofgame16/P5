const inHtml = document.getElementById('main');
    const params = new URLSearchParams(window.location.search);
    
    
    //j'injecte l'id du produit clické dans le fetch
    fetch(`http://localhost:3000/api/furniture/${params.get('id')}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                Promise.reject(response.status);
            }
        })
        .then(data => {
    
            //--variable prix pour le diviser par 100
            let priceProdUnit = data.price / 100;
    
            //--variable vide + boucle pour créer le select 
            let varnished = "";
    
            data.varnish.forEach(verni => {
                varnished += `<option value="${verni}">${verni}</option>`;
            })
    
            //--Ecriture du HTML en dynamique
            inHtml.innerHTML += `
                    <div class="card card-body col-12 col-lg-6">
                        <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                    </div>
                    <div class="card col-12 col-lg-6 pb-3">
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <form>
                                <div class="col-auto my-1 pb-5 mt-4">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">Vernis</label>
                                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        ${varnished}   
                                    </select>        
                                </div>
                            <p><strong>Prix total</strong> : <span id="totalPrice">${priceProdUnit}</span> €</p>                       
                        </form>   
                    </div>
                    `;
                    
                    let productSelected = {
                        id: data._id,
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        imageUrl: data.imageUrl,
                        quantity: 1
                    }
                    const addBasketBtnElement = document.querySelector('#btnAddBasket')
                    addBasketBtnElement.addEventListener('click', () => {
                        alert ('Produit bien ajouté au panier')
                        addLocalStorage(productSelected)
                    })
                    
        })




const addLocalStorage = (product) => {
    let basket = JSON.parse(localStorage.getItem("basket"));

    if (!basket) {
        localStorage.setItem("basket", JSON.stringify([product]))
    } else {
        const productAlreadySelected = basket.filter(p => p.id === product.id)
        if (productAlreadySelected.length > 0) {
            productAlreadySelected[0].quantity++
        } else {
            basket.push(product)
        }
    }
}

