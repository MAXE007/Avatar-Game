const estadoJuego = {
    ataqueJugador: null,
    ataqueEnemigo: null,
    vidasJugador: 3,
    vidasEnemigo: 3
};

function iniciarJuego() {
    const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';
    const botonPersonajeJugador = document.getElementById('boton-personaje');
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    const sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = "none";
    
    document.getElementById("reglas-del-juego").style.display = "none";
    
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
    
    document.getElementById('boton-jugar').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'block';

    document.getElementById('boton-punio').addEventListener('click', ataquePunio);
    document.getElementById('boton-patada').addEventListener('click', ataquePatada);
    document.getElementById('boton-barrida').addEventListener('click', ataqueBarrida);
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego);
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
    document.getElementById('boton-jugar').style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'none';
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
}

function seleccionarPersonajeJugador() {
    const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'block'; 
    document.getElementById('boton-reglas').style.display = 'none';
    const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
    sectionSeleccionarPersonaje.style.display = 'none'; 

    const inputZuko = document.getElementById('zuko');
    const inputKatara = document.getElementById('katara');
    const inputAang = document.getElementById('aang');
    const inputToph = document.getElementById('toph');
    const inputZokka = document.getElementById('zokka');
    const spanPersonajeJugador = document.getElementById('personaje-jugador');

    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-reglas').style.display = 'none';

    if (inputZuko.checked) {
        spanPersonajeJugador.innerHTML = 'Zuko';
    } else if (inputKatara.checked) {
        spanPersonajeJugador.innerHTML = 'Katara';
    } else if (inputAang.checked) {
        spanPersonajeJugador.innerHTML = 'Aang';
    } else if (inputToph.checked) {
        spanPersonajeJugador.innerHTML = 'Toph';
    } else if (inputZokka.checked) {
            spanPersonajeJugador.innerHTML = 'Zokka';
    } else {
        const mensajeError = document.createElement("p");
        mensajeError.innerHTML = 'Selecciona un personaje';
        mensajeError.style.color = "red";
        sectionSeleccionarPersonaje.appendChild(mensajeError);
        setTimeout(() => {
            sectionSeleccionarPersonaje.removeChild(mensajeError);
        }, 2000);
        reiniciarJuego();
        return;
    }
    seleccionarPersonajeEnemigo();
}

function seleccionarPersonajeEnemigo() {
    const personajeAleatorio = aleatorio(1, 5);
    const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
    
    if (personajeAleatorio === 1) {
        spanPersonajeEnemigo.innerHTML = 'Zuko';
    } else if (personajeAleatorio === 2) {
        spanPersonajeEnemigo.innerHTML = 'Katara';
    } else if (personajeAleatorio === 3) {
        spanPersonajeEnemigo.innerHTML = 'Aang';
    } else if (personajeAleatorio === 4) {
        spanPersonajeEnemigo.innerHTML = 'Zokka';
    } else {
        spanPersonajeEnemigo.innerHTML = 'Toph';
    }
}

function ataquePunio() {
    estadoJuego.ataqueJugador = 'Punio';
    ataqueAleatorioEnemigo();
}

function ataquePatada() {
    estadoJuego.ataqueJugador = 'Patada';
    ataqueAleatorioEnemigo();
}

function ataqueBarrida() {
    estadoJuego.ataqueJugador = 'Barrida';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    const ataqueAleatorio = aleatorio(1, 3);
    if (ataqueAleatorio === 1) {
        estadoJuego.ataqueEnemigo = 'Punio';
    } else if (ataqueAleatorio === 2) {
        estadoJuego.ataqueEnemigo = 'Patada';
    } else {
        estadoJuego.ataqueEnemigo = 'Barrida';
    }
    combate();
}

function combate() {
    const spanVidasJugador = document.getElementById('vidas-jugador');
    const spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if (estadoJuego.ataqueEnemigo === estadoJuego.ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (estadoJuego.ataqueJugador === 'Punio' && estadoJuego.ataqueEnemigo === 'Barrida') {
        crearMensaje("GANASTE");
        estadoJuego.vidasEnemigo--;
        spanVidasEnemigo.innerHTML = estadoJuego.vidasEnemigo;
    } else if (estadoJuego.ataqueJugador === 'Patada' && estadoJuego.ataqueEnemigo === 'Punio') {
        crearMensaje("GANASTE");
        estadoJuego.vidasEnemigo--;
        spanVidasEnemigo.innerHTML = estadoJuego.vidasEnemigo;
    } else if (estadoJuego.ataqueJugador === 'Barrida' && estadoJuego.ataqueEnemigo === 'Patada') {
        crearMensaje("GANASTE");
        estadoJuego.vidasEnemigo--;
        spanVidasEnemigo.innerHTML = estadoJuego.vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        estadoJuego.vidasJugador--;
        spanVidasJugador.innerHTML = estadoJuego.vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (estadoJuego.vidasEnemigo === 0) {
        crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉");
    } else if (estadoJuego.vidasJugador === 0) {
        crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭😭😭");
    }
}

function crearMensajeFinal(resultado) {
    const sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = "block";
    
    const sectionMensaje = document.getElementById('mensajes');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = resultado;
    sectionMensaje.appendChild(parrafo);

    document.getElementById('boton-punio').disabled = true;
    document.getElementById('boton-patada').disabled = true;
    document.getElementById('boton-barrida').disabled = true;
}

function crearMensaje(resultado) {
    const sectionMensaje = document.getElementById('mensajes');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = `Tu personaje atacó con ${estadoJuego.ataqueJugador}, el personaje del enemigo atacó con ${estadoJuego.ataqueEnemigo} ${resultado}`;
    sectionMensaje.appendChild(parrafo);
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);

