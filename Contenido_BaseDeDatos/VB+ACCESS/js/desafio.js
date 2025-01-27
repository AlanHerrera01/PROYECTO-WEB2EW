document.addEventListener('DOMContentLoaded', function () {
    // Las posiciones correctas para los elementos (en porcentaje)
    const correctPositions = {
        item1: { top: 81, left: 7.5 },
        item2: { top: 56, left: 45 },
        item3: { top: 66, left: 85 }
    };

    let draggedElement = null;

    // Función para iniciar el arrastre
    function dragStart(e) {
        draggedElement = e.target;
        draggedElement.style.opacity = '0.5';
    }

    // Función para manejar el movimiento del mouse (arrastre)
    function dragMove(e) {
        if (draggedElement) {
            const container = document.querySelector('.image-container');
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            draggedElement.style.left = `${percentX}%`;
            draggedElement.style.top = `${percentY}%`;
        }
    }

    // Función para soltar el elemento
    function dragEnd() {
        if (draggedElement) {
            draggedElement.style.opacity = '1';
            // Verificar si la posición del elemento es correcta
            const itemId = draggedElement.id;
            const correctPosition = correctPositions[itemId];

            const rect = draggedElement.getBoundingClientRect();
            const container = document.querySelector('.image-container');
            const containerRect = container.getBoundingClientRect();

            const currentLeft = ((rect.left - containerRect.left) / containerRect.width) * 100;
            const currentTop = ((rect.top - containerRect.top) / containerRect.height) * 100;

            const tolerance = 5;  // Tolerancia para la posición

            // Verificar si la posición es suficientemente cercana
            if (Math.abs(currentLeft - correctPosition.left) <= tolerance && Math.abs(currentTop - correctPosition.top) <= tolerance) {
                // Mostrar mensaje de éxito
                document.getElementById('infoMessage').textContent = `${itemId} colocado correctamente. ¡Buen trabajo!`;
                document.getElementById('infoMessage').style.display = 'block';  // Asegurarnos de que el mensaje de éxito se muestra

                // Actualizar infoDato según el itemId
                if (itemId === 'item1') {
                    document.getElementById('infoDato').textContent = `En nuestro formulario no planteamos imprimir un registro.`;
                } else if (itemId === 'item2') {
                    document.getElementById('infoDato').textContent = `No debemos realizar la acción de duplicar registros, ya que comprometeríamos nuestras tablas.`;
                } else {
                    document.getElementById('infoDato').textContent = `No necesitamos realizar una impresión del formulario.`;
                }
                document.getElementById('infoDato').style.display = 'block';  // Asegurarnos de que el mensaje infoDato se muestra

                // Limpiar mensaje después de un tiempo (opcional)
                setTimeout(() => {
                    document.getElementById('infoMessage').style.display = 'none';
                    document.getElementById('infoDato').style.display = 'none';
                }, 3000); // Mensaje desaparecerá después de 3 segundos
            } else {
                // Mostrar mensaje de error si el punto no está bien colocado
                document.getElementById('infoMessage').textContent = `${itemId} fuera de lugar, intenta de nuevo.`;
                document.getElementById('infoMessage').style.display = 'block';  // Mostrar mensaje de error
                document.getElementById('infoDato').style.display = 'none'; // Ocultar infoDato en caso de error
            }

            draggedElement = null;
        }
    }

    // Asignar eventos de arrastre
    const dragItems = document.querySelectorAll('.drag-item');
    dragItems.forEach(item => {
        item.addEventListener('mousedown', dragStart);
    });

    // Mover el elemento mientras se arrastra
    document.addEventListener('mousemove', dragMove);

    // Al soltar el elemento, verificar la posición
    document.addEventListener('mouseup', dragEnd);
});
