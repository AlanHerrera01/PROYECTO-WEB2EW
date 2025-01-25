$(document).ready(function() {
    // Manejador de clic en el botón "¡Iniciar Juego!"
    $("#start-btn").click(function() {
        // Ocultar el contenedor de inicio y mostrar el juego
        $("#start-container").hide();
        $("#game-container").show();
        
        // Iniciar el temporizador
        startTimer();
    });

    // Función para iniciar el temporizador
    function startTimer() {
        let timeLeft = 180; // 3 minutos en segundos
        const timerInterval = setInterval(function() {
            timeLeft--;
            $('#timer').text(`${timeLeft}s`);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                validateAnswers();
            }
        }, 1000);
    }

    // Hacer las opciones arrastrables
    $(".draggable").draggable({
        helper: "clone"
    });

    // Hacer las áreas de caída (drop)
    $(".drop-container").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            // Agregar el texto de la opción arrastrada al cuadro de respuesta
            $(this).html(ui.helper[0].innerHTML);
            $("#validate-btn").prop("disabled", false); // habilitar el botón de validación
        }
    });

    // Manejador de clic en el botón "Validar Respuestas"
    $("#validate-btn").click(validateAnswers);

    function validateAnswers() {
        let score = 0;

        // Validación de las respuestas
        if ($("#relation1").val() === "correcta") score++;
        if ($("#relation2").val() === "correcta") score++;
        if ($("#relation3").val() === "correcta") score++;
        if ($("#relation4").val() === "correcta") score++;

        // Mostrar los resultados
        let resultMessage = "";
        if (score === 4) {
            resultMessage = `
                <div class="alert alert-success text-center">
                    <h4 class="mb-3">¡Felicidades! 🎉</h4>
                    <p>Has seleccionado todas las relaciones correctamente.</p>
                    <p><strong>Explicación:</strong></p>
                    <ul>
                        <li><strong>Clientes - Pedidos (1-n):</strong> Un cliente puede realizar varios pedidos.</li>
                        <li><strong>Productos - Categorías (n-n):</strong> Varios productos pueden pertenecer a una categoría y viceversa.</li>
                        <li><strong>Pedidos - Clientes (n-1):</strong> Un pedido pertenece a un solo cliente.</li>
                        <li><strong>Pedidos - Productos (n-n):</strong> Un pedido puede contener varios productos.</li>
                    </ul>
                </div>
            `;
        } else {
            resultMessage = `
                <div class="alert alert-danger text-center">
                    <h4 class="mb-3">¡Lo siento! 😞</h4>
                    <p>Algunas respuestas no son correctas. Intenta nuevamente.</p>
                </div>
            `;
        }

        $("#result-container").html(resultMessage).show();
    }
});
