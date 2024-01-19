// boton del menu 
const btnMenu = document.querySelector("#menu-btn");
const navbar = document.querySelector(".navbar")
btnMenu.addEventListener("click", ()=>{
    btnMenu.classList.toggle("fa-xmark")
    navbar.classList.toggle("active")
})

// eliminar con el scroll 
window.onscroll = ()=>{
    btnMenu.classList.remove("fa-xmark")
    navbar.classList.remove("active")
}


// filtrar en base a diferentes condiciones 

const boxContainer = document.querySelector(".box-container");
const TipoVehiculo = document.querySelector("#TipoVehiculo")
const  Marca = document.querySelector("#Marca");
const  Color = document.querySelector("#Color");
const  Transmision = document.querySelector("#Transmision");
const  Traccion = document.querySelector("#Traccion");
const  TipoCombustible = document.querySelector("#TipoCombustible");
const  CapacidadPasajeros = document.querySelector("#CapacidadPasajeros");
const  PrecioMax = document.querySelector("#precioMax");

const datosAutos = {
    TipoVehiculo: "",
    Marca: "",
    Color: "",
    Transmision: "",
    Traccion: "",
    TipoCombustible: "",
    CapacidadPasajeros: "",
    Precio: ""
}


document.addEventListener("DOMContentLoaded", ()=>{
    mostrarAutos(autos)
    crearPreciosMax()
})

function mostrarAutos(autos){
   
    limpiarHtml()
    autos.forEach(auto=>{
        const cardAuto = document.createElement("div");
        const {TipoVehiculo, Marca, Modelo, Color, Transmision, Traccion, CapacidadPasajeros, Precio, TipoCombustible, src} = auto
        cardAuto.innerHTML = `
            <img src="${src}">
            <h3>${Marca} <span>${Modelo}</span></h3>
            <p>El <span class="datos">${TipoVehiculo} ${Marca} ${Modelo}</span>, en un vibrante color <span class="datos">${Color}</span>, ofrece una conducción suave y eficiente con transmisión <span class="datos">${Transmision}</span> y tracción <span class="datos">${Traccion}</span>. Con capacidad para <span class="datos">${CapacidadPasajeros}</span> pasajeros, su sistema a base de <span class="datos">${TipoCombustible}</span> lo convierten en una opción elegante y accesible para cualquier conductor.</p>
            <span class="btn">${auto.Precio}</span>
        `
        cardAuto.classList.add("box");

        boxContainer.appendChild(cardAuto)
    })

}

function crearPreciosMax(){
    for(let i = 10000; i<=70000; i +=5000){
        const precios = document.createElement("option");
        precios.value = i;
        precios.textContent = i;
        precioMax.appendChild(precios)
    }
}


function limpiarHtml(){
    while(boxContainer.firstChild){
        boxContainer.removeChild(boxContainer.firstChild)
    }
}


TipoVehiculo.addEventListener("change", (e)=>{
    datosAutos.TipoVehiculo = e.target.value
    filtrarAutos()
})

Marca.addEventListener("change", (e)=>{
    datosAutos.Marca = e.target.value
    filtrarAutos()
})

Color.addEventListener("change", (e)=>{
    datosAutos.Color = e.target.value
    filtrarAutos()
})

Transmision.addEventListener("change", (e)=>{
    datosAutos.Transmision = e.target.value
    filtrarAutos()
})

Traccion.addEventListener("change", (e)=>{
    datosAutos.Traccion = e.target.value
    filtrarAutos()
})

TipoCombustible.addEventListener("change", (e)=>{
    datosAutos.TipoCombustible = e.target.value
    filtrarAutos()
})

CapacidadPasajeros.addEventListener("change", (e)=>{
    datosAutos.CapacidadPasajeros = parseInt(e.target.value)
    console.log(typeof e.target.value)
    filtrarAutos()
})

PrecioMax.addEventListener("change", (e)=>{
    datosAutos.Precio = e.target.value
    filtrarAutos()
})


function filtrarAutos(){
    const resultado = autos.filter(filtrarTipoVehiculo).filter(filtrarMarca).filter(filtrarColor).filter(filtrarTransmision).filter(filtrarTraccion).filter(filtrarTipoCombustible).filter(filtrarMax).filter(filtrarPasajeros)
    mostrarAutos(resultado)
    console.log(resultado)
}

function filtrarTipoVehiculo(autos){
    const {TipoVehiculo} = datosAutos
    if(TipoVehiculo){
        return autos.TipoVehiculo === TipoVehiculo
    }
    return autos
}

function filtrarMarca(autos){
    const {Marca} = datosAutos
    if(Marca){
        return autos.Marca === Marca
    }
    return autos
}

function filtrarColor(autos){
    const {Color} = datosAutos
    if(Color){
        return autos.Color === Color
    }
    return autos
}

function filtrarTransmision(autos){
    const {Transmision} = datosAutos
    if(Transmision){
        return autos.Transmision === Transmision
    }
    return autos
}

function filtrarTraccion(autos){
    const {Traccion} = datosAutos
    if(Traccion){
        return autos.Traccion === Traccion
    }
    return autos
}

function filtrarTipoCombustible(autos){
    const {TipoCombustible} = datosAutos
    if(TipoCombustible){
        return autos.TipoCombustible === TipoCombustible
    }
    return autos
}

function filtrarMax(autos){
    const {Precio} = datosAutos
    if(Precio){
        return autos.Precio <= Precio
    }
    return autos
}

function filtrarPasajeros(autos){
    const {CapacidadPasajeros} = datosAutos
    if(CapacidadPasajeros){
        return autos.CapacidadPasajeros === CapacidadPasajeros
    }
    return autos
}




