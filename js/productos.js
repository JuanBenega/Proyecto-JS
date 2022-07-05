//let listaproductos = ["1. Crema facial - $750", "\n2. Crema corporal - $1200", "\n3.Shampoo sólido - $500", "\n4.Shampoo líquido - $750", "\n5.Crema de enjuague - $800", "\n6.Jabón natural - $300", "\n\nPara salir presione 0"];
let precioProducto = [];
let producto = [];
let listaProductos = "";
let total = 0;

let cantProductos = 3;
let salir = false;


function ProductoLista(item, nombre, precio) {
    this.item = item;
    this.nombre = nombre;
    this.precio = precio;
}


function ingresoProductos(n) {
    let productoingresado = prompt("Elija el producto " + n + " a comprar: \n" + listaProductos + "\nPresione 0 para salir.");
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

let producto1 = new ProductoLista("1. ", "Crema facial", "$750");
let producto2 = new ProductoLista("2. ", "Crema corporal", "$1200");
let producto3 = new ProductoLista("3. ", "Shampoo sólido", "$500");
let producto4 = new ProductoLista("4. ", "Shampoo líquido", "$750");
let producto5 = new ProductoLista("5. ", "Crema de anjuague", "$800");
let producto6 = new ProductoLista("6. ", "Jabón natural", "$300");

let Productos = [producto1, producto2, producto3, producto4, producto5, producto6];

for (const iterator of Productos) {
    listaProductos = listaProductos + iterator.item + iterator.nombre + " - " + iterator.precio + "\n";
}
while (salir === false) {
    alert("Hola elegí tu producto para agregar al carrito de compras.\nPresioná ACEPTAR para continuar.");

    for (let i = 1; i < 10; i++) {
        producto[i] = ingresoProductos(i);
        if (producto[i] != "0") {
            precioProducto[i] = valorProducto(producto[i]);
            total += precioProducto[i];
            console.log(total);
        } else {
            salir = true;
            break;
        }
        if (i==9) {
            salir=true;
        }
    }

    if (total != 0) {
        alert("El total de la compra es: $" + total + "\n\n¡Muchas gracias por tu compra!");
    } else {
        alert("Esperamos que la próxima nos elijas...")
    }

}
