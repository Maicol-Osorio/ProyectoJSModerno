// CREACION DE LA BASE DE DATOS EN INDEXDB

(function(){
    

    // VARIABLES
    let DB;


    // EVENTOS
    document.addEventListener("DOMContentLoaded", ()=>{
        crearDB()
    })


    // FUNCIONES
    function crearDB(){
        const crmDB = indexedDB.open("CRM-CLIENTES", 1);
        
        crmDB.onerror = ()=>{
            console.log("error al crear la base de datos");
        }

        crmDB.onsuccess = (e)=>{
            console.log("base de datos creada correctamente")
            DB = e.target.result
        }

        crmDB.onupgradeneeded = (e)=>{
            const db = e.target.result;
            const objectStore = db.createObjectStore("clientes", {
                keyPath: "id",
                autoincrement: true
            })

            objectStore.createIndex("nombre", "nombre", {unique:false})
            objectStore.createIndex("correo", "correo", {unique: true})
            objectStore.createIndex("telefono", "telefono", {unique:false})
            objectStore.createIndex("empresa", "empresa", {unique:false})
            objectStore.createIndex("id", "id", {unique:true})
        }
    }
})()