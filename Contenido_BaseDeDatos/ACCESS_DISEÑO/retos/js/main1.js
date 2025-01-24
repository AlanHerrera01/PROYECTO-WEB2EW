let score = 0;

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);
    const targetCell = event.target;

    if (targetCell.classList.contains("droppable")) {
        targetCell.innerHTML = droppedElement.innerHTML;
        targetCell.classList.add("filled");
        droppedElement.setAttribute("draggable", "false");
        droppedElement.classList.add("hidden");
    }
}

function checkAnswers() {
    const cells = document.querySelectorAll(".droppable");
    score = 0;

    // Verificar si las celdas están correctas
    if (document.getElementById("cell-1").innerHTML === "Texto") {
        score++;
        document.getElementById("cell-1").classList.add("correct");
    } else {
        document.getElementById("cell-1").classList.add("incorrect");
    }

    if (document.getElementById("cell-2").innerHTML === "Número") {
        score++;
        document.getElementById("cell-2").classList.add("correct");
    } else {
        document.getElementById("cell-2").classList.add("incorrect");
    }

    if (document.getElementById("cell-3").innerHTML === "Fecha") {
        score++;
        document.getElementById("cell-3").classList.add("correct");
    } else {
        document.getElementById("cell-3").classList.add("incorrect");
    }

    if (document.getElementById("cell-4").innerHTML === "Moneda") {
        score++;
        document.getElementById("cell-4").classList.add("correct");
    } else {
        document.getElementById("cell-4").classList.add("incorrect");
    }

    // Mostrar resultado
    const percentage = (score / 4) * 100;
    document.getElementById("score-message").innerText = `Obtuviste ${score} de 4 respuestas correctas (${percentage}%)`;

    document.getElementById("result").classList.remove("hidden");
    document.getElementById("finish-btn").classList.add("hidden");
}

function restartGame() {
    // Reiniciar el juego
    const cells = document.querySelectorAll(".droppable");
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove("correct", "incorrect");
        cell.classList.remove("filled");
    });

    const draggables = document.querySelectorAll(".draggable");
    draggables.forEach(draggable => {
        draggable.classList.remove("hidden");
        draggable.setAttribute("draggable", "true");
    });

    document.getElementById("finish-btn").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
}
