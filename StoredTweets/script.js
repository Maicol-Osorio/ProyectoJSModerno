// boton de menu 

const btnMenu = document.querySelector(".menu-btn");
const navBar = document.querySelector("header .navbar");
const content = document.querySelector(".content")
const formulario = document.querySelector("form #tweet");
const ulTweets = document.querySelector(".misTweets ul")
let tweets =[]


btnMenu.addEventListener("click", ()=>{
    btnMenu.classList.toggle("active");
    btnMenu.classList.toggle("fa-xmark");
    navBar.classList.toggle("active")
})


// agregar tweets 

document.addEventListener("DOMContentLoaded", ()=>{
    content.addEventListener("submit", validarTweeet)
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    mostrarTweets()

    console.log(tweets)
})

function validarTweeet(e){
    e.preventDefault()
    if(formulario.value === ""){
        mostrarAlerta("agrega un tweet antes de enviar")
        return
    }

    const datos = {
        "tweet": formulario.value,
        "id": Date.now()
    }
    tweets = [...tweets, datos]
    mostrarTweets()
    document.querySelector("form").reset()
}



function mostrarTweets(){
    
    limpiarHtml()

    tweets.forEach(dato=>{
        const borrar = document.createElement("i");
        borrar.classList.add("fa-solid", "fa-trash");
        borrar.id = dato.id;
        borrar.addEventListener("click", borrarTweet)
        const tweet = document.createElement("li");
        tweet.textContent = dato.tweet;
        tweet.appendChild(borrar)
        ulTweets.appendChild(tweet)
    })

    localStorage.setItem("tweets", JSON.stringify(tweets))
}

function borrarTweet(e){
    const tweetBorrar = e.target.id;
    
    tweets = tweets.filter(tweet=> tweet.id != tweetBorrar)
    console.log(tweets)
    mostrarTweets()
}


function mostrarAlerta(mensaje){

    const claseAlerta = document.querySelector("p.mensaje")
    if(claseAlerta){
        claseAlerta.remove()
    }
    const alerta = document.createElement("p");
    alerta.textContent = mensaje;
    alerta.classList.add("mensaje")
    alerta.style.color = "red"
    content.appendChild(alerta)

    setTimeout(()=>{
        alerta.remove()
    },3000)
}

function limpiarHtml(){
    while(ulTweets.firstChild){
        ulTweets.removeChild(ulTweets.firstChild)
    }
}