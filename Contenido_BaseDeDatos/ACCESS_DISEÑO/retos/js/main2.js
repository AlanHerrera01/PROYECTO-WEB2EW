let correctRelations = {
    relation1: "Clientes-Pedidos",  // Relación correcta
    relation2: "Productos-Categorías",  // Relación correcta
    relation3: "Sin relación",  // Relación incorrecta
    relation4: "Sin relación"  // Relación incorrecta
};

let timer;
let timeLeft = 180; // 3 minutos en segundos

function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    timeLeft = 180;
    document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;
    
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            validateAnswers();
        }
    }, 1000);
}

function validateAnswers() {
    let selectedRelations = {
        relation1: document.getElementById('relation1').value,
        relation2: document.getElementById('relation2').value,
        relation3: document.getElementById('relation3').value,
        relation4: document.getElementById('relation4').value
    };
    
    let resultContainer = document.getElementById('result-container');
    let resultMessage = document.getElementById('result-message');
    resultContainer.style.display = 'block';

    let score = 0;
    for (let relation in selectedRelations) {
        if (selectedRelations[relation] === correctRelations[relation]) {
            score++;
        }
    }

    if (score === 4) {
        resultMessage.innerHTML = `
            <div class="alert alert-success text-center">
                <h4 class="mb-3">¡Felicidades! 🎉</h4>
                <p>Has seleccionado todas las relaciones correctamente.</p>
                <button id="next-challenge-btn" class="btn btn-primary mt-3">Siguiente reto</button>
            </div>
        `;
        document.getElementById('next-challenge-btn').addEventListener('click', () => {
            window.location.href = 'retos/RETO%202.html';
        });
    } else {
        resultMessage.innerHTML = `
            <div class="alert alert-danger text-center">
                <h4 class="mb-3">¡Intenta de nuevo! 😟</h4>
                <p>Algunas relaciones no son correctas. Revisa las tablas y prueba otra vez.</p>
                <button id="retry-btn" class="btn btn-danger mt-3">Intentar nuevamente</button>
            </div>
        `;
        document.getElementById('retry-btn').addEventListener('click', () => {
            document.getElementById('game-container').style.display = 'block';
            document.getElementById('result-container').style.display = 'none';
        });
    }
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('validate-btn').addEventListener('click', validateAnswers);
