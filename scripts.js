const grid = document.querySelector(".grid"); // acessar a div grid
const namePlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const restartButton = document.getElementById("restartButton");
const playerNameInput = document.getElementById("playerNameInput");
const startGameButton = document.getElementById("startGameButton");

// array com o nome dos personagens
const characters = [
  "MV1",
  "MV2",
  "MV3",
  "MV4",
  "MV5",
  "MV6",
  "MV7",
  "MV8",
  "MV9",
  "MV10",
];

// função que cria um elemento Html e adiciona uma class ao elemento
const createElement = (tag, className) => {
  const element = document.createElement(tag);

  element.className = className;

  return element;
};

// variaveis que armazena os valores dos cards
let firstCard = "";
let secondCard = "";

// Função pra se o jogo terminar, o usuário achar todos os pares.
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");    // Classe do CSS pra deixar os cards Preto/Branco

  // Se todas minhas cartas estiverem VIRADAS, reinicio o jogo e dou uma mensagem de parabens.
  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(
      `Parabéns, ${namePlayer.innerHTML} Você ganhou!! seu tempo foi: ${timer.innerHTML}`
    );
  }
};

// Função pra Fazer o loop de encontrar os Pares, 
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  // Se eu achar o PAR dos cards, deixo eles em P/B
  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();

    // E se eu não achar, apenas reviro eles depois de Meio Segundo.
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

//função que revela a carta mostrando o personagem da frente
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;

  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

// função que cria o card de personagem, chamando a função criar elemento, 
// adicionando a imagem no front(frente de card) e acessando função que revela a carta
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage =
    `url('img/${character}.png')` || `url('img/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

// Função de quando clicar no botão 'Iniciar jogo' começar o game novamente.
startGameButton.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();

  if (playerName !== "") {
    localStorage.setItem("player", playerName);
    namePlayer.innerHTML = playerName;
    playerNameInput.style.display = "none"; // Esconde o input após inserir o nome
    startGameButton.style.display = "none"; // Esconde o botão após iniciar o jogo
    // Limpar o conteúdo da div grid para reiniciar o jogo
    grid.innerHTML = "";

    // Reiniciar o timer
    timer.innerHTML = "00";
    loadGame();
    startTimer();
  } else {
    alert("Por favor, insira um nome válido para jogar.");
  }
});

// função que carrega o jogo, duplicando os arrays, deixando a posição aleatória e adicionando os cards ao grid
// E a cada rodada, eu embaralho diferente os cards
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  let seconds = 0;

  this.loop = setInterval(() => {
    seconds++;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    timer.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  }, 1000);
};

restartButton.addEventListener("click", () => {
  // Limpar o conteúdo da div grid para reiniciar o jogo
  grid.innerHTML = "";

  // Reiniciar o timer
  clearInterval(this.loop); // Parar o timer atual
  timer.innerHTML = "00"; // Reiniciar o timer para 00

  // Limpar o localStorage
  localStorage.removeItem("player");

  // Reiniciar o jogo
  loadGame();
  startTimer();
});

window.onload = () => {
  namePlayer.innerHTML = localStorage.getItem("player");
  loadGame();
};
