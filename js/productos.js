// Eventos del DOM
const compraProd1 = document.getElementById("prod1"), compraProd2 = document.querySelector("#prod2"),
    compraProd3 = document.querySelector("#prod3"), compraProd4 = document.querySelector("#prod4"),
    compraProd5 = document.querySelector("#prod5"), compraProd6 = document.querySelector("#prod6"),
    compraProd7 = document.querySelector("#prod7"), compraProd8 = document.querySelector("#prod8"),
    compraProd9 = document.querySelector("#prod9"), finCompra = document.querySelector("#btnCompra");

const carritoDom = document.querySelector(".carritoDom"), cartelCompra = document.querySelector("#cartelCompra");
const inputEmail = document.querySelector("#input-email"), inputPass = document.querySelector("#input-pass"),
    btnLogin = document.querySelector("#btnLogin"), errorLogin = document.querySelector("#errorLogin");


// Variables ********************************************************************************************
let btnDissable = document.createAttribute("atributo");
let carrito = [];
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
    console.log(carrito);
    let transito, prodExiste=false;
    if (carrito.length == 0) {
        // verifico si el carrito está vacío
        alert("producto nuevo en carrito");
        transito = new carritoProd(1, prod.nombre, prod.precio);
        carrito.push(transito);
    } else {
        for (const iterator of carrito) {
            // verifico si el producto elegido ya está en el carrito
            if (iterator.nombre == prod.nombre) {
                iterator.cant++;
                iterator.total += prod.precio;
                prodExiste=true;
                alert("producto existente en carrito");
            } 
        }
        // si el producto no está en el carrito lo agrego
        if (prodExiste == false){
            transito = new carritoProd(1, prod.nombre, prod.precio);
            carrito.push(transito);
            alert("producto nuevo en carrito");
        }
    }


    impCarrito();
    // agrego el producto al carrito en LS
    for (const iterator of carrito) {
        guardarLS("prod", carrito);
    }
}

function impCarrito() {
    // Borro todos los elementos del carrito hasta que esté vacío 
    while (carritoDom.firstChild) {
        carritoDom.removeChild(carritoDom.firstChild);
    }

    // Imprimo el carrito en el DOM
    for (const iterator of carrito) {
        item = `${iterator.cant}. ${iterator.nombre} $${iterator.total}`;
        let li = document.createElement("li");
        li.innerHTML = item;
        carritoDom.appendChild(li);
    }
}

function sumaCompra() {
    for (const iterator of carrito) {
        totalCompra += iterator.total;
    }
    cartelCompra.innerText = `El total de la compra es $${totalCompra}.\n\n¡¡¡Muchas gracias por elegirnos!!!`;
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





// Eventos **************************************************************************************************

// Deshabilito los botones de compra si no hay un usuario logeado
/*window.addEventListener("load", () => {
    console.log(leerLS("user"));
    if (!leerLS("user")) {
        // btnDissable.value = "disable";
        compraProd1.innerHTML = " disable";
    } 
})*/


// Eventos de selección de productos
compraProd1.addEventListener("click", () => {
    cargarCarrito(Productos[0]);
})
compraProd2.addEventListener("click", () => {
    cargarCarrito(Productos[1]);
})
compraProd3.addEventListener("click", () => {
    cargarCarrito(Productos[2]);
})
compraProd4.addEventListener("click", () => {
    cargarCarrito(Productos[3]);
})
compraProd5.addEventListener("click", () => {
    cargarCarrito(Productos[4]);
})
compraProd6.addEventListener("click", () => {
    cargarCarrito(Productos[5]);
})
compraProd7.addEventListener("click", () => {
    cargarCarrito(Productos[6]);
})
compraProd8.addEventListener("click", () => {
    cargarCarrito(Productos[7]);
})
compraProd9.addEventListener("click", () => {
    cargarCarrito(Productos[8]);
})

// Finalización de compra
finCompra.addEventListener("click", () => {
    sumaCompra();
    localStorage.removeItem("prod");
})

// Login de usuario
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    let user = { usuario: inputEmail.value, pass: inputPass.value }
    if (user.usuario && user.pass) {
        guardarLS("user", user);
        carrito = leerCarritoLS();
        impCarrito();
    } else {
        errorLogin.innerText = `Los campos no pueden estar vacíos`;
    }

})












