let carrito = []
const productoContenedor = document.querySelector(".fragancias")
const productoGold = document.querySelector(".gold")
const botonesDiv = document.getElementById("botonesFinales")
const finalizarCompraBtn = document.querySelector(".finalizarCompra")

const comprarClick = (e) => {
    if (e.target.classList.contains("buy")) {
        validarProducto(e.target.id);
        Toastify({
            text: "Producto agregado al carrito",
            duration: 1600,
            gravity: "bottom",
            position: 'right',
        }).showToast();
    }
};

productoContenedor.addEventListener("click", comprarClick);
productoGold.addEventListener("click", comprarClick);

const validarProducto = (id) => {
    const isRepeted = carrito.some(perfume => perfume.id == id)
    if (!isRepeted) {
        const perfume = arrayPerfumes.find(perfume => perfume.id == id)
        carrito.push(perfume)
        pintarCarrito(perfume)
        actualizarTotales(carrito)
    } else {
        const perfume = carrito.find(perfume => perfume.id == id)
        const cantidad = document.getElementById(`cantidad-${perfume.id}`)
        perfume.cantidad++
        cantidad.innerText = `Cantidad: ${perfume.cantidad}`
        actualizarTotales(carrito)
    }
}

const pintarCarrito = (perfume) => {
    const carritoContenedor = document.getElementById("carritoContenedor")
    const div = document.createElement("div")
    div.classList.add("productoEnCarrito")

    div.innerHTML = `
        <div class="nombrePrecio">
            <p>${perfume.name}</p>
            <strong>$${perfume.price}</strong>
        </div>
        <div class="cantidadEliminar">
            <p id=cantidad-${perfume.id}>Cantidad: ${perfume.cantidad}</p>
            <button class="btn waves-effect waves-ligth btnEliminar" value="${perfume.id}">X</button>
        </div>`

    carritoContenedor.appendChild(div)

}

const listarCarrito = (carrito) => {
    const carritoContenedor = document.getElementById("carritoContenedor")

    carritoContenedor.innerHTML = ""

    carrito.forEach(perfume => {
        const div = document.createElement("div")
        div.classList.add("productoEnCarrito")

        div.innerHTML = `
        <div class="nombrePrecio">
            <p>${perfume.name}</p>
            <strong>$${perfume.price}</strong>
        </div>
        <div class="cantidadEliminar">
            <p id=cantidad-${perfume.id}>Cantidad: ${perfume.cantidad}</p>
            <button class="btn waves-effect waves-ligth btnEliminar" value="${perfume.id}">X</button>
        </div>`

        carritoContenedor.appendChild(div)
    });

}

const eliminarProducto = (id) => {
    const productoId = carrito.findIndex(perfume => perfume.id == id)
    const producto = carrito.find((el) => el.id == id)
    if (producto.cantidad > 1) {
        producto.cantidad--
        listarCarrito(carrito)
        actualizarTotales(carrito)
    } else {
        carrito.splice(productoId, 1)
        listarCarrito(carrito)
        actualizarTotales(carrito)
    }
}

const actualizarTotales = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalCompra = carrito.reduce((acc, item) => acc + (item.cantidad * item.price), 0)

    pintarTotales(totalCantidad, totalCompra)
    guardarCarritoStorage(carrito)
}

const pintarTotales = (totalCantidad, totalCompra) => {
    const contador = document.getElementById("contador-carrito")
    const precioTotal = document.getElementById("precioTotal")

    contador.innerText = totalCantidad
    precioTotal.innerText = totalCompra
}

botonesDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains("eliminarTodo")) {
        Swal.fire({
            title: 'Deseas eliminar todo?',
            text: "Vas a eliminar el carrito entero!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTodo()
                Toastify({
                    text: "El carrito ha sido eliminado",
                    duration: 1600,
                    gravity: "bottom",
                    position: 'right',
                    style: {
                        background: "linear-gradient(to left, #FF4040, #FF601C",
                    }
                }).showToast()
            }
        })
    }
})

const eliminarTodo = () => {
    const carritoContenedor = document.getElementById("carritoContenedor")
    carritoContenedor.innerHTML = ""
    carrito = []
    actualizarTotales(carrito)
}

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    return carritoStorage
}

const cargarCarrito = () => {
    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage()
        listarCarrito(carrito)
        actualizarTotales(carrito)
    }
}