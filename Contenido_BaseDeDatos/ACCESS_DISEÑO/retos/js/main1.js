// Formatos correctos (existentes en Access)
const correctFormats = ['Texto', 'Memo', 'Moneda', 'Número', 'Fecha/Hora'];

// Formatos incorrectos (relacionados pero no existentes en Access)
const incorrectFormats = ['Lista', 'Códigos', 'Imagen', 'Contraseña', 'Dirección', 'Nombre Completo', 'Adjunto'];

// Mezcla los formatos correctos e incorrectos
const allFormats = [...correctFormats, ...incorrectFormats].sort(() => Math.random() - 0.5); // Desordena los elementos

// Variables globales
let selectedFormats = [];  // Almacena los formatos seleccionados por el jugador
let score = 0;
let totalQuestions = 5;
let clickCount = 0;  // Contador de clics

// Función para manejar el clic en los formatos
function handleFormatClick(event) {
    const clickedElement = event.target;
    const formatName = clickedElement.innerHTML;

    // Evita seleccionar más de 5 elementos
    if (selectedFormats.length >= totalQuestions) {
        return; // No permite más selecciones
    }

    // Si el formato ya fue seleccionado, no hacer nada
    if (selectedFormats.includes(formatName)) {
        return;
    }

    // Agregar formato seleccionado
    selectedFormats.push(formatName);

    // Pintar la celda de color morado claro
    clickedElement.classList.add('selected');

    // Aumentar el contador de clics
    clickCount++;
    document.getElementById('clicks-count').innerText = clickCount;

    // Si alcanzó 5 clics, deshabilitar más clics
    if (clickCount === totalQuestions) {
        // Deshabilitar todos los clics después de seleccionar 5
        document.querySelectorAll('.format-cell').forEach(cell => {
            cell.removeEventListener('click', handleFormatClick);
        });
    }
}

// Función para comprobar si el juego ha terminado
function finishGame() {
    // Revisa que solo se hayan seleccionado 5 formatos
    if (selectedFormats.length < totalQuestions) {
        alert("Por favor, selecciona 5 formatos antes de finalizar.");
        return;
    }

    // Calcular cuántos formatos correctos
    score = selectedFormats.filter(format => correctFormats.includes(format)).length;

    // Pintar los resultados en la tabla
    paintResults();

    // Mostrar los resultados
    showResult();
}

// Función para pintar los resultados (correcto/incorrecto)
function paintResults() {
    const elements = document.querySelectorAll('.format-cell');
    elements.forEach(element => {
        const formatName = element.innerHTML;

        if (selectedFormats.includes(formatName)) {
            if (correctFormats.includes(formatName)) {
                element.classList.add('correct');
            } else {
                element.classList.add('incorrect');
            }
        }
    });
}

// Función para mostrar los resultados
function showResult() {
    const percentage = (score / totalQuestions) * 100;
    const resultMessage = `Obtuviste ${score} de ${totalQuestions} respuestas correctas (${percentage}%)`;

    document.getElementById('score-message').innerText = resultMessage;
    document.getElementById('result-container').classList.remove('hidden');

    // Verificar si el jugador alcanzó el 80% para continuar
    if (percentage >= 80) {
        document.getElementById('score-message').innerText += " ¡Felicidades! Puedes ir al siguiente reto.";
    } else {
        document.getElementById('score-message').innerText += " No has alcanzado el 80%. Intenta nuevamente.";
    }
}

// Función para reiniciar el juego
function restartGame() {
    score = 0;
    selectedFormats = [];
    clickCount = 0;

    // Limpiar colores de las celdas
    const elements = document.querySelectorAll('.format-cell');
    elements.forEach(element => {
        element.classList.remove('correct', 'incorrect', 'selected');
        element.addEventListener('click', handleFormatClick);
    });

    // Resetear contador de clics
    document.getElementById('clicks-count').innerText = clickCount;

    // Ocultar los resultados
    document.getElementById('result-container').classList.add('hidden');
}

// Función para ir al siguiente reto (simulación de navegación a otro reto)
function goToNextChallenge() {
    const percentage = (score / totalQuestions) * 100;
    
    // Verificar si el jugador tiene el 80% o más
    if (percentage >= 80) {
        alert('¡Felicidades! Has completado el reto. Ahora irás al siguiente.');
        // Aquí puedes redirigir a otra página o realizar alguna acción
    } else {
        alert('No has alcanzado el 80%. Intenta nuevamente.');
    }
}

// Función para cargar los formatos en el HTML
function loadFormats() {
    const container = document.getElementById('formats-container');
    allFormats.forEach(format => {
        const div = document.createElement('div');
        div.classList.add('col-3');
        div.innerHTML = `<div class="format-cell">${format}</div>`;
        container.appendChild(div);
    });

    // Asignar eventos a los formatos
    document.querySelectorAll('.format-cell').forEach(element => {
        element.addEventListener('click', handleFormatClick);
    });
}

// Cargar los formatos al iniciar el juego
window.onload = loadFormats;
