// VARIABLES
const inputNombre = document.querySelector("#nombre");
const inputPropietario = document.querySelector("#propietario");
const inputTelefono = document.querySelector("#telefono");
const inputFecha = document.querySelector("#fecha");
const inputHora = document.querySelector("#hora");
const inputsSintomas = document.querySelector("#sintomas");
const formulario = document.querySelector(".formulario")
const divCreadas = document.querySelector(".citasCreadas")
let DB;
let modoEdicion

const objVeterinaria =  {
    nombre: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}

// EVENTOS 

window.onload = ()=>{
    eventLIsteners()
    citasDb()
}

function eventLIsteners(){
    inputNombre.addEventListener("blur", agragarDatos)
    inputPropietario.addEventListener("blur", agragarDatos)
    inputTelefono.addEventListener("blur", agragarDatos)
    inputFecha.addEventListener("blur", agragarDatos)
    inputHora.addEventListener("blur", agragarDatos)
    inputsSintomas.addEventListener("blur", agragarDatos)
    formulario.addEventListener("submit", validarForm)
}

// CLASES 
class Veterinaria{
    constructor(){
        this.citasCreadas = []
    }

    agregarCitas(citas){
        this.citasCreadas = [...this.citasCreadas, citas]
    }

    eliminarCita(id){
        const transaction = DB.transaction(["pacientes"], "readwrite")
        const objectStore = transaction.objectStore("pacientes")
        objectStore.delete(id)

        transaction.oncomplete = ()=>{
          ui.mostrarAlerta("paciente eliminado correctamente", "exito")  
        }
        ui.imprimirCitas()
    }

    edicionCitas(citaActual){
        this.citasCreadas = this.citasCreadas.map(cita=> cita.id === citaActual.id? citaActual: cita)
    }
}

const Citas = new Veterinaria()

class Interfaz {
    mostrarAlerta(mensaje, tipo){
        const mensajes = document.createElement("p");
        mensajes.textContent = mensaje;
        mensajes.classList.add("msj");
        formulario.appendChild(mensajes)

        if(tipo === "error"){
            mensajes.style.background = "red"
        }else if(tipo == "edicion"){
            mensajes.style.background = "blue"
        }

        setTimeout(()=>{
            mensajes.remove()
        },3000)
    }

    imprimirCitas(){
        
        limpiarHtml(divCreadas)
        
        const objectStore = DB.transaction("pacientes").objectStore("pacientes")
        objectStore.openCursor().onsuccess = (e)=>{
            const cursos = e.target.result

            if(cursos){
                const {nombre, propietario, telefono, fecha, hora, sintomas, id} = cursos.value
            

                const divBtn = document.createElement("div");
                divBtn.classList.add("botones")

                const paciente = document.createElement("div");
                paciente.classList.add("paciente");
                paciente.innerHTML = `
                    <h4>${nombre}</h4>
                    <p><span>propietario</span>${propietario}</p>
                    <p><span>telefono</span>${telefono}</p>
                    <p><span>fecha ingreso</span>${fecha}</p>
                    <p><span>hora ingreso</span>${hora}</p>
                    <p><span>sintomas</span>${sintomas}</p>

                `
                paciente.appendChild(divBtn)
                divCreadas.appendChild(paciente)

                const btnEliminar = document.createElement("a")
                btnEliminar.textContent = "borrar";
                btnEliminar.classList.add("borrar")
                btnEliminar.dataset.id = id
                divBtn.appendChild(btnEliminar)

                const btnEditar = document.createElement("a")
                btnEditar.textContent = "editar";
                btnEditar.classList.add("editar")
                btnEditar.dataset.id = id
                divBtn.appendChild(btnEditar)

                btnEliminar.onclick = ()=>{
                    eliminarCita(id)
                }
                 const citas = cursos.value
                btnEditar.onclick = ()=>{
                    editarCita(citas)
                }

                cursos.continue()

                }
            }

    }
}

const ui = new Interfaz()

