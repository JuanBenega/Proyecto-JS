// Elementos del DOM **************************************************************************************
const regNombre = document.querySelector('#regNombre'), regApellido = document.querySelector('#regApellido'), regMail = document.querySelector('#regMail'),
    regDirCalle = document.querySelector('#regDirCalle'), regDirNum = document.querySelector('#regDirNum'), regDirLoc = document.querySelector('#regDirLoc'),
    regDirProv = document.querySelector('#regDirProv'), regUser = document.querySelector('#regUser'), regPass = document.querySelector('#regPass');

const btnReg = document.querySelector('#btnReg');

// Funciones *******************************************************************************
function leerLS(categoria) {
    let datos = JSON.parse(localStorage.getItem(categoria));
    return datos;
}

function guardarLS(categoria, objeto) {
    localStorage.setItem(categoria, JSON.stringify(objeto));
}

function verifDatos (objeto) {
    let cont = 0;
    
    for (const dato in objeto) {
        objeto[dato] != "" ? cont++ : cont--;
    }

    return cont;
}


function guardarUsuario (usuario) {
    let campoVacio=verifDatos(usuario);
    if (campoVacio == 8) {
        guardarLS("regUser", usuario);
        swal({
            title: `Bienvenido ${usuario.nombre} ${usuario.apellido}`,
            text: "Muchas gracias por registrate en nuestro sitio",
            icon: "success",
            timer: 5000,
        });
        //location.reload();
    } else {
        swal({
            title: "Los datos no pueden estar vacíos",
            text: "Por favor complete los todos los campos",
            icon: "warning",
            button: "Salir",
        });
    }
}


// Eventos del DOM *************************************************************************************
btnReg.addEventListener("click", (e) => {
    e.preventDefault();
    let regUser = {
        nombre: regNombre.value,
        apellido: regApellido.value,
        mail: regMail.value,
        dir: regDirCalle.value,
        numero: regDirNum.value,
        localidad: regDirLoc.value,
        provincia: regDirProv.value,
        pass: regPass.value
    };
    let usuarioLS = leerLS("regUser"), existUser = false;

    if (usuarioLS === null) {
        guardarUsuario (regUser);

    } else {

        console.log(usuarioLS);
        /*usuarioLS.forEach(element => {
            element.nombre != regUser.nombre && element.apellido === regUser.apellido && existUser=true;
            if (existUser) {
                swal({
                    title: "Este usuario ya está registrado",
                    text: `Por favor vuelva a completar los datos`,
                    icon: "warning",
                    button: "Salir",
                });
                location.reload();
            }
        });*/

    }

})


