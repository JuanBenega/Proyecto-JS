//import swal from 'sweetalert';


// Eventos del DOM **************************************************************************************
const btnProd = [document.getElementById("prod1"), document.querySelector("#prod2"), document.querySelector("#prod3"), btnProd4 = document.querySelector("#prod4"),
document.querySelector("#prod5"), document.querySelector("#prod6"), document.querySelector("#prod7"), document.querySelector("#prod8"),
document.querySelector("#prod9")], finCompra = document.querySelector("#btnCompra");

const carritoDom = document.querySelector(".carritoDom"), cartelCompra = document.querySelector("#cartelCompra"),
    saludoCompra = document.querySelector("#saludoCompra");
const inputEmail = document.querySelector("#input-email"), inputPass = document.querySelector("#input-pass"),
    btnLogin = document.querySelector("#btnLogin"), errorLogin = document.querySelector("#errorLogin")
msgLogin = document.querySelector("#msgLogin");


// Variables ********************************************************************************************
let carrito = leerCarritoLS() || [];
let totalCompra = 0;
let carritoLS, mailLS, passLS;

// Objetos **********************************************************************************************
const Productos = [
    { item: 1, nombre: "Shampoo sólido", descripcion: "Shampoo sólido", precio: 500 },
    { item: 2, nombre: "Crema facial", descripcion: "Crema facial", precio: 750 },
    { item: 3, nombre: "Crema corporal", descripcion: "Crema corporal", precio: 1200 },
    { item: 4, nombre: "Shampoo líquido", descripcion: "Shampoo líquido", precio: 500 },
    { item: 5, nombre: "Crema de anjuague", descripcion: "Crema de anjuague", precio: 750 },
    { item: 6, nombre: "Jabón natural", descripcion: "Jabón natural", precio: 800 },
    { item: 7, nombre: "Desodorante", descripcion: "Desodorante", precio: 1050 },
    { item: 8, nombre: "Dentrífico", descripcion: "Dentrífico", precio: 950 },
    { item: 9, nombre: "Crema de enjuague sólida", descripcion: "Crema de enjuague sólida", precio: 1150 }
];

class carritoProd {
    constructor(cant, nombre, total) {
        this.cant = cant;
        this.nombre = nombre;
        this.total = total;
    }
}

// Funciones *********************************************************************************************

// Cargo el carrito de compras
function cargarCarrito(prod) {
    Toastify({
        text: `${prod.nombre} agregado`,
        duration: 2000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "#aa79b3",
            border: "10px",
            color: "lightgray",
        },
        offset: {
            y: 100
        },
    }).showToast();
    let transito, prodExiste = false;
    const { nombre, precio } = prod;
    for (const iterator of carrito) {
        // verifico si el producto elegido ya está en el carrito
        if (iterator.nombre == nombre) {
            iterator.cant++;
            iterator.total += precio;
            prodExiste = true;
        }
    }
    if (carrito.length == 0 || prodExiste == false) {
        // verifico si el carrito está vacío
        transito = new carritoProd(1, nombre, precio);
        carrito.push(transito);
    }
    // imprimo el carrito en el DOM
    impCarrito();
    // agrego el producto al carrito en LS
    guardarLS("prod", carrito);
    //modifBoton(prod);
}

function impCarrito() {
    borrarCarritoDom();
    // Imprimo el carrito en el DOM
    for (const iterator of carrito) {
        item = `${iterator.cant} ${iterator.nombre} $${iterator.total}`;
        let li = document.createElement("li");
        li.innerHTML = item;
        carritoDom.appendChild(li);
    }
}

function verifCarrito() {
    if (!carrito[0]) {
        let li = document.createElement("li");
        li.innerHTML = "Por favor elija un producto";
        carritoDom.appendChild(li);
    } else {
        impCarrito();
    }
}

function sumaCompra() {
    for (const iterator of carrito) {
        totalCompra += iterator.total;
    }
}

function guardarLS(categoria, objeto) {
    localStorage.setItem(categoria, JSON.stringify(objeto));
}

function leerLS(categoria) {
    let datos = JSON.parse(localStorage.getItem(categoria));
    return datos;
}

function leerCarritoLS() {
    let prodCarrito = leerLS("prod");
    if (prodCarrito == null) {
        prodCarrito = [];
    }
    return prodCarrito;
}

function leerUser() {
    let usuario = leerLS("user");
    return usuario;
}

function borrarCarritoDom() {
    // Borro todos los elementos del carrito hasta que esté vacío 
    while (carritoDom.firstChild) {
        carritoDom.removeChild(carritoDom.firstChild);
    }
}

function modifBtn(attr) {
    for (const boton of btnProd) {
        boton.className = attr;
    }
}

// Eventos **************************************************************************************************

// Deshabilito los botones de compra si no hay un usuario logeado
window.addEventListener("load", () => {
    let usuarioLS = leerLS("user")
    if (usuarioLS === null) {
        modifBtn("btn disabled");
        msgLogin.innerText = `Debe iniciar sesión para seleccionar productos`;
    } else {
        verifCarrito();
        msgLogin.innerText = `Bienvenido ${usuarioLS.usuario}`;
    }
})


// Eventos de selección de productos
btnProd[0].addEventListener("click", () => {
    cargarCarrito(Productos[0]);
})
btnProd[1].addEventListener("click", () => {
    cargarCarrito(Productos[1]);
})
btnProd[2].addEventListener("click", () => {
    cargarCarrito(Productos[2]);
})
btnProd[3].addEventListener("click", () => {
    cargarCarrito(Productos[3]);
})
btnProd[4].addEventListener("click", () => {
    cargarCarrito(Productos[4]);
})
btnProd[5].addEventListener("click", () => {
    cargarCarrito(Productos[5]);
})
btnProd[6].addEventListener("click", () => {
    cargarCarrito(Productos[6]);
})
btnProd[7].addEventListener("click", () => {
    cargarCarrito(Productos[7]);
})
btnProd[8].addEventListener("click", () => {
    cargarCarrito(Productos[8]);
})

// Finalización de compra
finCompra.addEventListener("click", () => {
    sumaCompra();
    if (totalCompra != 0) {
        localStorage.removeItem("prod");
        carrito = [];
        swal({
            title: "¡Muchas gracias por elegirnos!",
            text: `El total de la compra es $${totalCompra}.`,
            icon: "success",
            button: "Salir",
        });
        borrarCarritoDom();
        totalCompra = 0;
    } else {
        swal({
            title: "El carrito está vacío",
            text: "Por favor eliga un producto a comprar...",
            icon: "warning",
            button: "Salir",
        });
    }

})

// Login de usuario
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    let user = { usuario: inputEmail.value, pass: inputPass.value }
    if (user.usuario && user.pass) {
        guardarLS("user", user);
        verifCarrito();
        msgLogin.innerText = `Bienvenido ${user.usuario}`;
        errorLogin.innerText = ``;
        modifBtn("btn");
        inputEmail.value = "";
        inputPass.value = "";
    } else {
        errorLogin.innerText = `Los campos no pueden estar vacíos`;
    }

})












