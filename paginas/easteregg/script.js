const cards = document.querySelectorAll(".carta_memoria");

let cardUm, cardDois;
let disabilitarClick = false;
let matched = 0;

// Variáveis Cronometro
let hours = `00`, // Armazena as horas do cronômetro
  minutes = `00`, // Armazena os minutos do cronômetro
  seconds = `00`, // Armazena os segundos do cronômetro
  chronometerDisplay = document.querySelector(".numChrono"), // Elemento HTML onde o cronômetro é exibido
  chronometerCall;
var chronometerStarted = false; // Indica se o cronômetro foi iniciado

//! Fazendo ordem de pontuação
function sortingPlacar() {
  // Função para ordenar a pontuação no placar
  let list, troca, verificaTroca;
  list = document.getElementById("placar"); // Elemento HTML da lista de pontuação
  troca = true;

  while (troca) {
    troca = false;
    var pontos = list.getElementsByTagName("li"); // Array com os elementos <li> da pontuação
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
      pontos[i].parentNode.insertBefore(pontos[i + 1], pontos[i]); // Troca as posições dos elementos no placar
      troca = true;
    }
  }
  if (pontos.length > 3) {
    pontos[3].remove(); // Remove o quarto elemento do placar se houver mais de três
  }
}

//! Cronometro e pontuação
function chronometer() {
  // Função para atualizar o cronômetro a cada segundo
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

  chronometerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`; // Atualiza o valor exibido no cronômetro
}

function startChronometer() {
  // Função para iniciar o cronômetro
  chronometerStarted = true;
  chronometerCall = setInterval(chronometer, 1000); // Chama a função chronometer() a cada segundo
}

function stopChronometer() {
  // Função para parar o cronômetro
  clearInterval(chronometerCall); // Limpa o intervalo de tempo definido para a chamada da função chronometer()
  chronometerStarted = false;
}

function resetChronometer() {
  // Função para resetar o cronômetro
  hours = "00";
  minutes = "00";
  seconds = "00";
  chronometerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`; // Reinicia o valor exibido no cronômetro
}

function addToScoreBoard(tempo) {
  // Função para adicionar pontuação ao placar
  var novaPontuacao = document.createElement("li"); // Cria um novo elemento <li> para a nova pontuação
  novaPontuacao.innerHTML = tempo; // Define o tempo como conteúdo do elemento <li>
  document.getElementById("placar").appendChild(novaPontuacao); // Adiciona o elemento <li> ao placar
  var msg = new SpeechSynthesisUtterance();
  msg.text = "Seu tempo foi de " + tempo;
  window.speechSynthesis.speak(msg); // Fala o tempo usando a síntese de fala do navegador
  sortingPlacar(); // Ordena a pontuação no placar
}

//

function flipCard(e) {
  // Função para virar uma carta ao ser clicada
  let clickedCard = e.target; // Armazena a carta clicada na variável clickedCard

  if (!chronometerStarted) {
    startChronometer(); // Inicia o cronômetro se ainda não foi iniciado
  }

  if (clickedCard !== cardUm && !disabilitarClick) {
    clickedCard.classList.add("flip"); // Adiciona a classe "flip" à carta clicada
    if (!cardUm) {
      return (cardUm = clickedCard); // Atribui a carta clicada à variável cardUm se ainda não foi atribuída
    }
    cardDois = clickedCard; // Atribui a carta clicada à variável cardDois
    disabilitarClick = true; // Desabilita os cliques durante a comparação das cartas

    let imagemCardUm = cardUm.querySelector("img").src; // Obtém o caminho da imagem da carta um
    let imagemCardDois = cardDois.querySelector("img").src; // Obtém o caminho da imagem da carta dois
    matchCards(imagemCardUm, imagemCardDois); // Compara as cartas
  }
}

function matchCards(img1, img2) {
  // Função para verificar se as cartas são iguais
  if (img1 === img2) {
    // As cartas são iguais
    cardUm.removeEventListener("click", flipCard); // Remove o evento de clique da carta um
    cardDois.removeEventListener("click", flipCard); // Remove o evento de clique da carta dois

    cardUm = cardDois = ""; // Reseta as variáveis das cartas selecionadas
    matched++; // Incrementa o contador de pares de cartas iguais encontrados
    if (matched === 6) {
      setTimeout(() => {
        // Todas as cartas foram combinadas
        cards.forEach((card) => {
          card.classList.add("shakeWin"); // Adiciona a classe "shakeWin" a todas as cartas (efeito de vitória)
        }, 200);
      });
      stopChronometer(); // Para o cronômetro
      addToScoreBoard(chronometerDisplay.innerHTML); // Adiciona a pontuação ao placar
      setTimeout(() => {
        resetChronometer(); // Reinicia o cronômetro
        return shuffleCards(); // Embaralha as cartas
      }, 1500);
    }
    return (disabilitarClick = false); // Habilita os cliques novamente
  }
  setTimeout(() => {
    // As cartas não são iguais
    cardUm.classList.add("shake"); // Adiciona a classe "shake" à carta um (efeito de erro)
    cardDois.classList.add("shake"); // Adiciona a classe "shake" à carta dois (efeito de erro)
  }, 250);

  setTimeout(() => {
    // Desvira as cartas após um tempo
    cardUm.classList.remove("shake", "flip"); // Remove as classes "shake" e "flip" da carta um
    cardDois.classList.remove("shake", "flip"); // Remove as classes "shake" e "flip" da carta dois
    cardUm = cardDois = ""; // Reseta as variáveis das cartas selecionadas
    disabilitarClick = false; // Habilita os cliques novamente
  }, 600);
}

function shuffleCards() {
  // Função para embaralhar as cartas
  matched = 0; // Reseta o contador de pares de cartas iguais encontrados
  cardUm = cardDois = ""; // Reseta as variáveis das cartas selecionadas
  let arr = [4, 6, 8, 10, 12, 20, 4, 6, 8, 10, 12, 20]; // Array com os números das imagens das cartas
  
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); // Embaralha o array

  cards.forEach((card, index) => {
    card.classList.remove("flip"); // Remove a classe "flip" de todas as cartas
    let imgTag = card.querySelector("img"); // Seleciona a tag <img> da carta
    card.classList.remove("shakeWin"); // Remove a classe "shakeWin" da carta (efeito de vitória)
    card.addEventListener("click", flipCard); // Adiciona o evento de clique à carta
    setTimeout(() => {
      imgTag.src = "../../media/dice/d" + arr[index] + ".png"; // Define a imagem da carta com base no número do array
    }, 500);
  });
}

shuffleCards(); // Inicia o jogo embaralhando as cartas

cards.forEach((card) => {
  // Adiciona o evento de clique a todas as cartas
  card.addEventListener("click", flipCard);
});
