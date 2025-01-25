const questions = [
    {
      question: "¿Qué tipo de dato se utiliza para almacenar números enteros en Access?",
      options: ["Texto", "Número", "Fecha/Hora", "Moneda"],
      correct: 1
    },
    {
      question: "¿Qué se utiliza para crear relaciones entre tablas en Access?",
      options: ["Consultas", "Formularios", "Claves primarias", "Reportes"],
      correct: 2
    },
    {
      question: "¿Cuál de los siguientes no es un tipo de consulta en Access?",
      options: ["Consulta de selección", "Consulta de acción", "Consulta de actualización", "Consulta de conexión"],
      correct: 3
    },
    {
      question: "¿Cómo se denomina la vista donde se pueden agregar y editar registros en Access?",
      options: ["Vista de diseño", "Vista de datos", "Vista de diseño de consulta", "Vista de formulario"],
      correct: 1
    },
    {
      question: "¿Cuál es el límite de campos en una tabla de Access?",
      options: ["100", "255", "512", "1000"],
      correct: 1
    },
    {
      question: "¿Qué herramienta en Access se utiliza para mostrar la información de manera visual?",
      options: ["Formulario", "Tabla", "Consulta", "Informe"],
      correct: 0
    }
  ];

  let currentQuestionIndex = 0;
  let userAnswers = [];

  // Función para cargar una pregunta
  function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    questionElement.innerHTML = questions[currentQuestionIndex].question;

    optionsElement.innerHTML = questions[currentQuestionIndex].options
      .map((option, index) => `
        <div>
          <input type="radio" name="answer" value="${index}" id="option${index}" />
          <label for="option${index}">${option}</label>
        </div>
      `)
      .join("");

    if (currentQuestionIndex === 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "inline-block";
    }

    if (currentQuestionIndex === questions.length - 1) {
      nextBtn.textContent = "Finalizar";
    } else {
      nextBtn.textContent = "Siguiente";
    }
  }

  // Función para obtener la respuesta del usuario
  function getUserAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
      userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
  }

  // Función para mostrar los resultados
  function showResult() {
    const score = userAnswers.filter((answer, index) => answer === questions[index].correct).length;
    const resultMessage = document.getElementById("result-message");
    const buttonsContainer = document.querySelector(".buttons-container");

    if (score === 6) {
      resultMessage.innerHTML = "¡Increíble! ¡6 de 6! ¡Eres un genio de Access! 🎉🎉";
      resultMessage.classList.add("success");
    } else if (score >= 4) {
      resultMessage.innerHTML = `¡Buen trabajo! Has acertado ${score} de 6. Sigue así. 😊`;
      resultMessage.classList.add("good");
    } else {
      resultMessage.innerHTML = `Solo acertaste ${score} de 6, ¡pero no te preocupes! Vuelve a intentarlo, ¡lo lograrás! 💪`;
      resultMessage.classList.add("motivation");
    }

    buttonsContainer.innerHTML = `
      <button id="retryBtn" class="retry-btn">Reintentar Quiz</button>
      <button id="homeBtn" class="home-btn">Volver al Inicio</button>
    `;

    document.getElementById("retryBtn").addEventListener("click", () => location.reload());
    document.getElementById("homeBtn").addEventListener("click", () => window.location.href = '/');
  }

  // Manejo de botones de navegación
  document.getElementById("startQuizBtn").addEventListener("click", () => {
    document.getElementById("context-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    getUserAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      getUserAnswer();
      document.getElementById("quiz-container").style.display = "none";
      document.getElementById("result-container").style.display = "block";
      showResult();
    }
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    getUserAnswer();
    currentQuestionIndex--;
    loadQuestion();
  });