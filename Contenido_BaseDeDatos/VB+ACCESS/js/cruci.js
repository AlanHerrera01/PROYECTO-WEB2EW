const respuestasCorrectas = {
  'respuesta-1': 'CREAR',
  'respuesta-2': 'LISTA',
  'respuesta-3': 'ELIMINA',
  'respuesta-4': 'ACTUALIZAR',
  'respuesta-5': 'VBA'
};

document.getElementById('crucigramaForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  let resultado = '';
  let allCorrect = true;

  Object.keys(respuestasCorrectas).forEach(id => {
      const inputElement = document.getElementById(id);
      const respuestaUsuario = inputElement.value.trim().toUpperCase();
      const respuestaCorrecta = respuestasCorrectas[id].toUpperCase();

      if (respuestaUsuario === respuestaCorrecta) {
          inputElement.style.backgroundColor = 'lightgreen'; // Resaltar respuesta correcta
      } else {
          inputElement.style.backgroundColor = 'salmon'; // Resaltar respuesta incorrecta
          allCorrect = false;
      }
  });

  if (allCorrect) {
      resultado = '¡Felicidades! Todas las respuestas son correctas.';
  } else {
      resultado = 'Algunas respuestas son incorrectas. Intenta de nuevo.';
  }

  document.getElementById('resultado').textContent = resultado;
});
