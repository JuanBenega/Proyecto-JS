// Elementos del DOM **************************************************************************************
const btnProd = [], btnCompra = document.querySelector("#btnCompra"), cardsDom = document.querySelector("#cardsDom");

const carritoDom = document.querySelector(".carritoDom"), cartelCompra = document.querySelector("#cartelCompra"),
    saludoCompra = document.querySelector("#saludoCompra"), cantCarrito = document.querySelector("#cantCarrito");
const inputEmail = document.querySelector("#input-email"), inputPass = document.querySelector("#input-pass"),
    btnLogin = document.querySelector("#btnLogin"), errorLogin = document.querySelector("#errorLogin")
msgLogin = document.querySelector("#msgLogin"), registro = document.querySelector("#registro");


// Variables ********************************************************************************************
let productos = [], carrito = leerCarritoLS() || [], carritoCant = 0;
let totalCompra = 0, lecturaLS = 0;
let carritoLS, mailLS, passLS;
let existUser = false;


// Objetos **********************************************************************************************

// Leo de mi base de datos de productos
async function leerProdJson() {
    const respuesta = await fetch('../data/productos.json');
    const prods = await respuesta.json();
    for (const item of prods) {
        productos.push(item);
    }
}
leerProdJson();

// Imprimo los productos en el HTML
setTimeout(impDom, 500);
function impDom() {
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
                    <button type="button" class="btn disabled align-self-end" id="btnProd${producto.item}" onClick="cargarCarrito(${producto.item})">Agregar</button>
                </div>
            </div>
        </div>
        `);
    }
    )
    for (const iterator of html) {
        cardsDom.innerHTML += iterator;
    }
    // Asigno cada elemento del DOM boton de compra de los productos
    productos.forEach(element => {
        btnProd.push(document.querySelector(`#btnProd${element.item}`));
    });
}

class carritoProd {
    constructor(cant, nombre, total, item) {
        this.cant = cant;
        this.nombre = nombre;
        this.total = total;
        this.item = item;
    }
}

// Funciones *********************************************************************************************

// Cargo el carrito de compras
function cargarCarrito(prod) {
    let prodCarrito = productos.find(p => p.item === prod);
    // imprimo un tostify con el item cargado
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
    const { nombre, precio, item } = prodCarrito;
    // verifico si el producto elegido ya está en el carrito
    for (const iterator of carrito) {
        if (iterator.nombre == nombre) {
            iterator.cant++;
            iterator.total += precio;
            prodExiste = true;
        }
    }
    // verifico si el carrito está vacío o si el producto no está en el carrito
    if (carrito.length == 0 || prodExiste == false) {
        transito = new carritoProd(1, nombre, precio, item);
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
        item = `<a href="#" id="botX" style="none" onClick="reducirCarrito(${iterator.item})">&#10060</a> ${iterator.cant} ${iterator.nombre} $${iterator.total}`;
        let li = document.createElement("li");
        li.innerHTML = item;
        carritoDom.appendChild(li);
        sumaCompra();
        cartelCompra.innerText = `Total: $${totalCompra}`;
        totalCompra = 0;
    }
    // muestro la cantidad de productos en el botón
    for (const iterator of carrito) {
        carritoCant += iterator.cant;
    }
    cantCarrito.innerText = carritoCant;
    carritoCant = 0;
}

function reducirCarrito(prod) {
    let prodCarrito = productos.find(p => p.item === prod);
    const { item, precio } = prodCarrito;
    for (const iterator of carrito) {
        if (iterator.item == item) {
            if (iterator.cant > 1) {
                iterator.cant--;
                iterator.total -= precio;
            } else if (carrito.length > 1) {
                carrito.splice(iterator, 1);
                iterator.total -= precio;
            } else {
                carrito.splice(iterator, 1);
                iterator.total -= precio;
                totalCompra = 0;
                cartelCompra.innerText = ``;
            }

        }
    }
    // imprimo el carrito en el DOM
    impCarrito();
}

