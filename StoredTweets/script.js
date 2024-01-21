// boton de menu 

const btnMenu = document.querySelector(".menu-btn");
const navBar = document.querySelector("header .navbar");

console.log(navBar)

btnMenu.addEventListener("click", ()=>{
    btnMenu.classList.toggle("active");
    btnMenu.classList.toggle("fa-xmark");
    navBar.classList.toggle("active")
})