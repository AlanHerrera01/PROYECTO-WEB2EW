// Selección de elementos
const video = document.getElementById('intro-video');
const modal = new bootstrap.Modal(document.getElementById('question-modal')); // Inicializar modal Bootstrap
const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const questionForm = document.getElementById('question-form');

// Preguntas configuradas
const questions = [
  {
    time: 39,
    title: 'Pregunta 1',
    text: '¿Qué es un diagrama de flujo?',
    answers: [
      { text: 'Representación gráfica de un algoritmo', correct: true },
      { text: 'Un conjunto de datos sin conexión', correct: false },
      { text: 'Un programa de software', correct: false },
    ],
  },
  {
    time: 92, // 2 minutos
    title: 'Pregunta 2',
    text: '¿Cuáles son los símbolos básicos utilizados en los diagramas de flujo?',
    answers: [
      { text: 'Rectángulos, óvalos, paralelogramos.', correct: true },
      { text: 'Círculos, triángulos, líneas.', correct: false },
      { text: 'Cuadrados, rombos, líneas.', correct: false },
    ],
  },
  {
    time: 118,
    title: 'Pregunta 3',
    text: '¿Qué indican las flechas en el diagrama de flujo?',
    answers: [
      { text: 'El sentido de ejecución del diagrama', correct: true },
      { text: 'Indica el paso anterior del diagrama', correct: false },
      { text: 'El findel diagrama', correct: false },
    ],
  },
  {
    time: 141,
    title: 'Pregunta 4',
    text: '¿Qué debe tener todo diagrama_',
    answers: [
      { text: 'Una condicional', correct: false },
      { text: 'Un inicio y un fin', correct: true },
      { text: 'Una salida y una entrada', correct: false },
    ],
  },
  {
    time: 172,
    title: 'Pregunta 5',
    text: '¿En qué sentido se construye el diagrama?',
    answers: [
      { text: 'De izquierda a derecha', correct: false },
      { text: 'De arriba hacia abajo', correct: true },
      { text: 'De abajo hacia arriba', correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let isAnswerCorrect = false;

// Función para mostrar preguntas
function showQuestion(question) {
  video.pause();
  questionTitle.textContent = question.title;
  questionText.textContent = question.text;
  questionForm.innerHTML = '';

  // Generar respuestas
  question.answers.forEach((answer) => {
    const label = document.createElement('label');
    label.classList.add('d-block', 'mb-2');
    label.innerHTML = `
      <input type="radio" name="answer" value="${answer.correct}" class="me-2">
      ${answer.text}
    `;
    questionForm.appendChild(label);
  });

  modal.show();
}

// Escuchar eventos de tiempo en el video
video.addEventListener('timeupdate', () => {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    if (Math.floor(video.currentTime) === question.time) {
      showQuestion(question);
    }
  }
});

// Manejar envío de respuestas
questionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedAnswer = questionForm.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert('Por favor, selecciona una respuesta.');
    return;
  }

  isAnswerCorrect = selectedAnswer.value === 'true';
  if (isAnswerCorrect) {
    alert('¡Respuesta correcta! Continuando...');
    modal.hide();
    video.play();
    currentQuestionIndex++;
  } else {
    alert('Respuesta incorrecta. Intenta de nuevo.');
  }
});
