let listaproductos = "1. Crema facial - $750\n2. Crema corporal - $1200\n3.Shampoo sólido - $500\n4.Shampoo líquido - % 750\n5.Crema de enjuague - $800\n6.Jabón natural - $300";
let valorProducto1;
let valorProducto2;
let valorProducto3;
let cantProductos = 3;
let salir = false;

function ingresoProductos(n) {
    let productoingresado = prompt("Elija el producto " + n + " a comprar: \n" + listaproductos);
    return productoingresado;
}


function sumaCarrito(a, b, c) {
    let resultado = a + b + c;
    return resultado;
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
        default:
            valor = 0;
            break;
    }
    return (valor);
}

while (salir === false) {
    alert("Hola elegí " + cantProductos + " productos para agregar al carrito de compras.\nPresioná ACEPTAR para continuar.");

    let producto1 = ingresoProductos(1);
    valorProducto1 = valorProducto(producto1);

    let producto2 = ingresoProductos(2);
    valorProducto2 = valorProducto(producto2);

    let producto3 = ingresoProductos(3);
    valorProducto3 = valorProducto(producto3);


    let total = sumaCarrito(valorProducto1, valorProducto2, valorProducto3);
    alert("El total de la compra es: $" + total);

    let salida = prompt("¿Desea salir? (Si/No)").toLowerCase();
    if (salida === "si") {
        salir = true;
        alert("Muchas gracias por elegirnos!!!");
    }
}
