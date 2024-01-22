// boton de menu 

const btnMenu = document.querySelector(".menu-btn");
const btnNavbar = document.querySelector(".navbar");
console.log(btnNavbar)
btnMenu.addEventListener("click", ()=>{
    btnMenu.classList.toggle("active")
    btnMenu.classList.toggle("fa-xmark")
    btnNavbar.classList.toggle("active")
})