const clientData = [
  { id: 'abc', name: 'Juan', lastname: 'Pérez', email: 'juan.perez@gmail.com', date: '2024-01-25', age: '30' },
  { id: 2, name: 'María', lastname: 'López', email: '', date: '2024-01-24', age: 'NaN' },
  { id: 3, name: 'Carlos', lastname: 'García', email: 'carlos.garcia@com', date: '2024-13-25', age: '35' },
  { id: 4, name: 'Lucia', lastname: 'Ramirez', email: 'lucia.ramirez@example.com', date: '2024-01-20', age: '25' },
];

function shuffleData(data) {
  return data.sort(() => Math.random() - 0.5);
}

function loadTable() {
  const tableBody = document.querySelector('#clientsTable tbody');
  const shuffledData = shuffleData([...clientData]);

  tableBody.innerHTML = '';

  shuffledData.forEach(client => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="id">${client.id}</td>
      <td class="name">${client.name}</td>
      <td class="lastname">${client.lastname}</td>
      <td class="email">${client.email}</td>
      <td class="date">${client.date}</td>
      <td class="age">${client.age}</td>
      <td><button class="btn btn-warning fixError">Corregir</button> <button class="btn btn-success saveBtn" style="display:none;">Guardar</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll('.fixError').forEach(button => {
    button.addEventListener('click', e => {
      const row = e.target.closest('tr');
      const fields = ['id', 'name', 'lastname', 'email', 'date', 'age'];

      // Hacer que los campos sean editables
      fields.forEach(field => {
        const cell = row.querySelector(`.${field}`);
        const value = cell.textContent.trim();
        cell.innerHTML = `<input type="text" value="${value}">`;
      });

      // Mostrar el botón "Guardar"
      row.querySelector('.saveBtn').style.display = 'inline';
      row.querySelector('.saveBtn').addEventListener('click', () => {
        // Guardar el valor sin validaciones en el momento de guardar
        fields.forEach(field => {
          const cell = row.querySelector(`.${field}`);
          const input = cell.querySelector('input');
          const newValue = input.value.trim();
          cell.innerHTML = newValue; // Guardar el valor
        });

        // Ocultar el botón de guardar después de guardar
        row.querySelector('.saveBtn').style.display = 'none';
      });
    });
  });
}

// Validación de cada campo
function validateField(field, value) {
  const validations = {
    id: /^\d+$/, // ID: solo números
    name: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, // Nombre: solo letras sin caracteres especiales
    lastname: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, // Apellido: solo letras sin caracteres especiales
    email: /^[a-zA-Z]+\.[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, // Email: nombre.apellido@extension.extension
    date: function(dateValue) { // Fecha: formato YYYY-MM-DD
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (regex.test(dateValue)) {
        const [year, month, day] = dateValue.split('-').map(num => parseInt(num, 10));
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
      }
      return false;
    },
    age: /^\d{2}$/ // Edad: dos dígitos
  };

  if (validations[field]) {
    return validations[field].test ? validations[field].test(value) : validations[field](value);
  }
  return false;
}

document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('gameArea').style.display = 'block';
  loadTable();
});

document.getElementById('submitBtn').addEventListener('click', () => {
  let correctedCount = 0;
  const rows = document.querySelectorAll('#clientsTable tbody tr');
  let totalRows = rows.length;
  
  // Validar cada fila de la tabla
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    let allFieldsCorrect = true;

    // Validar cada campo
    cells.forEach(cell => {
      if (!cell.classList.contains('valid') && !cell.querySelector('input')) { // Si no es editable
        const field = cell.classList[0]; // Obtener el nombre del campo (id, name, etc.)
        const inputValue = cell.textContent.trim();
        
        if (validateField(field, inputValue)) {
          cell.classList.add('valid');
        } else {
          cell.classList.add('invalid');
          allFieldsCorrect = false;
        }
      }
    });

    if (allFieldsCorrect) {
      correctedCount++;
    }
  });

  const resultText = document.getElementById('resultText');
  resultText.textContent = `Has corregido ${correctedCount} de ${totalRows} filas correctamente.`;

  // Si corrige al menos 3 de 4 (75%)
  if (correctedCount >= totalRows * 0.75) {
    resultText.textContent += ' ¡Felicidades! Has pasado al siguiente reto.';
    document.getElementById('nextButtonContainer').classList.remove('d-none'); // Mostrar el botón de siguiente reto
  } else {
    resultText.textContent += ' Necesitas corregir más filas para pasar al siguiente reto.';
  }

  document.getElementById('gameArea').style.display = 'none';
  document.getElementById('result').style.display = 'block';
});

document.getElementById('restartBtn').addEventListener('click', () => {
  location.reload();
});
