// VARIABLES
const btnMenu = document.querySelector("#menu-btn");
const navBar =  document.querySelector(".navbar")
const formulario = document.querySelector("form")
const contenido = document.querySelector(".contenido")
const resultado = document.querySelector(".resultados")



// EVENTOS
eventLIsteners()
function eventLIsteners(){
    formulario.addEventListener("submit", validarForm)
}

function validarForm(e){
    e.preventDefault()
    const pais = document.querySelector("#paises").value;
    const ciudad = document.querySelector("#ciudades").value;
    
    if(pais == "" || ciudad == ""){
        mostrarAlerta("todos los campos son requeridos", "error")
        return;
    }

    mostrarAlerta("buscando clima", "exito")
    setTimeout(()=>{
        consultarApi(ciudad, pais)
    },2000)
}

function consultarApi(ciudad, pais){
    const apiKey = "a07bac501ddc9fde01b67f202e638255";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
    console.log(url)
    
    fetch(url)
        .then( resultado=>resultado.json())
        .then(datos=>{
            if(datos.cod == "404"){
                mostrarAlerta("la ciudad no esta disponible", "error");
                return
            }
            formulario.reset()
            mostrarHtml(datos, pais, ciudad)
        })
}

function mostrarHtml(datos, pais, ciudad){

    const {main: {temp, temp_min, temp_max}} = datos

    const tempMin = convertir(temp_min)
    const tempMax = convertir(temp)
    const tempActual = convertir(temp_max)
    

    let paises;
    switch (pais) {
        case "CO":
            paises = "colombia"
            break;
        case "CR":
            paises = "Costa Rica"
            break;
        case "ES":
            paises = "España"
            break;
        case "US":
            paises = "Estados Unidos"
            break;
        case "MX":
            paises = "México"
            break;
        case "PE":
            paises = "Perú"
            break;
    
        default:
            break;
    }
    

    resultado.innerHTML =  `
        <h3>Resultados de la Búsqueda de Clima</h3>

        <div class="lugar">
            <p>País: <span>${paises}</span></p>
            <p>Ciudad: <span>${ciudad}</span></p>
        </div>

        <div class="temp">
            <div class="box">
                <i class="fa-solid fa-temperature-arrow-down"></i>
                <h4>Temperatura Mínima</h4>
                <p>${tempMin}ºC</p>
            </div>


            <div class="box">
                <i class="fa-solid fa-temperature-low"></i>
                <h4>Temperatura Actual</h4>
                <p>${tempActual}ºC</p>
            </div>

            <div class="box">
                <i class="fa-solid fa-temperature-arrow-up"></i>
                <h4>Temperatura Máxima</h4>
                <p>${tempMax}ºC</p>
            </div>
        </div>

        <p> para la ciudad de ${ciudad}, en ${paises}, se presenta una temperatura máxima proyectada de ${tempMax}°C y una mínima de ${tempMin}°C, con la temperatura actual registrada en ${tempActual}°C</p>
    `
    contenido.appendChild(resultado)
    document.querySelector(".resultado-content").appendChild(contenido)
    
}

function convertir(datos){
    return parseInt(datos - 273.15)
}
function mostrarAlerta(mensaje, tipo){
    const alerta = document.createElement("p");
    alerta.textContent = mensaje;
    alerta.classList.add("alerta")
    formulario.appendChild(alerta)
    
    if(tipo == "error"){
        alerta.style.background = "darkred"
    }else{
        alerta.style.background = "green"
    }

    setTimeout(()=>{
        alerta.remove()
    },2000)
}

btnMenu.addEventListener("click", hoverNav)
window.onscroll = ()=>{
    btnMenu.classList.remove("fa-times");
    navBar.classList.remove("active")
}

function hoverNav(){
    btnMenu.classList.toggle("fa-times");
    navBar.classList.toggle("active");
}

function desplazamiento(){
    console.log("desplazando")
}

