//Obtener inputs:

const inputs = document.querySelectorAll("input");

const botonEnviar = document.getElementById("botonEnviar");
botonEnviar.disabled = true;
inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

const textarea = document.querySelector("textarea");
textarea.addEventListener("blur", (textarea) => {
    valida(textarea.target);
});

function valida(elemento){
    const tipoDeElemento = elemento.dataset.tipo;
    var textAreaEnError = 0;
    if(tipoDeElemento == "mensaje"){
        if(textarea.value.length > 300){
            elemento.parentElement.classList.add("input-container--invalid");
            elemento.parentElement.querySelector(".input-message-error").innerHTML = "El mensaje debe contener máximo 300 caractéres";
            textAreaEnError = 1;
            chequearFormCompleto();
        }
    }

    if(elemento.validity.valid && textAreaEnError == 0){
        elemento.parentElement.classList.remove("input-container--invalid");
        elemento.parentElement.querySelector(".input-message-error").innerHTML = "";
        chequearFormCompleto();
    } else if (!elemento.validity.valid && textAreaEnError == 0){
        elemento.parentElement.classList.add("input-container--invalid");
        elemento.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeElemento, elemento);
        chequearFormCompleto();
    }
}

function chequearFormCompleto(){
    var inputsValidos = 0;
    inputs.forEach( input => {
        if(input.validity.valid){
            inputsValidos++;
        }
    });

    if(inputsValidos == inputs.length){
        if(textarea.validity.valid){
            botonEnviar.disabled = false;
            botonEnviar.classList.add("boton-activo");
        } else {
            botonEnviar.classList.remove("boton-activo");
            botonEnviar.disabled = true;
        }
    } else {
        botonEnviar.classList.remove("boton-activo");
        botonEnviar.disabled = true;
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El nombre debe contener entre 3 a 50 caractéres"
    },

    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },

    asunto: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El asunto debe contener entre 3 a 50 caractéres"
    },

    mensaje: {
        valueMissing: "Este campo no puede estar vacío"
    }

};

function mostrarMensajeDeError(tipoDeElemento, elemento){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(elemento.validity[error]){
            console.log(error);
            console.log(elemento.validity[error]);
            console.log(mensajesDeError[tipoDeElemento][error]);
            mensaje = mensajesDeError[tipoDeElemento][error];
        }
    });
    return mensaje;
}