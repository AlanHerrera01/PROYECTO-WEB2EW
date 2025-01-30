document.addEventListener("DOMContentLoaded", function () {
    console.log("El script se ha iniciado correctamente"); // Verifica que el script se ejecuta

    const draggables = document.querySelectorAll(".draggable");
    const dropZone = document.getElementById("tabla-dropzone");
    const validarBtn = document.getElementById("validarClaveBtn");
    const mensaje = document.getElementById("mensaje");

    console.log("Draggables encontrados:", draggables.length);
    console.log("DropZone:", dropZone);
    console.log("Botón de Validar:", validarBtn);

    // Habilitar arrastrar y soltar
    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", function (e) {
            console.log("Se ha iniciado el arrastre de:", e.target.textContent);
            e.dataTransfer.setData("text", e.target.id);
        });
    });

    dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        console.log("Elemento arrastrado sobre la tabla.");
    });

    dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        let id = e.dataTransfer.getData("text");
        let elementoArrastrado = document.getElementById(id);

        if (elementoArrastrado) {
            console.log("Elemento soltado:", elementoArrastrado.textContent);

            let newRow = document.createElement("tr");
            let cellCampo = document.createElement("td");
            let cellClave = document.createElement("td");

            cellCampo.textContent = elementoArrastrado.textContent;

            // Agregar checkbox para seleccionar clave primaria
            let radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "clavePrimaria";
            radioInput.value = elementoArrastrado.textContent;
            cellClave.appendChild(radioInput);

            newRow.appendChild(cellCampo);
            newRow.appendChild(cellClave);
            dropZone.appendChild(newRow);

            // Remover el elemento de la lista original
            elementoArrastrado.remove();
        }
    });

    // Validar la clave primaria seleccionada
    validarBtn.addEventListener("click", function () {
        let seleccion = document.querySelector('input[name="clavePrimaria"]:checked');

        if (seleccion) {
            console.log("Clave primaria seleccionada:", seleccion.value);
            if (seleccion.value === "ID_Cliente") {
                mensaje.textContent = "✅ ¡Correcto! ID_Cliente es la clave primaria.";
                mensaje.style.color = "green";
            } else {
                mensaje.textContent = "❌ Incorrecto. La clave primaria debe ser ID_Cliente.";
                mensaje.style.color = "red";
            }
        } else {
            console.log("No se ha seleccionado ninguna clave primaria.");
            mensaje.textContent = "⚠️ Selecciona un campo como clave primaria.";
            mensaje.style.color = "orange";
        }
    });

});
