import { servicesProducts } from "../services/products-servis.js";

const productContainer = document.querySelector("[data-productos]");
const form = document.querySelector("[data-form]");


function crearCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = id;

    card.innerHTML = `

    <img src="${image}" alt="litera" class="imagen">

                <div class="card-info">

                    <p class="nombre">${name}</p>
                
                </div>

                    <div class="card-value">
                    
                     <p class="valor">$ ${price}</p>
                       
                    <button class="delete" type"delete" data-id="${id}">

                        <img src="img/papelera-pequeña.png" id="borrar" alt="papelera" class="papelera">

                    </button>

                    </div>

                
    `;

    card.querySelector(".delete").addEventListener("click", async (event) => {
        const id = event.target.closest("button").dataset.id;
        await removeCard(id, card);
    });


    productContainer.appendChild(card);
    return card
}

const removeCard = async (id, cardElement) => {
    try {
        await servicesProducts.deleteProducto(id);
        productContainer.removeChild(cardElement);
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};


const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        
        listProducts.forEach(product => {
            productContainer.appendChild(
                crearCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id

                )
            )
        });

    } catch (error) {
        console.log(error)
    }

};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;


    // console.log(form);
    
   servicesProducts
   .createProductos(name, price, image)
   .then((res) => console.log(res))
   .catch((err) =>console.log(err));
});

render();






