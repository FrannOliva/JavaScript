const pintarProductos = (arrayPerfumes) => {
    const container = document.querySelector(".fragancias")
    arrayPerfumes.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("divPerfumes")
        div.classList.add(`producto_${producto.id}`)
        div.innerHTML += `
        <h2>${producto.name}</h2>
        <img src=${producto.foto} class="perfumes ${producto.name}">
        <a><i id=${producto.id} class="buy">COMPRAR</i></a> 
        <strong>$${producto.price}</strong>
        <p>${producto.description}</p>
        `
        container.appendChild(div)
    })
}

const resultado = arrayPerfumes.find(perfume => perfume.name === "GOLD");

function pintarGold(elemento) {
    const container = document.querySelector(".gold");
    const section = document.createElement("section");
    section.classList.add("gold");
    section.innerHTML = `
        <h2>${elemento.name}</h2>
        <img src=${elemento.foto2} alt="gold new">
        <div>
            <p>${elemento.name} • <strong>$${elemento.price}</strong></p>
            <a><i id=${elemento.id} class="buy">COMPRAR</i></a>
        </div>
    `
    container.appendChild(section);
}

const final = (carrito) => {
    const contenedor = document.getElementById("productoContenedor")

    carrito.forEach(perfume => {
        const div = document.createElement("div")
        div.classList.add("productosFinales")
        div.innerHTML += `
        <div class="textoFoto">
            <img src="${perfume.foto}" class="foto">
            <div class"texto">
                <p>${perfume.name}</p>
                <strong>$${perfume.price}</strong>
            </div>
        </div>
        <p class="cantidad" id=cantidad-${perfume.id}>Cantidad: ${perfume.cantidad}</p>`

        contenedor.appendChild(div)
    })
}

final(carrito)