// FUNCIONES
function agragarDatos(e){
    objVeterinaria[e.target.name] = e.target.value;
}

function validarForm(e){
    e.preventDefault()
    
    const {nombre, propietario, telefono, fecha, hora, sintomas} = objVeterinaria

    if(nombre == "" || propietario =="" || telefono == "" || fecha == "" || hora == "" || sintomas == ""){
        ui.mostrarAlerta("todos los campos son requeridos", "error")
        return
    }


    if(modoEdicion){
        Citas.edicionCitas({...objVeterinaria})
        
        const transaction = DB.transaction(["pacientes"], "readwrite")
        const objectStore = transaction.objectStore("pacientes")
        objectStore.put(objVeterinaria)
        transaction.oncomplete = ()=>{
            ui.mostrarAlerta("editado correctamente", "edicion")

            const btnSubmit = document.querySelector(".btn");
            btnSubmit.value = "crear cita"
            btnSubmit.style.background = "#df760d"
            modoEdicion = false
        }

        transaction.onerror = ()=>{
            console.log("no se pudo agregar edicion")
        }

    }else{
        console.log("sin modo edicion")
        objVeterinaria.id = Date.now()
        Citas.agregarCitas({...objVeterinaria})

        const transaction = DB.transaction(["pacientes"], "readwrite")
        const objectStore = transaction.objectStore("pacientes")
        objectStore.add(objVeterinaria)

        transaction.oncomplete = ()=>{
            console.log("se agrego correactemete a la base de datos")
            ui.mostrarAlerta("cita creada correctamente", "exito")
        }
    }
    
    document.querySelector(".formulario form").reset()
    resetObj()

    const {citasCreadas} = Citas
    ui.imprimirCitas()
}

function eliminarCita(id){
    Citas.eliminarCita(id)
}

function editarCita(cita){
    ui.mostrarAlerta("modo edicion", "edicion")
    const {nombre, propietario, telefono, fecha, hora, sintomas, id} = cita

    inputNombre.value = nombre;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono
    inputFecha.value = fecha
    inputHora.value = hora
    inputsSintomas.value = sintomas

    objVeterinaria.nombre = nombre
    objVeterinaria.propietario = propietario
    objVeterinaria.telefono = telefono
    objVeterinaria.fecha = fecha
    objVeterinaria.hora = hora
    objVeterinaria.sintomas = sintomas
    objVeterinaria.id = id

    const btnSubmit = document.querySelector(".btn");
    btnSubmit.value = "actualizar"
    btnSubmit.style.background = "darkblue"

    modoEdicion = true
    
}

function resetObj(){
    objVeterinaria.nombre = ""
    objVeterinaria.propietario = ""
    objVeterinaria.telefono = ""
    objVeterinaria.fecha = ""
    objVeterinaria.hora = ""
    objVeterinaria.sintomas = ""
}

function limpiarHtml(cita){
    while(cita.firstChild){
        cita.removeChild(cita.firstChild)
    }
}

function citasDb(){
    const vetDB = indexedDB.open("VETERINARIA", 1)
    
    vetDB.onerror = ()=>{
        console.log("la base de datos no se puedo crear")
    }

    vetDB.onsuccess = ()=>{
        console.log("la base de datos se creo correctamente")
        DB = vetDB.result;
        console.log(DB)
        ui.imprimirCitas()
    }

    vetDB.onupgradeneeded = (e)=>{
        const db = e.target.result;
        
        const objectStore = db.createObjectStore("pacientes",{
            keyPath: "id",
            autoincrement: true
        });

        objectStore.createIndex("nombre", "nombre" , {unique: false})
        objectStore.createIndex("propietario", "propietario" , {unique: false})
        objectStore.createIndex("telefono", "telefono" , {unique: false})
        objectStore.createIndex("fecha", "fecha" , {unique: false})
        objectStore.createIndex("hora", "hora" , {unique: false})
        objectStore.createIndex("sintomas", "sintomas" , {unique: false})
        objectStore.createIndex("id", "id" , {unique: true})

    }
}

