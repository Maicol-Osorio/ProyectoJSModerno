// boton del menu 
const btnMenu = document.querySelector("#menu-btn");
const navbar = document.querySelector(".navbar")
btnMenu.addEventListener("click", ()=>{
    btnMenu.classList.toggle("fa-xmark")
    navbar.classList.toggle("active")
})

// eliminar con el scroll 
window.addEventListener("scroll", ()=>{
    btnMenu.classList.remove("fa-xmark")
    navbar.classList.remove("active")
})