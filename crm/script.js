(function(){
    
        // VARIABLES
        let DB;
        let modoEdicion;
        let NunberidCliente;
        const formClientes = document.querySelector(".formClientes");

        // eventos
        document.addEventListener("DOMContentLoaded", ()=>{
            conectarCrm()
            formClientes.onsubmit = function(e){
                e.preventDefault()
                validarForm(e)
            }
            editarClientes()
        })
        
        // FUNCIONES
        function conectarCrm(){
            const dbClientes = indexedDB.open("CRM-CLIENTES", 1)
            
            dbClientes.onerror = ()=>{
                console.log("no se pudo conectar a la base de datos")
            }

            dbClientes.onsuccess = (e)=>{
                console.log("se realizo una conexion a la base de datos")
                DB = e.target.result
            }
        }

        function validarForm(e){
            e.preventDefault()

            if(modoEdicion){

                nombreInput = document.querySelector("#nombre").value
                correInput = document.querySelector("#correo").value
                telefonoInput = document.querySelector("#telefono").value
                empresaInput =document.querySelector("#empresa").value
                if(nombreInput == "" || correInput == "" || telefonoInput == "" || empresaInput == ""){
                    imprimirAlerta("todos los campos son requeridos", "error")
                    return;
                }

                const objActual ={
                    "nombre": nombreInput,
                    "correo": correInput,
                    "telefono": telefonoInput,
                    "empresa": empresaInput,
                    "id": Number(idCliente)
                }
                const transaction = DB.transaction(["clientes"], "readwrite");
                const objectStore = transaction.objectStore("clientes");
                objectStore.put(objActual)

                transaction.oncomplete = ()=>{
                    imprimirAlerta("cliente actualizado correctamente", "exito")
                }

                transaction.onerror = ()=>{
                    imprimirAlerta("error al editar", "error")
                }
                setTimeout(()=>{
                      window.location.href = "clientes.html"
                  },1000)
                modoEdicion = false
            }else{
                const inputNombre = document.querySelector("#nombre").value
                const inputcorreo = document.querySelector("#correo").value
                const inputtelefono = document.querySelector("#telefono").value
                const inputempresa = document.querySelector("#empresa").value
    
                if(inputNombre == "" || inputcorreo == "" || inputtelefono == "" || inputempresa == ""){
                    imprimirAlerta("todos los campos son requeridos", "error")
                    return;
                }
            
                const objClientes = {
                    "nombre": inputNombre,
                    "correo": inputcorreo,
                    "telefono": inputtelefono,
                    "empresa": inputempresa,
                    "id": Date.now()
                }

                const transaction = DB.transaction(["clientes"], "readwrite");
                const objectStore = transaction.objectStore("clientes");
                objectStore.add(objClientes)
                
                transaction.oncomplete = ()=>{
    
                    imprimirAlerta("cliente agregado")
                    formClientes.reset()
    
                    setTimeout(()=>{
                        window.location.href = "clientes.html"
                    },1000)
                }
            }
            


            

        }

        function imprimirAlerta(mensaje, tipo){
            const parrafo = document.createElement("p");
            parrafo.textContent = mensaje;
            parrafo.classList.add("msj")

            if(tipo == "error"){
                parrafo.style.background = "red"
            }else if(tipo == "edicion"){
                parrafo.style.background = "blue"
            }
            else{
                parrafo.style.background = "green"
            }

            formClientes.appendChild(parrafo)

            setTimeout(()=>{
                parrafo.remove()
            },3000)
        }

        function editarClientes(){
            const parametroUrl = new URLSearchParams(window.location.search)
            idCliente = parametroUrl.get("id");
            if(idCliente){
                setTimeout(()=>{
                    obtenerCliente(idCliente)
                },100)
            }
        }

        function obtenerCliente(id){
            const transaction = DB.transaction(["clientes"], "readwrite")
            const objectStore = transaction.objectStore("clientes")
            
            const clientes = objectStore.openCursor();
            clientes.onsuccess = (e)=>{
                const cursor = e.target.result;
                if(cursor){
                    if(cursor.value.id == id){
                        llenarForm(cursor.value)
                    }
                    cursor.continue()
                }
            }
        }

        function llenarForm(cliente){

            modoEdicion = true
            const {nombre, telefono, correo, empresa} = cliente
            nombreInput = document.querySelector("#nombre").value = nombre
            correInput = document.querySelector("#correo").value = correo
            telefonoInput = document.querySelector("#telefono").value = telefono
            empresaInput =document.querySelector("#empresa").value = empresa
            imprimirAlerta("mode edicion activo", "edicion")

            const btnEditar = document.querySelector("input[type='submit']")
            btnEditar.style.background = "cornflowerblue"
            btnEditar.style.color = "white"
            btnEditar.value = "editar"
        }

        const btnMenu = document.querySelector("#menu-btn");
        const header = document.querySelector(".header")
        btnMenu.addEventListener("click", ()=>{
            btnMenu.classList.toggle("fa-x")
            header.classList.toggle("active")
        })
})()