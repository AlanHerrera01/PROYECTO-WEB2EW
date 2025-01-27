// Función para mostrar u ocultar videos dentro de un modal
function mostrarVideo(videoId) {
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const videoElement = document.getElementById('videoModalSource');
    
    // Establecer el src del video según el botón que se presiona
    if (videoId === 'videoTablas') {
        videoElement.src = 'videos/Creación_Tabla_Access.mp4';
    } else if (videoId === 'videoCampos') {
        videoElement.src = 'videos/Tipo_Dato.mp4';
    } else if (videoId === 'videoRelaciones') {
        videoElement.src = 'videos/Relaciones_Access.mp4';
    } else if (videoId === 'videoFormularios') {
        videoElement.src = 'videos/Formulario_Access.mp4';
    } else if (videoId === 'videoConsultas') {
        videoElement.src = 'videos/Consulta_Access.mp4';
    } else if (videoId === 'videoIndices') {
        videoElement.src = 'videos/Indices_Access.mp4';
    }

    // Mostrar el modal con el video
    videoModal.show();
}

// Cerrar el modal y detener el video cuando se cierra el modal
document.getElementById('closeModal').addEventListener('click', function() {
    const videoElement = document.getElementById('videoModalSource');
    videoElement.pause();
    videoElement.currentTime = 0;
});

document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function () {
      let collapse = this.closest('.accordion-item').querySelector('.accordion-collapse');
      if (collapse.classList.contains('show')) {
        setTimeout(() => collapse.classList.remove('show'), 500);
      } else {
        setTimeout(() => collapse.classList.add('show'), 500);
      }
    });
  });

  // Función para verificar las respuestas y mostrar los resultados
  function checkAnswers() {
    const correctAnswers = {
        q1: 'b',
        q2: 'b',
        q3: 'a',
        q4: 'a',
        q5: 'a',
        q6: 'b'
    };

    let score = 0;
    let totalQuestions = 6;

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[`q${i}`]) {
            score++;
        }
    }

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h3>Resultado:</h3><p>Has respondido correctamente ${score} de ${totalQuestions} preguntas.</p>`;
    
    if (score === totalQuestions) {
        resultDiv.classList.add('correct');
        resultDiv.classList.remove('incorrect');
        resultDiv.innerHTML += `<p>¡Excelente! Has respondido todo correctamente.</p>`;
    } else {
        resultDiv.classList.add('incorrect');
        resultDiv.classList.remove('correct');
        resultDiv.innerHTML += `<p>¡Sigue practicando! Puedes mejorar.</p>`;
    }
}
