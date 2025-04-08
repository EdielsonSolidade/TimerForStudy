const timerDisplay = document.querySelector(".timer-display");
const pause = document.getElementById("pause-resume");
const restart = document.getElementById("restart");
const textoPosTimer = document.querySelector(".texto-posTimer");
const iniciarBtn = document.getElementById("play");
const popUp = document.querySelector(".bg-popup");
const btnOkPopUp = document.querySelector(".btn-popup");

const TEMPO_PADRAO = 25 * 60;
let tempo = TEMPO_PADRAO;
let intervalo;
let estaRodando = true;
let foiIniciado = false;

const atualizarTimer = () => {
  tempo = tempo - 1;
  let minutos = Math.floor(tempo / 60);
  let segundos = tempo % 60;
  let minutosFormatados = String(minutos).padStart(2, "0");
  let segundosFormatados = String(segundos).padStart(2, "0");
  let tempoTotal = `${minutosFormatados}:${segundosFormatados}`;
  timerDisplay.textContent = tempoTotal;
  if (tempo === 0) {
    clearInterval(intervalo);
    textoPosTimer.innerHTML = "Você chegou no seu <br>tempo de descanso";
  }
};

play.addEventListener("click", () => {
  intervalo = setInterval(atualizarTimer, 1000);
  play.classList.add("esconder");
  foiIniciado = true;
});

pause.addEventListener("click", () => {
  if (!foiIniciado) return;

  if (estaRodando) {
    clearInterval(intervalo);
    estaRodando = false;
    pause.textContent = "Resume";
  } else {
    intervalo = setInterval(atualizarTimer, 1000);
    estaRodando = true;
    pause.textContent = "Pause";
  }
});

function MostrarPopUp() {
  popUp.classList.add("popUpAtivo");
  popUp.classList.remove("popUpDesativado");
  setTimeout(() => {
    popUp.style.display = "block";
  }, 10);
}

btnOkPopUp.addEventListener("click", () => {
  popUp.classList.remove("pupUpAtivo");
  popUp.classList.add("popUpDesativado");
  setTimeout(() => {
    popUp.style.display = "none";
  }, 1000);
});

restart.addEventListener("click", () => {
  tempo = TEMPO_PADRAO;
  clearInterval(intervalo);
  estaRodando = true;
  foiIniciado = false;
  pause.textContent = "Pause";
  timerDisplay.textContent = "25:00";
  textoPosTimer.innerHTML = "";
  play.classList.remove("esconder");
  textoPosTimer.innerHTML = "";
  MostrarPopUp();
});
