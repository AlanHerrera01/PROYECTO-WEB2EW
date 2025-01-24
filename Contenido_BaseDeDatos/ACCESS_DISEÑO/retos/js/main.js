let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");
const resultDetails = document.getElementById("result-details");
const navigationContainer = document.getElementById("navigation-container");

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <div class="question">
      <h2>Pregunta ${currentQuestionIndex + 1}/${totalQuestions}</h2>
      <p>${question.question}</p>
    </div>
    <ul class="options list-unstyled">
      ${question.options
        .map(
          (option, index) => `
        <li>
          <button class="btn btn-outline-primary w-100 my-2" onclick="checkAnswer(${index})">${option}</button>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

  // Mostrar/ocultar botones según la pregunta actual
  document.getElementById("prev-btn").style.display = currentQuestionIndex > 0 ? "block" : "none";
  document.getElementById("next-btn").style.display =
    currentQuestionIndex < totalQuestions - 1 ? "block" : "none";
}

function checkAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  // Verificar si la respuesta seleccionada es la correcta
  if (selectedIndex === correctIndex) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function showResults() {
  // Ocultar pregunta y navegación
  questionContainer.classList.add("hidden");
  navigationContainer.classList.add("hidden");

  // Mostrar resultados
  resultContainer.classList.remove("hidden");
  resultMessage.textContent = "Examen finalizado.";
  resultDetails.textContent = `Respuestas correctas: ${score}/${totalQuestions}`;

  // Mostrar opciones al final del examen
  const resultActions = `
    <button class="btn btn-success" onclick="restartQuiz()">Reiniciar examen</button>
    <button class="btn btn-primary" onclick="nextChallenge()">Pagina Principal</button>
  `;
  resultContainer.innerHTML += resultActions;
}

function restartQuiz() {
  // Reiniciar estado del examen
  currentQuestionIndex = 0;
  score = 0;

  // Ocultar resultados y volver a mostrar la primera pregunta
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  navigationContainer.classList.remove("hidden");
  loadQuestion();
}

function nextChallenge() {
  // Redirigir a la página principal (ajusta la URL si es necesario)
  window.location.href = '../indexContenido.html';  // Cambia '/' a la URL de tu página principal, si es necesario
}

// Inicializa la primera pregunta
loadQuestion();

