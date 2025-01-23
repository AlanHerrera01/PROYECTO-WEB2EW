document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quizForm");
    const timer = document.getElementById("timer");
    const finishBtn = document.getElementById("finishBtn");
  
    let timeLeft = 25 * 60;
  
    // Renderizar preguntas
    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("mb-4");
      questionDiv.innerHTML = `
        <h5>${index + 1}. ${q.question}</h5>
        ${q.options.map((opt, i) => `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="q${index}" value="${i}" id="q${index}_${i}">
            <label class="form-check-label" for="q${index}_${i}">${opt}</label>
          </div>
        `).join("")}
      `;
      quizForm.appendChild(questionDiv);
    });
  
    // Temporizador
    const timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      timeLeft--;
  
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        finishExam();
      }
    }, 1000);
  
    // Botón finalizar
    finishBtn.addEventListener("click", finishExam);
  
    function finishExam() {
      clearInterval(timerInterval);
      const formData = new FormData(quizForm);
      let score = 0;
  
      questions.forEach((q, index) => {
        if (parseInt(formData.get(`q${index}`)) === q.correct) {
          score++;
        }
      });
  
      localStorage.setItem("score", score);
      window.location.href = "results.html";
    }
  });
  