const quizData = [
    {
      question: "¿Qué significa la 'R' en CRUD?",
      options: ["Revisar", "Leer", "Refrescar", "Reparar"],
      correct: 1,
      feedback: "La 'R' en CRUD significa 'Read', que se traduce como 'Leer'."
    },
    {
      question: "¿Cuál de estas operaciones NO pertenece a CRUD?",
      options: ["Eliminar", "Actualizar", "Copiar", "Crear"],
      correct: 2,
      feedback: "'Copiar' no es parte de CRUD, ya que las operaciones son Crear, Leer, Actualizar y Eliminar."
    },
    {
      question: "¿Qué es un formulario en Access?",
      options: [
        "Una herramienta para hacer cálculos complejos",
        "Un objeto para gestionar la entrada y visualización de datos",
        "Un informe de datos resumidos",
        "Un programa externo a Access"
      ],
      correct: 1,
      feedback: "Un formulario en Access sirve para gestionar la entrada y visualización de datos de manera amigable."
    }
  ];
  
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const startButton = document.createElement("button");
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  
  // Botón de inicio
  startButton.textContent = "Iniciar Quiz";
  startButton.id = "startButton";
  startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // Ocultar el botón
    loadQuestion(currentQuestion); // Cargar la primera pregunta
  });
  quizContainer.appendChild(startButton);
  
  // Mostrar la pregunta actual
  function loadQuestion(index) {
    quizContainer.innerHTML = ""; // Limpiar el contenido anterior
    resultsContainer.innerHTML = ""; // Limpiar resultados anteriores
  
    const questionData = quizData[index];
  
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${questionData.question}`;
    quizContainer.appendChild(questionTitle);
  
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");
  
    questionData.options.forEach((option, i) => {
      const optionLabel = document.createElement("label");
  
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = i;
  
      optionLabel.appendChild(input);
      optionLabel.append(` ${option}`);
      optionsDiv.appendChild(optionLabel);
    });
  
    quizContainer.appendChild(optionsDiv);
  
    // Agregar temporizador
    const timerDiv = document.createElement("div");
    timerDiv.id = "timer";
    timerDiv.textContent = `Tiempo restante: 10 segundos`;
    quizContainer.appendChild(timerDiv);
  
    startTimer(index, 10); // 10 segundos por pregunta
  }
  
  // Iniciar temporizador
  function startTimer(index, timeLeft) {
    clearInterval(timer); // Limpiar temporizador previo
  
    timer = setInterval(() => {
      const timerDiv = document.getElementById("timer");
      if (timeLeft > 0) {
        timerDiv.textContent = `Tiempo restante: ${timeLeft} segundos`;
        timeLeft--;
      } else {
        clearInterval(timer);
        handleAnswer(index); // Procesar la respuesta automáticamente
      }
    }, 1000);
  }
  
  // Procesar la respuesta seleccionada
  function handleAnswer(index) {
    clearInterval(timer); // Detener el temporizador
  
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
  
    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("feedback");
  
    if (selected && parseInt(selected.value) === quizData[index].correct) {
      score++;
      feedbackDiv.textContent = `✔️ Correcto: ${quizData[index].feedback}`;
      feedbackDiv.style.color = "green";
    } else {
      feedbackDiv.textContent = `❌ Incorrecto: ${quizData[index].feedback}`;
      feedbackDiv.style.color = "red";
    }
  
    resultsContainer.appendChild(feedbackDiv);
  
    // Ir a la siguiente pregunta o mostrar el resultado final
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion(currentQuestion);
      } else {
        showFinalResults();
      }
    }, 3000); // Mostrar retroalimentación por 3 segundos antes de pasar
  }
  
  // Mostrar resultados finales
  function showFinalResults() {
    quizContainer.innerHTML = "";
    resultsContainer.innerHTML = `Tu puntuación final: ${score}/${quizData.length}`;
    resultsContainer.style.fontWeight = "bold";
  
    const restartButton = document.createElement("button");
    restartButton.textContent = "Reiniciar Quiz";
    restartButton.addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      loadQuestion(currentQuestion);
    });
    resultsContainer.appendChild(restartButton);
  }
  