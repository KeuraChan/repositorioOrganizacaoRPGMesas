const cards = document.querySelectorAll(".carta_memoria");

let cardUm, cardDois;
let disabilitarClick = false;
let matched = 0;

// Variáveis Cronometro
let hours = `00`,
  minutes = `00`,
  seconds = `00`,
  chronometerDisplay = document.querySelector(".numChrono"),
  chronometerCall;
var chronometerStarted = false;

//!Fazendo ordem de pontuação
function sortingPlacar() {
  let list, troca, verificaTroca;
  list = document.getElementById("placar");
  troca = true;

  while (troca) {
    troca = false;
    var pontos = list.getElementsByTagName("li");
    for (var i = 0; i < pontos.length - 1; i++) {
      verificaTroca = false;
      if (
        pontos[i].innerHTML.toLowerCase() >
        pontos[i + 1].innerHTML.toLowerCase()
      ) {
        verificaTroca = true;
        break;
      }
    }
    if (verificaTroca) {
      pontos[i].parentNode.insertBefore(pontos[i + 1], pontos[i]);
      troca = true;
    }
  }
  if (pontos.length > 3) {
    pontos[3].remove();
  }
}

//! Cronometro e pontuação
function chronometer() {
  seconds++;

  if (seconds < 10) {
    seconds = `0` + seconds;
  }

  if (seconds > 59) {
    seconds = `00`;
    minutes++;

    if (minutes < 10) {
      minutes = `0` + minutes;
    }
  }

  if (minutes > 59) {
    minutes = `00`;
    hours++;

    if (hours < 10) {
      hours = `0` + hours;
    }
  }

  chronometerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function startChronometer() {
  chronometerStarted = true;
  chronometerCall = setInterval(chronometer, 1000);
}

function stopChronometer() {
  clearInterval(chronometerCall);
  chronometerStarted = false;
}

function resetChronometer() {
  hours = "00";
  minutes = "00";
  seconds = "00";
  chronometerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function addToScoreBoard(tempo) {
  var novaPontuacao = document.createElement("li");
  novaPontuacao.innerHTML = tempo;
  document.getElementById("placar").appendChild(novaPontuacao);
  var msg = new SpeechSynthesisUtterance();
  msg.text = "Seu tempo foi de " + tempo;
  window.speechSynthesis.speak(msg);
  sortingPlacar();
}

//

function flipCard(e) {
  let clickedCard = e.target; // colocando a carta clickada na vaiável

  if (!chronometerStarted) {
    startChronometer();
  }

  if (clickedCard !== cardUm && !disabilitarClick) {
    clickedCard.classList.add("flip");
    if (!cardUm) {
      return (cardUm = clickedCard);
    }
    cardDois = clickedCard;
    disabilitarClick = true;

    let imagemCardUm = cardUm.querySelector("img").src;
    let imagemCardDois = cardDois.querySelector("img").src;
    matchCards(imagemCardUm, imagemCardDois);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    cardUm.removeEventListener("click", flipCard);
    cardDois.removeEventListener("click", flipCard);

    cardUm = cardDois = "";
    matched++;
    if (matched === 6) {
      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.add("shakeWin");
        }, 200);
      });
      stopChronometer();
      addToScoreBoard(chronometerDisplay.innerHTML);
      setTimeout(() => {
        resetChronometer();
        return shuffleCards();
      }, 1500);
    }
    return (disabilitarClick = false);
  }
  setTimeout(() => {
    cardUm.classList.add("shake");
    cardDois.classList.add("shake");
  }, 250);

  setTimeout(() => {
    cardUm.classList.remove("shake", "flip");
    cardDois.classList.remove("shake", "flip");
    cardUm = cardDois = "";
    disabilitarClick = false;
  }, 600);
}

function shuffleCards() {
  matched = 0;
  cardUm = cardDois = "";
  let arr = [4, 6, 8, 10, 12, 20, 4, 6, 8, 10, 12, 20];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    card.classList.remove("shakeWin");
    card.addEventListener("click", flipCard);
    setTimeout(() => {
      imgTag.src = "../../media/dice/d" + arr[index] + ".png";
    }, 500);
  });
}

shuffleCards();

cards.forEach((card) => {
  // adding click event to all cards
  card.addEventListener("click", flipCard);
});
