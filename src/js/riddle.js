//POPUP
AFRAME.registerComponent("open-popup", {
  init: function () {
    let el = this.el;
    let popup = document.querySelector(".popup");
    let scene = document.querySelector(".scene");
    this.openPopup = function () {
      popup.classList.remove("hide");
      scene.classList.add("layer");
    };
    this.el.addEventListener("click", this.openPopup);
    game();
  },
  remove: function () {
    this.el.removeEventListener("click", this.openPopup);
  },
});

function closePopup() {
  let popup = document.querySelector(".popup");
  let scene = document.querySelector(".scene");

  popup.classList.add("hide");
  scene.classList.remove("layer");
}

// RIDDLE GAME
function game() {
  const textElement = document.getElementById("text");
  const nextButtonElement = document.getElementById("next-button");
  const riddleContainer = document.querySelector("riddle-game-container");
  const optionButtonsDiv = document.getElementById("option-buttons");
  const popupButton = document.querySelector(".popup-button");

  const correctAnswerMessage = "Correct!";
  const incorrectAnswerMessage = "Incorrect! Try again :)";
  const riddleResult = document.createElement("p");
  const correctAnswerButton = document.createElement("button");
  const incorrectAnswerButton1 = document.createElement("button");
  const incorrectAnswerButton2 = document.createElement("button");

  let span = document.createElement("span");
  span.innerText = "three";
  span.classList.add("span-text");

  function startGame() {
    showTextNode(1);
    popupButton.disabled = true;
  }

  function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(
      (textNode) => textNode.id === textNodeIndex
    );
    textElement.innerText = textNode.text;
    nextButtonElement.addEventListener("click", () => next(textNode));
    riddle(textNode);
    endRiddleGame(textNode);
  }

  function next(textNode) {
    const nextTextNodeId = textNode.nextText;
    showTextNode(nextTextNodeId);
  }

  function riddle(textNode) {
    if (textNode.id === 5) {
      nextButtonElement.disabled = true;
      correctAnswerButton.innerText = "D";
      optionButtonsDiv.appendChild(correctAnswerButton);

      incorrectAnswerButton1.innerText = "42";
      optionButtonsDiv.appendChild(incorrectAnswerButton1);

      incorrectAnswerButton2.innerText = "Coffee";
      optionButtonsDiv.appendChild(incorrectAnswerButton2);

      correctAnswerButton.addEventListener("click", correctAnswerPrompt);
      incorrectAnswerButton1.addEventListener("click", incorrectAnswerPrompt);
      incorrectAnswerButton2.addEventListener("click", incorrectAnswerPrompt);
    } else if (textNode.id !== 5) {
      optionButtonsDiv.innerHTML = "";
      nextButtonElement.disabled = false;
    }
  }

  function correctAnswerPrompt() {
    riddleResult.innerText = correctAnswerMessage;
    optionButtonsDiv.appendChild(riddleResult);
    riddleResult.style.color = "green";
    correctAnswerButton.disabled = true;
    incorrectAnswerButton1.disabled = true;
    incorrectAnswerButton2.disabled = true;
    nextButtonElement.disabled = false;
  }

  const incorrectAnswerPrompt = () => {
    riddleResult.innerHTML = incorrectAnswerMessage;
    optionButtonsDiv.appendChild(riddleResult);
    riddleResult.style.color = "red";
    nextButtonElement.disabled = true;
  };

  function endRiddleGame(textNode) {
    const box1 = document.getElementById("box-1");
    const box2 = document.getElementById("box-2");
    const box3 = document.getElementById("box-3");
    if (textNode.id === textNodes.length) {
      nextButtonElement.disabled = true;
      popupButton.disabled = false;
      box1.setAttribute("visible", true);
      box2.setAttribute("visible", true);
      box3.setAttribute("visible", true);
    }
  }

  const textNodes = [
    {
      id: 1,
      text: "Hello space scavenger! Welcome to the foggy forest. I'm Paul the Oxo.",
      nextText: 2,
    },
    {
      id: 2,
      text: " I have hidden he missing piece to your spaceship in the fog...",
      nextText: 3,
    },
    {
      id: 3,
      text: "...And since I am guarding the forest, you have to answer my riddle correctly in order to look for it.",
      nextText: 4,
    },
    {
      id: 4,
      text: "Are you ready?",
      nextText: 5,
    },
    {
      id: 5,
      text: "What's always the last thing to mend, The middle of middle, and end of the end?",
      nextText: 6,
    },
    {
      id: 6,
      text: "Aahh... you're a clever one, aren't you? Well, go ahead and look for your missing piece. But beware...",
      nextText: 7,
    },
    {
      id: 7,
      text: `...Only a true scavenger can navigate through the fog and collect the piece from one of the ${span.innerText} hidden boxes. Good luck! 🚀`,
      nextText: 8,
    },
  ];

  startGame();
}
