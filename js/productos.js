//import swal from 'sweetalert';


// Elementos del DOM **************************************************************************************
const btnProd = [], btnCompra = document.querySelector("#btnCompra"), cardsDom = document.querySelector("#cardsDom");

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
const productos = [];
/*const leerProd = async () => {
    const respuesta = await fetch ("../src/data/productos.json");
    const prods = await respuesta.json();
for (const item of prods) {
    productos.push()=prods[item];
}
console.log(productos);
}*/

fetch('../src/data/productos.json')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error))

//leerProd();
// Imprimo los productos en el HTML
let html = productos.map((producto) => {
    return (
        `
        <div class="col">
            <div class="card d-flex text-end border-dark h-100 mx-5">
                <img src=${producto.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-start">${producto.nombre}</h5>
                    <p class="card-text text-start">${producto.descripcion}</p>
                    <h5 class="card-text">$${producto.precio}</h5>
                    <button type="button" class="btn align-self-end" id="btnProd${producto.item}" onClick="cargarCarrito(${producto.item})">Comprar</button>
                </div>
            </div>
        </div>
        `
    );
});
for (const iterator of html) {
    cardsDom.innerHTML += iterator;
}

// Asigno cada elemento del DOM boton de compra de los productos
productos.forEach(element => {
    btnProd.push(document.querySelector(`#btnProd${element.item}`));
});

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
    let prodCarrito = productos.find(p => p.item === prod);
    Toastify({
        text: `${prodCarrito.nombre} agregado`,
        duration: 2000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "#aa79b3",
            color: "lightgray",
        },
        offset: {
            y: 100
        },
    }).showToast();
    let transito, prodExiste = false;
    const { nombre, precio } = prodCarrito;
    // verifico si el producto elegido ya está en el carrito
    for (const iterator of carrito) {
        if (iterator.nombre == nombre) {
            iterator.cant++;
            iterator.total += precio;
            prodExiste = true;
        }
    }
    // verifico si el carrito está vacío
    if (carrito.length == 0 || prodExiste == false) {
        transito = new carritoProd(1, nombre, precio);
        carrito.push(transito);
    }
    // imprimo el carrito en el DOM
    impCarrito();
    // agrego el producto al carrito en LS
    guardarLS("prod", carrito);
    // Habilito el botón de fin de compra
    btnCompra.className = "btn me-3";
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

function modifClass(array, attr) {
    // Modifico las clases de los elementos del DOM del array
    for (const boton of array) {
        boton.className = attr;
    }
}

function clearLogin() {
    // Borro los datos del login de usuario en el DOM
    inputEmail.value = "";
    inputPass.value = "";
}

// Eventos **************************************************************************************************

// Deshabilito los botones de compra si no hay un usuario logeado
window.addEventListener("load", () => {
    let usuarioLS = leerLS("user")
    if (usuarioLS === null) {
        modifClass(btnProd, "btn disabled align-self-end");
        btnCompra.className = "btn me-3 disabled";
        msgLogin.innerText = `Debe iniciar sesión para seleccionar productos`;
    } else {
        verifCarrito();
        msgLogin.innerText = `Bienvenido ${usuarioLS.usuario}`;
        btnLogin.innerText = "Salir";
    }
})

// Finalización de compra
btnCompra.addEventListener("click", () => {
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
    let user = { usuario: inputEmail.value, pass: inputPass.value }, usuarioLS = leerLS("user");
    if (usuarioLS === null) {
        if (user.usuario && user.pass) {
            guardarLS("user", user);
            verifCarrito();
            msgLogin.innerText = `Bienvenido ${user.usuario}`;
            btnLogin.innerText = "Salir";
            errorLogin.innerText = ``;
            modifClass(btnProd, "btn align-self-end");
            clearLogin();

        } else {
            errorLogin.innerText = `Los campos no pueden estar vacíos`;
        }
    } else {
        localStorage.removeItem("user");
        btnLogin.innerText = "Ingresar";
        location.reload();
    }

})












