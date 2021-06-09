/*   COMPONENTS   */
AFRAME.registerComponent("open-box", {
  init: function () {
    let el = this.el;
    this.openBox = function () {
      if (el.classList.contains("closed")) {
        el.classList.remove("closed");
        el.classList.add("opened");
        console.log(el.classList);
      }
      boxGame();
    };
    this.el.addEventListener("click", this.openBox);
  },
  remove: function () {
    this.el.removeEventListener("click", this.openBox);
  },
});

/*   GAME   */

function boxGame() {
  const box1 = document.getElementById("box-1");
  const box2 = document.getElementById("box-2");
  const box3 = document.getElementById("box-3");
  const gate = document.getElementById("gate");

  if (
    box1.classList.contains("opened") &&
    box2.classList.contains("opened") &&
    box3.classList.contains("opened")
  ) {
    openBoxesPopup();
    changeAlienPopup();
  } else {
    openNotFoundPopup();
  }
}

function openBoxesPopup() {
  let boxesPopup = document.querySelector(".boxes-popup");
  let boxesScene = document.querySelector(".boxes-scene");
  const roof = document.getElementById("roof");
  const floor = document.getElementById("floor");
  const wall1 = document.getElementById("wall-1");
  const wall2 = document.getElementById("wall-2");
  const wall3 = document.getElementById("wall-3");
  const wall4 = document.getElementById("wall-4");

  boxesPopup.classList.remove("hide");
  boxesScene.classList.add("layer");
  gate.setAttribute("visible", true);
  roof.setAttribute("visible", true);
  floor.setAttribute("visible", true);
  wall1.setAttribute("visible", true);
  wall2.setAttribute("visible", true);
  wall3.setAttribute("visible", true);
  wall4.setAttribute("visible", true);
  findMissingPiece();
}

function closeBoxesPopup() {
  let boxesPopup = document.querySelector(".boxes-popup");
  let boxesScene = document.querySelector(".boxes-scene");

  boxesPopup.classList.add("hide");
  boxesScene.classList.remove("layer");
}

function openNotFoundPopup() {
  let notFoundPopup = document.querySelector(".not-found-popup");
  let boxesScene = document.querySelector(".boxes-scene");

  notFoundPopup.classList.remove("hide");
  boxesScene.classList.add("layer");
}

function closeNotFoundPopup() {
  let notFoundPopup = document.querySelector(".not-found-popup");
  let boxesScene = document.querySelector(".boxes-scene");

  notFoundPopup.classList.add("hide");
  boxesScene.classList.remove("layer");
}

function changeAlienPopup() {
  const alienCompletedPopup = document.getElementById("text");
  const paragraph = document.createElement("p");
  alienCompletedPopup.innerHTML = "";
  paragraph.innerHTML =
    "I left some clues for your next missing piece in my cabin. It's located in the forest... Somewhere...🤔";
  alienCompletedPopup.appendChild(paragraph);
}

function findMissingPiece() {
  const boxesText = document.getElementById("boxes-text");
  const boxesTitle = document.getElementById("boxes-title");
  const boxesNextButton = document.getElementById("boxes-next-button");
  const boxesPopupButton = document.getElementById("boxes-popup-button");

  function start() {
    showBoxTextNodes(1);
  }

  function showBoxTextNodes(boxTextNodeIndex) {
    const boxTextNode = boxTextNodes.find(
      (boxTextNode) => boxTextNode.id === boxTextNodeIndex
    );
    boxesTitle.innerText = boxTextNode.title;
    boxesText.innerText = boxTextNode.text;
    boxesNextButton.addEventListener("click", () => next(boxTextNode));
    end(boxTextNode);
  }

  function next(boxTextNode) {
    const nextTextNodeId = boxTextNode.nextText;
    showBoxTextNodes(nextTextNodeId);
  }

  function end(boxTextNode) {
    if (boxTextNode.id === 2) {
      boxesNextButton.disabled = true;
      boxesPopupButton.disabled = false;
    } else {
      boxesNextButton.disabled = false;
      boxesPopupButton.disabled = true;
    }
  }

  const boxTextNodes = [
    {
      id: 1,
      title: "Congratulations!",
      text: "You found the missing piece! The spaceship is no longer missing its steering wheel.",
      nextText: 2,
    },
    {
      id: 2,
      title: "Paul the Oxo:",
      text: "I left some clues for your next missing piece in my cabin. It's located in the forest... Somewhere...🤔",
      nextText: 2,
    },
  ];
  start();
}
