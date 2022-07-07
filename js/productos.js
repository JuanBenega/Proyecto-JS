//let listaproductos = ["1. Crema facial - $750", "\n2. Crema corporal - $1200", "\n3.Shampoo sólido - $500", "\n4.Shampoo líquido - $750", "\n5.Crema de enjuague - $800", "\n6.Jabón natural - $300", "\n\nPara salir presione 0"];
let precioProducto = [];
let producto = [];
let listaProductos = "";
let total = 0;
const carrito = [];
let precioFiltro;
let productosFiltrados = [];

let cantProductos = 3;
let salir = false;



function ingresoProductos(n) {
    let productoingresado = prompt("Elija el producto " + n + " a comprar: \n" + listaProductos + "\nPresione 8 para filtrar por precio menor." + "\nPresione 9 para filtrar por precio mayor." + "\nPresione 0 para salir.");
    return productoingresado;
}


function valorProducto(a) {
    let valor;
    switch (a) {
        case "1":
            valor = 750;
            break;
        case "2":
            valor = 1200;
            break;
        case "3":
            valor = 500;
            break;
        case "4":
            valor = 750;
            break;
        case "4":
            valor = 300;
            break;
        case "5":
            valor = 800;
            break;
        case "6":
            valor = 300;
            break;
        case "0":
            valor = 1111;
            break;
        default:
            valor = 0;
            break;
    }
    return (valor);
}



let Productos = [
    { item: "1. ", nombre: "Crema facial", precio: 750 },
    { item: "2. ", nombre: "Crema corporal", precio: 1200 },
    { item: "3. ", nombre: "Shampoo sólido", precio: 500 },
    { item: "4. ", nombre: "Shampoo líquido", precio: 750 },
    { item: "5. ", nombre: "Crema de anjuague", precio: 800 },
    { item: "6. ", nombre: "Jabón natural", precio: 300 }
];

for (const iterator of Productos) {
    listaProductos = listaProductos + iterator.item + iterator.nombre + " - " + iterator.precio + "\n";
}
console.log(Productos);
while (salir === false) {
    alert("Hola elegí tu producto para agregar al carrito de compras.\nPresioná ACEPTAR para continuar.");
    let filtro = alert("¿Querés aplicar algún filtro para los precios?\n\nIngresá s/n");
    if (filtr) {
        
    } else {
        
    }

    for (let i = 0; i < 10; i++) {
        producto[i] = ingresoProductos(i + 1);
        if (producto[i] != "0") {
            if (producto[i] == 8) {
                precioFiltro = prompt("Ingresa el precio máximo por que querés filtrar");
                productosFiltrados = Productos.filter((el)=>{
                    return el.precio < precioFiltro;
                })
                listaProductos = [];
                for (const iterator of productosFiltrados) {
                    listaProductosFiltrados = listaProductos + iterator.item + iterator.nombre + " - " + iterator.precio + "\n";
                }
                producto[i] = ingresoProductos(i + 1);
            } else if (producto[i] == 9) {
                precioFiltro = prompt("Ingresa el precio mínimo por que querés filtrar");
            }
            carrito.push(Productos[producto[i] - 1]);

        } else {
            salir = true;
            for (const iterator of carrito) {
                total += iterator.precio;
            }
            break;
        }
        if (i == 9) {
            salir = true;
        }
    }

    if (total != 0) {
        alert("El total de la compra es: $" + total + "\n\n¡Muchas gracias por tu compra!");
    } else {
        alert("Esperamos que la próxima nos elijas...")
    }

}
