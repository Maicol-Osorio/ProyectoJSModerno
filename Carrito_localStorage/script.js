// inicio de la barra de busqueda


// boton de busqueda
const searchForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = ()=>{
    searchForm.classList.toggle("active")
    loginForm.classList.remove("active")
    navbar.classList.remove("active")
    shopping.classList.remove("active")
}

// inicio de sesion
const loginForm = document.querySelector(".login-form");
document.querySelector("#user-btn").onclick = ()=>{
    loginForm.classList.toggle("active")
    searchForm.classList.remove("active")
    navbar.classList.remove("active")
    shopping.classList.remove("active")
}

// baarra de navegacion mediaqueri 
const navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = ()=>{
    navbar.classList.toggle("active")
    searchForm.classList.remove("active")
    loginForm.classList.remove("active")
    shopping.classList.remove("active")
}

const shopping = document.querySelector(".shopping-cart")
document.querySelector("#card-btn").onclick = ()=>{
  shopping.classList.toggle("active")
  navbar.classList.toggle("active")
    searchForm.classList.remove("active")
    loginForm.classList.remove("active")
}

window.onscroll = ()=>{
    searchForm.classList.remove("active")
    loginForm.classList.remove("active")
    navbar.classList.remove("active")
    shopping.classList.remove("active")
}

// fin de la barra de busqueda

// swiper para el slider 
const swiper = new Swiper(".productos-slider", {
    loop: true,
    spaceBetween: 20,
    autplay: {
        delay:7500,
        disableOnInteraction:false
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });


  // carrito de compras 

  const productos = document.querySelector(".produtos")
  const shoppingCart = document.querySelector(".shopping-cart tbody")
  const vaciarCarrito = document.querySelector(".vaciarCarrito")
  let datosCurso = []


  eventLIsteners()
 function eventLIsteners(){
    document.addEventListener("DOMContentLoaded", ()=>{
        datosCurso = JSON.parse(localStorage.getItem("productos")) || [];
        carritoHtml()
    })

    
    productos.addEventListener("click", agregarCursos)
    shoppingCart.addEventListener("click", borrarCurso)
    vaciarCarrito.addEventListener("click", e=>{
      e.preventDefault()
      datosCurso = []
      limpiarHtml()
    })
 }

 function agregarCursos(e){
    e.preventDefault()
    
    if(e.target.classList.contains("btn")){
      const curso = e.target.parentElement
        guardarCurso(curso)
    }
 }

 function borrarCurso(e){
    if(e.target.classList.contains("btnBorrar")){
        e.preventDefault()
        const cursoId = e.target.getAttribute("data-id")
        datosCurso = datosCurso.filter( curso=> curso.id !== cursoId)
        carritoHtml()
    }
 }

 function guardarCurso(curso){
  
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h3").textContent,
    precio: curso.querySelector(".precio").textContent,
    cantidad: 1,
    id: curso.querySelector("a").getAttribute("data-id")
  }

  const existe = datosCurso.some(curso=> curso.id === infoCurso.id);
  if(existe){
      const cursoActualizado = datosCurso.map((curso)=>{
          if(curso.id === infoCurso.id){
              curso.cantidad++;
              curso.precio = infoCurso.precio * curso.cantidad
              return curso
          }else{
            return curso
          }
      })

      datosCurso = [...cursoActualizado]
  }else{
    datosCurso = [...datosCurso, infoCurso]
    localStorage.setItem("productos", JSON.stringify(datosCurso))
  }

  carritoHtml()
 }



 function carritoHtml(){
  limpiarHtml()
    datosCurso.forEach(curso=>{
      const row = document.createElement("tr");
      row.innerHTML = `
        <td> <img src="${curso.imagen}"> </td>
        <td> <p>${curso.titulo}</p></td>
        <td> <p>${curso.precio}</p></td>
        <td> <p>${curso.cantidad}</p></td>
        <td> <a href="#" class="btnBorrar fa-solid fa-trash" data-id="${curso.id}"></a> </td>
      `
      shoppingCart.appendChild(row)
 })
 }

 function limpiarHtml(){
    while(shoppingCart.firstChild){
      shoppingCart.removeChild(shoppingCart.firstChild)
    }
 }