const productList = () => {
    return fetch("http://localhost:3000/productos")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const createProductos = (name, price, image) => {
    return fetch("http://localhost:3000/productos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name:name,
            price:price,
            image:image
        })
    })

    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const deleteProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    })
    .then((res) => res.ok)
    .catch((err) => console.log(err));
};

export const servicesProducts = {
    productList,createProductos,deleteProducto
}
