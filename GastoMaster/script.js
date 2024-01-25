// VARIABLES
const content = document.querySelector(".content");
const totales = document.querySelector(".totales");
const gastos = document.querySelector(".gastos");




// CLASES
class AdminPresupuesto{
    constructor(presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = []
    }

    guardarDatos(infoGastos){
        this.gastos = [...this.gastos, infoGastos];
        Apresupuesto.actualizarDatos()
    }

    actualizarDatos(){
        const restante = this.gastos.reduce((acumulador, actual)=>acumulador + actual.precio, 0);
        this.restante = this.presupuesto - restante;
    }

    eliminarGastos(id){
        this.gastos = this.gastos.filter(gasto=> gasto.id != id );
        this.actualizarDatos()
    }

}

let Apresupuesto;


class Interfaz{
    mmostrarDatos(datos){
        const {presupuesto, restante} = datos
        document.querySelector(".presupuesto").textContent = `Presupuesto: ${presupuesto}`;
        document.querySelector(".restante").textContent = `Restante: ${restante}`
    }

    mostrarMensaje(mensaje, tipo){
        const parrafo = document.createElement("p");
        parrafo.textContent = mensaje;
        parrafo.classList.add("msj")
        
        if(tipo === "error"){
            parrafo.style.background = "crimson"
        }else{
            parrafo.style.background = "cadetblue"
        }
        content.appendChild(parrafo)

        setTimeout(()=>{
            parrafo.remove()
        }, 3000)
    }

    imprimirGastos(gastosRealizados){

        const claseI = document.querySelector("lista");
        if(claseI === null){
            while(totales.firstChild){
                totales.removeChild(totales.firstChild)
            }
        }
        gastosRealizados.forEach(gastos=>{
            const {gasto, precio, id} = gastos;

            const span = document.createElement("span")
            span.textContent = precio;
            

            const i = document.createElement("i")
            i.classList.add("fa-trash");
            i.classList.add("fa-solid")
            i.dataset.id = id

            i.onclick = ()=>{
                eliminarGastos(id)
            }

            const parrafo = document.createElement("p")
            parrafo.textContent = `${gasto}:`
            parrafo.classList.add("lista")
        
            parrafo.appendChild(span)
            parrafo.appendChild(i)

            totales.appendChild(parrafo)
        })
        
    }

    actualizarRestante(restante){
        document.querySelector(".restante").textContent = `Restante: ${restante}`
    }

    actualizarColores(Apresupuesto){
        const {presupuesto, restante} = Apresupuesto;


        const totalRestante = document.querySelector(".restante")

        if(presupuesto == restante){
            totalRestante.style.removeProperty("background")
            totalRestante.style.background = "green"
        }
        else if(restante <=0){
            totalRestante.style.removeProperty("background")
            totalRestante.style.background = "crimson"
        }else if((presupuesto/4) >= restante){
            totalRestante.style.removeProperty("background")
            totalRestante.style.background = "tomato"
        }else if((presupuesto/2) >= restante){
            totalRestante.style.removeProperty("background")
            totalRestante.style.background = "cadetblue"
        }

        if(restante <= 0){
            const btn = document.querySelector(".btn");
            btn.disabled = true;
            ui.mostrarMensaje("el presupuesto se acabo", "error")
        }
    }

};

const ui = new Interfaz()




// EVENTOS 
eventLIsteners()
function eventLIsteners(){
    document.addEventListener("DOMContentLoaded", registrarPresupuesto)
    content.addEventListener("submit", validarForm)
    gastos.addEventListener("click", eliminarGastos)

};



// FUNCIONES
function registrarPresupuesto(){
    const presupuesto = prompt("¿cual es tu presupuesto?")
    if(presupuesto == "" || isNaN(presupuesto) || presupuesto<=0){
        window.location.reload();
        return
    };

    Apresupuesto= new AdminPresupuesto(presupuesto)
    ui.mmostrarDatos(Apresupuesto)
}

function validarForm(e){
    e.preventDefault()
    
    const gasto = document.querySelector("#gasto").value;
    const precio = Number(document.querySelector("#precio").value)
    
    if(gasto == "" || precio == ""){
        ui.mostrarMensaje("todos los campos son requeridos", "error")
        return
    }else if(isNaN(precio) || precio <= 0){
        ui.mostrarMensaje("el valor ingresado no es valido", "error")
        return
    }

    const infoGastos = {
        gasto,
        precio,
        id: Date.now()
    };

    Apresupuesto.guardarDatos(infoGastos)
    ui.mostrarMensaje("gasto agregado correctamente", "exito")
    document.querySelector(".datosForm").reset()

    const {gastos, restante} = Apresupuesto
    ui.imprimirGastos(gastos)
    ui.actualizarRestante(restante)
    ui.actualizarColores(Apresupuesto)
}

function eliminarGastos(id){
    Apresupuesto.eliminarGastos(id)
    const {gastos,restante} = Apresupuesto;
    ui.imprimirGastos(gastos)
    ui.actualizarRestante(restante)
    ui.actualizarColores(Apresupuesto)
    ui.validarForm(e)
}