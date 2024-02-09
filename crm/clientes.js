(function(){

    // VARIABLES
    let DB;
    const tbody = document.querySelector("tbody")

    // EVENTOS
   document.addEventListener("DOMContentLoaded", ()=>{
        abrirConexion()
        setTimeout(()=>{
            mostrarHtml()
        },100)
        tbody.addEventListener("click", eliminar)
   })

//    FUNCIONES
   function abrirConexion(){
        const conexion = indexedDB.open("CRM-CLIENTES", 1)
        conexion.onerror = ()=>{
            console.log("error al conetar en clientes")
        }

        conexion.onsuccess = (e)=>{
            console.log("conexion correcta en clientes")
            DB = e.target.result;
        }

   }

   function mostrarHtml(){
    const transaction = DB.transaction(["clientes"], "readwrite");
    const objectStore = transaction.objectStore("clientes");
    objectStore.openCursor().onsuccess = (e)=>{
        const cursor = e.target.result

        if(cursor){
            const {nombre, correo, telefono, empresa, id} = cursor.value


            const tablaRow = document.createElement("tr");
            tablaRow.innerHTML += `
                <td>${nombre}</td> 
                <td>${telefono}</td> 
                <td>${correo}</td> 
                <td>${empresa}</td>
                <td>
                    <a href="#" class="eliminar" data-id="${id}">eliminar</a> 
                    <a href="index.html?id=${id}" class="editar">editar</a></td>
            `


            tbody.appendChild(tablaRow)
        }

        cursor.continue()
    }
   }


   function eliminar(e){
        if(e.target.classList.contains("eliminar")){
            const id =Number( e.target.getAttribute("data-id"));

            const confirmar = confirm("deseas eliminar este cliente?")
            if(confirmar){
                const transaction = DB.transaction(["clientes"], "readwrite");
                const objectStore = transaction.objectStore("clientes");
                objectStore.delete(id)

                transaction.oncomplete = ()=>{
                    console.log("cliente eliminado")
                    e.target.parentElement.parentElement.remove()
                }

                transaction.onerror = ()=>{
                    console.log("hubo un error")
                }

            }


            // objectStore.openCursor().onsuccess = (cursor)=>{
            //     console.log(cursor.id)
            // } 
        }
   }
  

 


   
})()