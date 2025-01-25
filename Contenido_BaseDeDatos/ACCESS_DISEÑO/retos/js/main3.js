    // Datos de clientes con más errores (incluidos errores en apellidos)
    const clientData = [
        { id: 1, name: 'Juan', lastname: 'Pérez', email: 'juan.perez@gmail.com', date: '2024-01-25', age: '30' },
        { id: 2, name: 'María', lastname: 'López123', email: '', date: '2024-01-24', age: 'NaN' }, // Missing email, invalid age, apellido con números
        { id: 3, name: 'Carlos', lastname: 'García', email: 'carlos.garcia@com', date: '2024-01-22', age: '35' }, // Incorrect email
        { id: 4, name: 'Lucía', lastname: 'Ramírez 2024', email: 'lucia.ramirez@example.com', date: 'Invalid Date', age: '' }, // Invalid date, apellido con fecha
        { id: 5, name: 'Pedro', lastname: 'Sánchez', email: 'pedro.sanchez@gmail.com', date: '2024-01-20', age: '25' },
        { id: 6, name: 'Ana', lastname: 'Martín', email: 'ana.martin@gmail.es', date: '2024-13-25', age: '45' }, // Invalid date
        { id: 7, name: 'Luis', lastname: 'Gómez_123', email: 'luis.gomez@gmail.com', date: '2024-01-15', age: 'X' }, // Incorrect age, apellido con caracteres no válidos
        { id: 8, name: 'Raquel', lastname: 'Díaz' , email: 'raquel.diaz@gmail.com', date: '0000-01-01', age: '38' }, // Invalid date
        { id: 9, name: 'David', lastname: 'Fernández 45', email: 'david.fernandez@com', date: 'Invalid Date', age: '29' }, // Invalid email, apellido con números
        { id: 10, name: 'Sofía', lastname: 'Morales@', email: '', date: '2024-01-12', age: '28' }, // Missing email, apellido con carácter no permitido
        { id: 11, name: 'Felipe', lastname: 'Ruiz', email: 'felipe.ruiz@incorrect', date: '2024-03-01', age: '' }, // Incorrect email, missing age
        { id: 12, name: 'Verónica', lastname: 'Pérez#', email: 'veronica.perez@.com', date: '2024-01-15', age: '27' }, // Incorrect email, apellido con carácter no permitido
        { id: 13, name: 'Elena', lastname: 'López', email: 'elena.lopez@company.com', date: '2024-01-17', age: '' }, // Missing age
      ];
  
      // Función para mezclar aleatoriamente los datos de la tabla
      function shuffleData(data) {
        return data.sort(() => Math.random() - 0.5);
      }
  
      // Función para cargar la tabla con los datos
      function loadTable() {
        const tableBody = document.querySelector('#clientsTable tbody');
        const shuffledData = shuffleData([...clientData]); // Crea una copia de los datos y los mezcla
  
        // Limpia la tabla antes de llenarla
        tableBody.innerHTML = '';
  
        // Agrega las filas de la tabla
        shuffledData.forEach(client => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.lastname}</td>
            <td>${client.email}</td>
            <td>${client.date}</td>
            <td>${client.age}</td>
            <td><button class="btn btn-warning fixError">Corregir</button></td>
          `;
          tableBody.appendChild(row);
        });
  
        // Añadir evento de corrección de errores
        const fixButtons = document.querySelectorAll('.fixError');
        fixButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const emailCell = row.cells[3];
            const dateCell = row.cells[4];
            const ageCell = row.cells[5];
            const nameCell = row.cells[1];
            const lastnameCell = row.cells[2];
  
            // Validaciones
            const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@.+/;
            const lastnameRegex = /^[a-zA-Z]+$/;
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            const ageRegex = /^\d{2}$/;
  
            // Corregir solo las celdas con errores
            if (!emailRegex.test(emailCell.textContent.trim())) {
              emailCell.innerHTML = `<input type="text" value="${emailCell.textContent.trim()}">`;
            }
            if (!lastnameRegex.test(lastnameCell.textContent.trim())) {
              lastnameCell.innerHTML = `<input type="text" value="${lastnameCell.textContent.trim()}">`;
            }
            if (!dateRegex.test(dateCell.textContent.trim())) {
              dateCell.innerHTML = `<input type="text" value="${dateCell.textContent.trim()}">`;
            }
            if (!ageRegex.test(ageCell.textContent.trim())) {
              ageCell.innerHTML = `<input type="text" value="${ageCell.textContent.trim()}">`;
            }
          });
        });
      }
  
      // Botón para iniciar el reto
      document.getElementById('startBtn').addEventListener('click', function() {
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('gameArea').style.display = 'block';
        loadTable();
      });
  
      // Validación al enviar los datos
      document.getElementById('submitBtn').addEventListener('click', function() {
        let correctedCount = 0;
        const rows = document.querySelectorAll('#clientsTable tbody tr');
  
        rows.forEach(row => {
          const emailCell = row.cells[3].querySelector('input');
          const dateCell = row.cells[4].querySelector('input');
          const ageCell = row.cells[5].querySelector('input');
          const nameCell = row.cells[1].querySelector('input');
          const lastnameCell = row.cells[2].querySelector('input');
  
          // Expresión regular para validar el correo electrónico
          const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@.+/;
          // Validación del apellido: solo letras
          const lastnameRegex = /^[a-zA-Z]+$/;
          // Validación de la fecha
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          // Validación de edad: debe ser un número de dos dígitos
          const ageRegex = /^\d{2}$/;
  
          if (
            emailRegex.test(emailCell.value) &&
            lastnameRegex.test(lastnameCell.value) &&
            dateRegex.test(dateCell.value) &&
            ageRegex.test(ageCell.value) &&
            !isNaN(ageCell.value) && ageCell.value !== ''
          ) {
            row.classList.add('valid');
            row.classList.remove('invalid');
            correctedCount++;
          } else {
            row.classList.add('invalid');
            row.classList.remove('valid');
          }
        });
  
        const incorrectCount = rows.length - correctedCount;
        const resultText = document.getElementById('resultText');
  
        resultText.textContent = `Has corregido ${correctedCount} de ${rows.length} filas correctamente.`;
        if (correctedCount >= 10) {
          resultText.textContent += ` ¡Felicidades! Has corregido más de 10 filas. ¡Pasaste al siguiente reto!`;
          document.getElementById('nextButtonContainer').classList.remove('d-none');
        } else {
          resultText.textContent += ` Corrige más errores.`;
        }
  
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('result').style.display = 'block';
      });
  
      // Botón para reiniciar el juego
      document.getElementById('restartBtn').addEventListener('click', function() {
        location.reload();
      });