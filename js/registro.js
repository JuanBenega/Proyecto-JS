// Elementos del DOM **************************************************************************************
const regNombre = document.querySelector('#regNombre'), regApellido = document.querySelector('#regApellido'), regMail = document.querySelector('#regMail'),
    regDirCalle = document.querySelector('#regDirCalle'), regDirNum = document.querySelector('#regDirNum'), regDirLoc = document.querySelector('#regDirLoc'),
    regDirProv = document.querySelector('#regDirProv'), regUser = document.querySelector('#regUser'), regPass = document.querySelector('#regPass');

const btnReg = document.querySelector('#btnReg');



// Funciones *******************************************************************************
function leerLS() {
    let usuarioJSON = JSON.parse(localStorage.getItem("userReg"));
    return (usuarioJSON);
}

function guardarLS(categoria, objeto) {
    localStorage.setItem(categoria, JSON.stringify(objeto));
}

function verifDatos(objeto) {
    //cuento los campos completados
    let cont = 0;
    //for (const objeto of entrada) {
    for (const dato in objeto) {
        objeto[dato] != "" ? cont++ : cont--;
    }
    //}
    if (cont == 8) {
        swal({
            title: `Bienvenido ${objeto.nombre} ${objeto.apellido}`,
            text: "Muchas gracias por registrate en nuestro sitio",
            icon: "success",
            timer: 5000,
        });
        let demora = window.setTimeout(document.location.href = "../pages/productos.html", 5000);
        window.clearTimeout(demora);
        //location.reload();
    } else {
        swal({
            title: "Los datos no pueden estar vacíos",
            text: "Por favor complete los todos los campos",
            icon: "warning",
            button: "Salir",
        });
    }
    // si todos los campos están completos devuelvo 8
    return cont;
}


// Eventos del DOM *************************************************************************************
btnReg.addEventListener("click", (e) => {
    e.preventDefault();
    let existNombre = false, existUser = false, camposVacios, usuarios = [], usuarioLS = [];
    // leo los datos del DOM
    let regUser = {
        nombre: regNombre.value.toLowerCase(),
        apellido: regApellido.value.toLowerCase(),
        mail: regMail.value.toLowerCase(),
        dir: regDirCalle.value.toLowerCase(),
        numero: regDirNum.value.toLowerCase(),
        localidad: regDirLoc.value.toLowerCase(),
        provincia: regDirProv.value.toLowerCase(),
        pass: regPass.value
    };


    usuarioLS = leerLS();
    if (usuarioLS === null) {
        // Si no existen usuarios creados guardo el usuario nuevo
        // verifico que no haya campos vacíos
        verifDatos(regUser) == 8 && usuarios.push(regUser);
        guardarLS("userReg", usuarios);


    } else {
        // Si existen usuarios verifico que el nuevo no coincida con ninguno anterior
        if (verifDatos(regUser) == 8) {
            // recorro los usuarios registrados
            for (const usuario of usuarioLS) {
                for (const key in usuario) {
                    switch (usuario[key]) {
                        case regUser.nombre:
                            existNombre = true;
                            break;
                        case regUser.apellido:
                            existNombre ? existUser = true : existUser = false;
                            break;
                        case regUser.mail:
                            existUser = true;
                            break;
                        default:
                            break;
                    }
                }
            }
            if (existUser) {
                swal({
                    title: "Este usuario ya está registrado",
                    text: `Por favor revise los datos cargados`,
                    icon: "warning",
                    button: "Salir",
                });
            } else {
                // Si el usuario no coincide con ninguno de los creados, lo guardo
                usuarios.push(regUser);
                for (const iterator of usuarioLS) {
                    usuarios.push(iterator);
                }
                guardarLS("userReg", usuarios);
            }
        }
    }

})







