// boton de menu 

const btnMenu = document.querySelector(".menu-btn");
const btnNavbar = document.querySelector(".navbar");
btnMenu.addEventListener("click", ()=>{
    btnMenu.classList.toggle("active")
    btnMenu.classList.toggle("fa-xmark")
    btnNavbar.classList.toggle("active")
})



// cotizador de seguros con prototypes
const formSeguros = document.querySelector(".formSeguros")
const home = document.querySelector(".home");

function segurosAutos(marca, modelo, tipo){
    this.marca = marca;
    this.modelo = parseInt(modelo);
    this.tipo = tipo
}


segurosAutos.prototype.cotizarSeguro = function(){
    
    const precioBase = 2000;
    let total;

    switch (this.marca) {
        case "1":
            total = precioBase * 1.15;
            nombreMarca = "americano"
            break;
        case "2":
            total = precioBase * 1.05
            nombreMarca = "asiatico"
            break
        case "3":
            total = precioBase * 1.35;
            nombreMarca = "europeo"
            break;
        
        default:
            break;
    }



    const diferencia = new Date().getFullYear() - this.modelo;
    total -= (((diferencia * 3) *total) /100);

    if(this.tipo === "basico"){
        total *= 1.30
    }else{
        total *= 1.50
    }

    return total
}









function interfaz(){}

const ui = new interfaz()
console.log(ui)
interfaz.prototype.mostrarModelos = ()=>{
    const fechaActual = new Date().getFullYear();
    const fechaInicio = fechaActual - 20

    
    for(let i = fechaActual; i>=fechaInicio; i--){
        const opciones = document.createElement("option");
        opciones.value = i;
        opciones.textContent = i;
        
        const modelo = document.querySelector("#modelo");
        modelo.appendChild(opciones)
    }
}

interfaz.prototype.validarForm = (e)=>{
    e.preventDefault();
    
    const marca = document.querySelector("#marca").value;
    const modelo = document.querySelector("#modelo").value
    const tipo = document.querySelector("input[name='seleccion']:checked").value

    if(marca === "" || modelo === "" || tipo === ""){
        ui.mostrarAlertas("todos los campos son requeridos", "error")
        return
    }

    ui.mostrarAlertas("validando...", "exito")


    const seguros = new segurosAutos(marca, modelo, tipo)
    const totalSeguro = seguros.cotizarSeguro()
    ui.mostrarSeguro(seguros, totalSeguro)
}

interfaz.prototype.mostrarAlertas = (mensaje, tipo)=>{
    
    const msj = document.createElement("p");
    const span = document.createElement("span");
    home.appendChild(span)
    msj.textContent = mensaje;
    
    if(tipo === "error"){
        msj.classList.add("msj")
    }else if(tipo === "exito"){
        msj.classList.add("exito")
        span.classList.add("loader")
    }

    formSeguros.appendChild(msj)

    setTimeout(()=>{
        msj.remove();
        span.remove()
    }, 3000)
}

interfaz.prototype.mostrarSeguro = (seguro, totalSeguro)=>{
    
    const resultado = document.querySelector(".seguro")
    const div = document.createElement("div");
    div.classList.add("resultado");


    const {marca, modelo, tipo} = seguro

    let nombreMarca;
    switch (marca) {
        case "1":
            nombreMarca = "americano"
            break;
        case "2":
            nombreMarca = "asiatico"
            break
        case "3":
            nombreMarca = "europeo"
            break;
        
        default:
            break;
    }

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
    
    div.innerHTML = `
        <h4>resumen de seguro</h4>
        <p><span>marca:</span>${nombreMarca}</p>
        <p><span>modelo:</span>${modelo}</p>
        <p><span>tipo:</span>${tipo}</p>
        <p><span>total:</span>${parseInt(totalSeguro)}</p>
    `
    setTimeout(()=>{
        resultado.innerHTML = `
        <h3>Detalles y Tarifas de tu Seguro</h3>
    `
        resultado.appendChild(div)
    },3000)

}


document.addEventListener("DOMContentLoaded", ()=>{
    ui.mostrarModelos()
})

eventListeners()
function eventListeners(){
    formSeguros.addEventListener("submit", ui.validarForm)
}


