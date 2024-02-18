const btnMenu = document.querySelector("#menu-btn");
const navBar =  document.querySelector(".navbar")


btnMenu.addEventListener("click", hoverNav)
window.onscroll = ()=>{
    btnMenu.classList.remove("fa-times");
    navBar.classList.remove("active")
}

function hoverNav(){
    btnMenu.classList.toggle("fa-times");
    navBar.classList.toggle("active");
}

function desplazamiento(){
    console.log("desplazando")
}