const pause = document.getElementById("pause-resume");
const restart = document.getElementById("restart");
const iniciarBtn = document.getElementById("play");
const edicaoDoTimer = document.getElementById("editar-timer");

const popUpRestart = document.querySelector(".bg-popup");
const btnOkPopUpRestart = document.querySelector(".btn-popup");
const timerDisplay = document.querySelector(".timer-display");
const textoPosTimer = document.querySelector(".texto-posTimer");
const popUpEdicaoTimer = document.querySelector(".bg-popup-edicao");
const btnOkPopUpEdicao = document.querySelector(".btn-popup-edicao");

const TEMPO_PADRAO = 25 * 60;
let tempo = TEMPO_PADRAO;
let intervalo;
let timerAtivo = true;
let timerIniciado = false;

const resetarUI = () => {
  timerDisplay.textContent = "25:00";
  textoPosTimer.innerHTML = "";
};

const formatarTempo = () => {
  let minutos = Math.floor(tempo / 60);
  let segundos = tempo % 60;
  let minutosFormatados = String(minutos).padStart(2, "0");
  let segundosFormatados = String(segundos).padStart(2, "0");
  timerDisplay.textContent = `${minutosFormatados}:${segundosFormatados}`;
};

const finalizarTimer = () => {
  clearInterval(intervalo);
  textoPosTimer.innerHTML = "Você chegou no seu <br>tempo de descanso";
};

iniciarBtn.addEventListener("click", () => {
  intervalo = setInterval(atualizarDisplay, 1000);
  iniciarBtn.classList.add("esconder");
  timerIniciado = true;
});

const atualizarDisplay = () => {
  tempo = tempo - 1;
  formatarTempo(timerDisplay);
  if (tempo === 0) {
    finalizarTimer();
  }
};

pause.addEventListener("click", () => {
  if (!timerIniciado) return;

  if (timerAtivo) {
    clearInterval(intervalo);
    timerAtivo = false;
    pause.textContent = "Resume";
  } else {
    intervalo = setInterval(atualizarDisplay, 1000);
    timerAtivo = true;
    pause.textContent = "Pause";
  }
});

restart.addEventListener("click", () => {
  tempo = TEMPO_PADRAO;
  clearInterval(intervalo);
  timerAtivo = true;
  timerIniciado = false;
  pause.textContent = "Pause";
  iniciarBtn.classList.remove("esconder");
  mostrarPopUp(popUpRestart);
  resetarUI();
});

function mostrarPopUp(evento) {
  evento.classList.add("popUpAtivo");
  evento.classList.remove("popUpDesativado");
  setTimeout(() => {
    evento.style.display = "block";
  }, 10);
}

function fecharPopUp(evento) {
  evento.classList.remove("popUpAtivo");
  evento.classList.add("popUpDesativado");
  setTimeout(() => {
    evento.style.display = "none";
  }, 1000);
}

btnOkPopUpRestart.addEventListener("click", () => {
  fecharPopUp(popUpRestart);
});

edicaoDoTimer.addEventListener("click", () => {
  mostrarPopUp(popUpEdicaoTimer);
});
btnOkPopUpEdicao.addEventListener("click", () => {
  fecharPopUp(popUpEdicaoTimer);
});

console.log(play);
