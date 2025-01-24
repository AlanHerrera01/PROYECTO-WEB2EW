// Conceptos y respuestas correctas
const conceptos = [
    { nombre: 'Tablas', categoria: 'Elemento clave' },
    { nombre: 'Uno a muchos', categoria: 'Tipo de relación común' },
    { nombre: '.mdb o .accdb', categoria: 'Extensión de archivos' }
];

// Respuestas incorrectas (en desorden)
const respuestasIncorrectas = [
    { nombre: 'Campo', categoria: 'Elemento clave' },
    { nombre: 'Uno a uno', categoria: 'Tipo de relación común' },
    { nombre: '.xls', categoria: 'Extensión de archivos' },
    { nombre: 'Formulario', categoria: 'Elemento clave' },
    { nombre: 'Muchos a muchos', categoria: 'Tipo de relación común' },
    { nombre: '.txt', categoria: 'Extensión de archivos' }
];

// Variables globales
let score = 0;
let correctConceptos = 0;
let totalConceptos = conceptos.length; // Solo hay 3 conceptos correctos
let timer;
let timeLeft = 60;
let droppedConcepts = {}; // Guardará los conceptos que se han colocado en las categorías

// Función para permitir el arrastre
function allowDrop(event) {
    event.preventDefault();
    event.target.classList.add('over');
}

// Función para iniciar el arrastre
function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

// Función para soltar el elemento en la categoría correcta
function drop(event, category) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    const draggedConcepto = draggedElement.innerText;

    // Verifica si el concepto ya está colocado en esta categoría
    if (droppedConcepts[category]) {
        alert(`Ya has colocado un concepto en la categoría ${category}.`);
        return;
    }

    // Coloca el concepto en la categoría seleccionada
    event.target.appendChild(draggedElement);
    event.target.classList.remove('over');

    // Guarda el concepto en la categoría
    droppedConcepts[category] = draggedConcepto;
}

// Función para cargar los conceptos en el contenedor
function loadConcepts() {
    const container = document.getElementById('conceptos-container');
    let allConceptos = [...conceptos, ...respuestasIncorrectas];

    // Desordenar los conceptos
    allConceptos = allConceptos.sort(() => Math.random() - 0.5);

    allConceptos.forEach(concepto => {
        const div = document.createElement('div');
        div.classList.add('draggable');
        div.id = `concept-${concepto.nombre}`;
        div.setAttribute('draggable', 'true');
        div.setAttribute('ondragstart', 'drag(event)');
        div.innerText = concepto.nombre;
        container.appendChild(div);
    });
}

// Función para finalizar el juego y validar las respuestas
function finishGame() {
    clearInterval(timer); // Detener el temporizador
    correctConceptos = 0;

    // Validar solo los conceptos que se han colocado en las categorías
    Object.keys(droppedConcepts).forEach(category => {
        const concept = droppedConcepts[category];
        const correctCategory = getConceptCategory(concept);

        // Verifica si el concepto colocado en la categoría es el correcto
        if (category === correctCategory) {
            document.getElementById(`concept-${concept}`).classList.add('correct');
            correctConceptos++;
        } else {
            document.getElementById(`concept-${concept}`).classList.add('incorrect');
        }
    });

    const percentage = (correctConceptos / totalConceptos) * 100;
    const resultMessage = `Obtuviste ${correctConceptos} de ${totalConceptos} conceptos correctos (${percentage}%)`;

    document.getElementById('score-message').innerText = resultMessage;
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('finish-btn').disabled = true; // Desactivar el botón "Revisar" después de finalizar

    // Si tiene más del 80%, felicitamos
    if (percentage === 100) {
        document.getElementById('score-message').innerText += " ¡Felicidades! Has acertado todas las respuestas.";
    } else {
        document.getElementById('score-message').innerText += " No has acertado todas las respuestas. Intenta nuevamente.";
    }
}

// Función para reiniciar el juego
function restartGame() {
    correctConceptos = 0;

    // Limpiar resultados
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('score-message').innerText = '';

    // Limpiar categorías y conceptos
    droppedConcepts = {};
    const categorias = document.querySelectorAll('.category');
    categorias.forEach(categoria => {
        categoria.innerHTML = `<h4>${categoria.querySelector('h4').innerText}</h4>`;
    });

    // Volver a cargar los conceptos
    document.getElementById('conceptos-container').innerHTML = '';
    loadConcepts();

    // Reiniciar el temporizador y volver a iniciarlo
    timeLeft = 60; // Restablecer el tiempo a 60 segundos
    startTimer();

    // Habilitar el botón "Revisar"
    document.getElementById('finish-btn').disabled = false;
}

// Función para iniciar el juego
function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    loadConcepts();
    startTimer();
}

// Función para iniciar el cronómetro
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('timer').innerText = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            finishGame();
        }
    }, 1000);
}

// Función para obtener la categoría correcta de cada concepto
function getConceptCategory(conceptoNombre) {
    const concepto = conceptos.find(concepto => concepto.nombre === conceptoNombre);
    return concepto ? concepto.categoria : '';
}
