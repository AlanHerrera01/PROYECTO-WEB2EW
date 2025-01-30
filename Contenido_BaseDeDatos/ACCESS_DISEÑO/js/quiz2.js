document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".quiz-question");
    let currentQuestionIndex = 0;

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");
    const resultDiv = document.getElementById("result");

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle("active", i === index);
        });

        prevBtn.style.display = index === 0 ? "none" : "inline-block";
        nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
        submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";
    }

    prevBtn.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });

    submitBtn.addEventListener("click", function () {
        let answers = {};
        questions.forEach((question, index) => {
            let selected = question.querySelector("input:checked");
            answers[`q${index + 1}`] = selected ? selected.value : null;
        });

        console.log("Respuestas:", answers);
        resultDiv.innerHTML = "<p>¡Respuestas enviadas!</p>";
    });

    showQuestion(currentQuestionIndex);
});
