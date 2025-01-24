
window.onload = function() {
    // Verificar el estado de los retos desde el localStorage
    const reto1Completed = localStorage.getItem('reto1Completed') === 'true';
    const reto2Completed = localStorage.getItem('reto2Completed') === 'true';
    const reto3Completed = localStorage.getItem('reto3Completed') === 'true';

    // Desbloquear los retos completados
    if (reto1Completed) {
        document.getElementById('reto2').classList.remove('locked'); // Desbloquea el Reto 2
    }
    if (reto2Completed) {
        document.getElementById('reto3').classList.remove('locked'); // Desbloquea el Reto 3
    }
    if (reto3Completed) {
        document.getElementById('reto4').classList.remove('locked'); // Desbloquea el Reto 4
    }
}