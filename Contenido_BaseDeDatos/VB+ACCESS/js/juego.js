const steps = [
  "Abrir Microsoft Access.",
  "Seleccionar 'Base de Datos en Blanco'.",
  "Crear una tabla con los campos necesarios.",
  "Ir a la pestaña 'Crear' y seleccionar 'Asistente de Formulario'.",
  "Personalizar el formulario agregando botones correspondientes del CRUD.",
  "Guardar y probar el formulario creado.",
  "Cerrar Access.",
  "Abrir un archivo existente.",
  "Revisar las tablas creadas.",
  "Exportar datos a Excel."
];

const correctSteps = [
  "Abrir Microsoft Access.",
  "Seleccionar 'Base de Datos en Blanco'.",
  "Crear una tabla con los campos necesarios.",
  "Ir a la pestaña 'Crear' y seleccionar 'Asistente de Formulario'.",
  "Personalizar el formulario agregando botones correspondientes del CRUD.",
  "Guardar y probar el formulario creado."
];

let attempts = 5;
let currentStepIndex = 0;
let selectedOrder = [];

const container = document.getElementById("game-container");
const feedbackDiv = document.getElementById("feedback");
const gameOverDiv = document.getElementById("game-over");

function createBubble(step) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = step;

  // Posicionar la burbuja dentro del contenedor
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const bubbleSize = 120;

  // Asegurarse de que la burbuja esté dentro de los límites del contenedor
  bubble.style.top = `${Math.random() * (containerHeight - bubbleSize)}px`;
  bubble.style.left = `${Math.random() * (containerWidth - bubbleSize)}px`;

  bubble.addEventListener("click", () => {
    if (step === correctSteps[currentStepIndex]) {
      // Paso correcto
      currentStepIndex++;
      selectedOrder.push(step);
      bubble.classList.add("hidden"); // Ocultar la burbuja cuando se elige correctamente
      feedbackDiv.innerHTML = `¡Correcto! Orden seleccionado: ${selectedOrder.join(' -> ')}`;

      if (currentStepIndex === correctSteps.length) {
        endGame(true);
      }
    } else {
      // Paso incorrecto
      attempts--;
      feedbackDiv.textContent = `¡Elección incorrecta o fuera de orden! Pierdes un intento. Quedan ${attempts} intentos.`;

      if (attempts === 0) {
        endGame(false);
      }
    }
  });

  container.querySelector(".burbujas").appendChild(bubble);
}

function startGame() {
  const shuffledSteps = [...steps];
  shuffledSteps.sort(() => Math.random() - 0.5); // Mezclar el orden de los pasos

  shuffledSteps.forEach((step) => {
    createBubble(step); // Crear burbuja por cada paso
  });
}

function endGame(win) {
  container.style.display = "none"; // Ocultar el contenedor del juego
  feedbackDiv.style.display = "none"; // Ocultar el feedback
  gameOverDiv.style.display = "block"; // Mostrar el mensaje de fin de juego

  // Limpiar clases anteriores
  gameOverDiv.classList.remove("win", "lose");

  // Retrasar la aparición del mensaje para aplicar la animación
  setTimeout(() => {
    gameOverDiv.classList.add(win ? "win" : "lose");
    gameOverDiv.innerHTML = win
      ? "¡Felicidades! Completaste el juego correctamente. 🎉"
      : "Juego terminado. Te quedaste sin intentos. 😞";
    gameOverDiv.style.opacity = 1; // Mostrar el mensaje con una transición suave
    gameOverDiv.style.transform = "translate(-50%, -50%)"; // Asegura que el mensaje esté centrado
  }, 100);

  // Eliminar burbujas restantes
  document.querySelectorAll(".bubble").forEach((bubble) => bubble.remove());
}


function restartGame() {
  // Restablecer el estado del juego
  attempts = 5;
  currentStepIndex = 0;
  selectedOrder = [];
  container.style.display = "block"; // Volver a mostrar el contenedor
  feedbackDiv.style.display = "block"; // Volver a mostrar el feedback
  gameOverDiv.style.display = "none"; // Ocultar el mensaje de fin de juego
  gameOverDiv.style.opacity = 0; // Ocultar el mensaje antes de reiniciar

  // Limpiar burbujas y reiniciar el juego
  document.querySelectorAll(".bubble").forEach((bubble) => bubble.remove());
  startGame(); // Iniciar el juego de nuevo
}

startGame(); // Iniciar el juego cuando la página se carga
