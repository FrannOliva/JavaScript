let carritoStorage = localStorage.getItem("carrito")
let carritoParse = JSON.parse(carritoStorage)
console.log(carritoParse)


const final = (carritoParse) => {
    const contenedor = document.getElementById("productoContenedor")

    carritoParse.forEach(perfume => {
        const div = document.createElement("div")
        div.classList.add("productosFinales")
        div.innerHTML += `
        <div class="textoFoto">
            <img src="${perfume.foto3}" class="foto">
            <div class"texto">
                <p>${perfume.name}</p>
                <strong>$${perfume.price * perfume.cantidad}</strong>
            </div>
        </div>
        <p class="cantidad" id=cantidad-${perfume.id}>Cantidad: ${perfume.cantidad}</p>`

        contenedor.appendChild(div)
    })
}

const total = () => {
    const totalCompra = carritoParse.reduce((acc, item) => acc + (item.cantidad * item.price), 0)
    const precioTotal = document.getElementById("precioTotal")

    precioTotal.innerHTML = totalCompra
}

final(carritoParse)
total(carritoParse)