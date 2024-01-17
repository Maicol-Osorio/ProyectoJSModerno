document.addEventListener("DOMContentLoaded", function(){
    
    // variables 
    const nombre =document.querySelector("#nombre");
    const apellido =document.querySelector("#apellido");
    const email =document.querySelector("#email");
    const telefono =document.querySelector("#telefono");
    const mensaje =document.querySelector("#mensaje");
    const spiner = document.querySelector("span.loader")
    const btnSubmit = document.querySelector("input[type='submit']")
    const btnReset = document.querySelector("input[type='reset']")
    const formulario = document.querySelector(".form-box")

    const datos = {
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        mensaje: ""
    }
    

    nombre.addEventListener("input", datosEmail);
    apellido.addEventListener("input", datosEmail);
    email.addEventListener("input", datosEmail);
    telefono.addEventListener("input", datosEmail);
    mensaje.addEventListener("input", datosEmail)
    btnSubmit.addEventListener("click", simularCorreo)
    btnReset.addEventListener("click", function(e){
        e.preventDefault()
        
        datos.nombre = "",
        datos.apellido= ""
        datos.email = "",
        datos.telefono = "",
        datos.mensaje = ""

        formulario.reset()
        validarDatos()
    })

    function datosEmail(e){
        if(e.target.value.trim() === ""){
            alertaError(`el campo ${e.target.id} es requerido`, e.target.parentElement)
            datos[e.target.name] = ""
            validarDatos()
            return
        }
        limpiarAlertas(e.target.parentElement)

        if(e.target.id === "email" && !validarEmail(e.target.value)){
            alertaError("esto no es un correo valido", e.target.parentElement)
            datos[e.target.name] = ""
            validarDatos()
            return
        }

        datos[e.target.name] = e.target.value.trim().toLowerCase();
        
        validarDatos()
    }

    function alertaError(mensaje, referencia){

        limpiarAlertas(referencia)
        const alerta = document.createElement("p");
        alerta.textContent = mensaje
        alerta.classList.add("mensajeAlerta")
        referencia.appendChild(alerta)
    }


    function limpiarAlertas(referencia){

        const mensajeAlerta = referencia.querySelector(".mensajeAlerta")
        if(mensajeAlerta){
            mensajeAlerta.remove()
            return
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado
    }

    function validarDatos(){
        if(Object.values(datos).includes("")){
            btnReset.style.opacity=.4
            btnSubmit.style.opacity=.4
            btnReset.disabled = true
            btnSubmit.disabled = true
            return
        }

            btnSubmit.style.opacity=1
            btnReset.style.opacity=1
            btnReset.disabled = false
            btnSubmit.disabled = false
    }

    function simularCorreo(e){
        e.preventDefault();

        const exito = document.createElement("p")
        exito.textContent = "gmail enviado correctamente"
        exito.classList.add("exito")
        formulario.appendChild(exito)

        spiner.style.display = "block"
        setTimeout(()=>{
            spiner.style.display = "none"
            exito.style.opacity = 1
            setTimeout(()=>{
                exito.style.opacity = 0
                formulario.reset()
            },1000)
        }, 3000)

        datos.nombre = "";
        datos.apellido = "";
        datos.email = ""
        datos.telefono = ""
        datos.mensaje = ""

        
        validarDatos()
    }
})