function verifCarrito() {
    if (!carrito[0]) {
        let li = document.createElement("li");
        li.innerHTML = "Por favor elija un producto";
        carritoDom.appendChild(li);
        btnCompra.className = "btn me-3 disabled";
    } else {
        impCarrito();
        btnCompra.className = "btn me-3";
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
        boton.className = `${attr}`;
    }
}

function clearLogin() {
    // Borro los datos del login de usuario en el DOM
    inputEmail.value = "";
    inputPass.value = "";
}

function verifUser(mail, pass) {
    let nombre, apellido, existeMail = false, existeUser = false, usuarioLS = leerLS("userReg");
    for (const usuario of usuarioLS) {
        for (const key in usuario) {
            switch (usuario[key]) {
                case mail:
                    existeMail = true;
                    nombre = usuario.nombre;
                    apellido = usuario.apellido;
                    break;
                case pass:
                    existeMail ? existUser = true : existUser = false;
                    break;
                default:
                    break;
            }
        }
    }
    return (`${nombre} ${apellido}`);
}

// Eventos **************************************************************************************************


// Deshabilito los botones de compra si no hay un usuario logeado
window.addEventListener("load", () => {
    let usuarioLS = leerLS("user");
    if (usuarioLS === null) {
        btnCompra.className = "btn me-3 disabled";
        msgLogin.innerText = `Inicie sesión para comprar`;
        errorLogin.innerText = ``
    } else {
        let nombre = verifUser(usuarioLS.usuario, usuarioLS.pass)
        verifCarrito();
        msgLogin.innerText = `Bienvenido ${nombre}`;
        btnLogin.innerText = "Salir";
        setTimeout(() => {
            modifClass(btnProd, "btn align-self-end");
        }, 1000);

    }
})


// Finalización de compra
btnCompra.addEventListener("click", () => {
    let numPedido = Math.floor(Math.random() * 10000);
    sumaCompra();
    if (totalCompra != 0) {
        localStorage.removeItem("prod");
        carrito = [];
        swal({
            title: `El total de la compra es $${totalCompra}.\n¡Muchas gracias por elegirnos!`,
            text: `Tu número de pedido es ID${numPedido}.\nTe enviaremos por mail el link de pago y seguimiento de pedido.`,
            icon: "success",
            button: "Salir",
        })
            .then(() => {
                borrarCarritoDom();
                totalCompra = 0;
                cartelCompra.innerText = "";
                cantCarrito.innerText = carrito.length;
                localStorage.removeItem("user");
                location.reload();
            });

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
    let user = { usuario: inputEmail.value.toLowerCase(), pass: inputPass.value.toLowerCase() }, usuarioLS = leerLS("userReg");
    // verifico si hay usuarios registrados
    if (usuarioLS === null) {
        if (user.usuario && user.pass) {
            swal({
                title: "Usuario no encontrado",
                text: "Debe registrarse para porder comprar con nostros",
                icon: "info",
                button: "Registrar",
            })
                .then(() => {
                    document.location.href = "../pages/registro.html"
                });
        } else {
            swal({
                title: "Los campos no pueden estar vacíos",
                icon: "warning",
                button: "Ok",
            });
        }
    } else {
        let nombre;
        // verifico si el usuario ingresado coincide con uno registrado
        nombre = verifUser(user.usuario, user.pass);
        if (existUser) {
            swal({
                title: `Bienvenido ${nombre}`,
                icon: "success",
                button: "Ok",
            })
            msgLogin.innerText = `Bienvenido ${nombre}`;
            btnLogin.innerText = "Salir";
            modifClass(btnProd, "btn align-self-end");
            btnCompra.className = "btn me-3";
            clearLogin();
            verifCarrito();
            guardarLS("user", user);
            existUser = false;
        } else {
            swal({
                title: "Datos incorrectos",
                icon: "error",
                button: "Ok",
            });
        }
    }

})















