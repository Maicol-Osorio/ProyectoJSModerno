(function(){
    
        // VARIABLES
        let DB;
        const formClientes = document.querySelector(".formClientes");

        // eventos
        document.addEventListener("DOMContentLoaded", ()=>{
            conectarCrm()
            formClientes.onsubmit = function(e){
                e.preventDefault()
                validarForm(e)
            }
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

            imprimirAlerta("cliente agregado")
            formClientes.reset()

            setTimeout(()=>{
                window.location.href = "clientes.html"
            },1000)

        }

        function imprimirAlerta(mensaje, tipo){
            const parrafo = document.createElement("p");
            parrafo.textContent = mensaje;
            parrafo.classList.add("msj")

            if(tipo == "error"){
                parrafo.style.background = "red"
            }else{
                parrafo.style.background = "green"
            }

            formClientes.appendChild(parrafo)

            setTimeout(()=>{
                parrafo.remove()
            },3000)
        }
})()