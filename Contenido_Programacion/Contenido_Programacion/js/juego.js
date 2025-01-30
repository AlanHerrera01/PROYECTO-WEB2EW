let blocks = {};
let correctOrder = [];

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const block = document.getElementById(data);
  const dropZone = ev.target;

  if (dropZone.className === "espacio-vacio") {
    if (dropZone.hasAttribute("data-block")) {
      const existingBlockId = dropZone.getAttribute("data-block");
      document.getElementById(existingBlockId).style.display = "block";
    }
    dropZone.innerHTML = blocks[data];
    dropZone.setAttribute("data-block", data);
    block.style.display = "none";
  }
}

function checkCompletion() {
  const emptySpaces = document.querySelectorAll('.espacio-vacio');
  const completedSpaces = Array.from(emptySpaces).filter(space => space.hasAttribute("data-block"));
  const errorMessage = document.getElementById("error-message");

  if (completedSpaces.length === emptySpaces.length) {
    validateOrder(completedSpaces);
    errorMessage.style.display = "none";
  } else {
    errorMessage.textContent = "Por favor, complete todos los espacios.";
    errorMessage.style.display = "block";
  }
}

function validateOrder(completedSpaces) {
  const userOrder = completedSpaces.map(space => space.getAttribute("data-block"));
  const errorMessage = document.getElementById("error-message");
  const incompleteMessage = document.getElementById("incomplete");
  const retryButton = document.getElementById("retry-button");

  if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
    document.getElementById("completed").style.display = "block";
    errorMessage.style.display = "none";
    incompleteMessage.style.display = "none";
    retryButton.style.display = "none";
  } else {
    incompleteMessage.style.display = "block";
    retryButton.style.display = "inline-block";
    errorMessage.style.display = "none";
  }
}

function resetGame() {
  const emptySpaces = document.querySelectorAll('.espacio-vacio');
  emptySpaces.forEach(space => {
    space.innerHTML = "Espacio";
    space.removeAttribute("data-block");
  });
  document.getElementById("completed").style.display = "none";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("incomplete").style.display = "none";
  document.getElementById("retry-button").style.display = "none";
  const codeBlocks = document.querySelectorAll('.bloque-codigo');
  codeBlocks.forEach(block => {
    block.style.display = "block";
  });
}

function loadAddition() {
  blocks = {
    "block2": "a ",
    "block3": "b  ",
    "block4": "Resultado ",
    "block5": "a + b",
    "block6": "Mostrar Resultado"
  };
  correctOrder = ["block2", "block3", "block5", "block4", "block6"];
  updateGame();
}

function loadSubtraction() {
  blocks = {
    "block2": "a  ",
    "block3": "b ",
    "block4": "Resultado  ",
    "block5": "a - b",
    "block6": "Mostrar Resultado"
  };
  correctOrder = ["block2", "block3", "block5", "block4", "block6"];
  updateGame();
}

function loadMultiplication() {
  blocks = {
    "block2": "a  ",
    "block3": "b  ",
    "block4": "Resultado  ",
    "block5": "a * b",
    "block6": "Mostrar Resultado"
  };
  correctOrder = ["block2", "block3", "block5", "block4", "block6"];
  updateGame();
}

function loadRectangleArea() {
  blocks = {
    "block2": "base  ",
    "block3": "altura  ",
    "block4": "Resultado  ",
    "block5": "base * altura",
    "block6": "Mostrar Resultado"
  };
  correctOrder = ["block2", "block3", "block5", "block4", "block6"];
  updateGame();
}

function loadTriangleArea() {
  blocks = {
    "block2": "base  ",
    "block3": "altura  ",
    "block4": "Resultado  ",
    "block5": "(base * altura) / 2",
    "block6": "Mostrar Resultado"
  };
  correctOrder = ["block2", "block3", "block5", "block4", "block6"];
  updateGame();
}

function updateGame() {
  document.getElementById("completed").style.display = "none";
  const codeBlocksContainer = document.getElementById("code-blocks-container");
  codeBlocksContainer.innerHTML = "";
  
  for (const blockId in blocks) {
    const block = document.createElement("div");
    block.classList.add("bloque-codigo");
    block.setAttribute("draggable", "true");
    block.setAttribute("ondragstart", "drag(event)");
    block.setAttribute("id", blockId);
    block.textContent = blocks[blockId];
    codeBlocksContainer.appendChild(block);
  }
  
  const emptySpaces = document.querySelectorAll('.espacio-vacio');
  emptySpaces.forEach(space => {
    space.innerHTML = "Espacio";
    space.removeAttribute("data-block");
  });
}

function handleSelectChange(selectElement) {
  const selectedValue = selectElement.value;
  const gameContainer = document.getElementById('game-container');
  const verifyButton = document.getElementById('verify-button');
  const retryButton = document.getElementById('retry-button');
  if (selectedValue === "") {
    gameContainer.style.display = 'none';
    verifyButton.style.display = 'none';
    retryButton.style.display = 'none';
  } else {
    gameContainer.style.display = 'flex';
    verifyButton.style.display = 'block';
    retryButton.style.display = 'none';
    if (selectedValue === "addition") {
      loadAddition();
    } else if (selectedValue === "subtraction") {
      loadSubtraction();
    } else if (selectedValue === "multiplication") {
      loadMultiplication();
    } else if (selectedValue === "rectangleArea") {
      loadRectangleArea();
    } else if (selectedValue === "triangleArea") {
      loadTriangleArea();
    }
  }
}