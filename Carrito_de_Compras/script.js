// inicio de la barra de busqueda


// boton de busqueda
const searchForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = ()=>{
    searchForm.classList.toggle("active")
    loginForm.classList.remove("active")
    navbar.classList.remove("active")
}

// inicio de sesion
const loginForm = document.querySelector(".login-form");
document.querySelector("#user-btn").onclick = ()=>{
    loginForm.classList.toggle("active")
    searchForm.classList.remove("active")
    navbar.classList.remove("active")
}

// baarra de navegacion mediaqueri 
const navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = ()=>{
    navbar.classList.toggle("active")
    searchForm.classList.remove("active")
    loginForm.classList.remove("active")
}

window.onscroll = ()=>{
    searchForm.classList.remove("active")
    loginForm.classList.remove("active")
    navbar.classList.remove("active")
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