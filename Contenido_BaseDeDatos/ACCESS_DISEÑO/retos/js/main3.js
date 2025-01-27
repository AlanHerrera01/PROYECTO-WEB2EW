const clientData = [
  { id: 1, name: 'Juan', lastname: 'Pérez', email: 'juan.perez@gmail.com', date: '2024-01-25', age: '30' },
  { id: 2, name: 'María', lastname: 'López123', email: '', date: '2024-01-24', age: 'NaN' },
  { id: 3, name: 'Carlos', lastname: 'García', email: 'carlos.garcia@com', date: '2024-01-22', age: '35' },
  { id: 4, name: 'Lucía', lastname: 'Ramírez 2024', email: 'lucia.ramirez@example.com', date: 'Invalid Date', age: '' },
  { id: 5, name: 'Pedro', lastname: 'Sánchez', email: 'pedro.sanchez@gmail.com', date: '2024-01-20', age: '25' },
  { id: 6, name: 'Ana', lastname: 'Martín', email: 'ana.martin@gmail.es', date: '2024-13-25', age: '45' },
  { id: 7, name: 'Luis', lastname: 'Gómez_123', email: 'luis.gomez@gmail.com', date: '2024-01-15', age: 'X' },
  { id: 8, name: 'Raquel', lastname: 'Díaz', email: 'raquel.diaz@gmail.com', date: '0000-01-01', age: '38' },
  { id: 9, name: 'David', lastname: 'Fernández 45', email: 'david.fernandez@com', date: 'Invalid Date', age: '29' },
  { id: 10, name: 'Sofía', lastname: 'Morales@', email: '', date: '2024-01-12', age: '28' },
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

  document.querySelectorAll('.fixError').forEach(button => {
    button.addEventListener('click', e => {
      const row = e.target.closest('tr');
      ['name', 'lastname', 'email', 'date', 'age'].forEach((field, index) => {
        const cell = row.cells[index + 1];
        const currentValue = cell.textContent.trim();
        cell.innerHTML = `<input type="text" value="${currentValue}">`;
      });
    });
  });
}

document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('gameArea').style.display = 'block';
  loadTable();
});

document.getElementById('submitBtn').addEventListener('click', () => {
  let correctedCount = 0;
  const rows = document.querySelectorAll('#clientsTable tbody tr');
  const validations = {
    email: /^[a-zA-Z]+\.[a-zA-Z]+@.+\..+/,
    lastname: /^[a-zA-Z\s]+$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    age: /^\d+$/,
  };

  rows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    const [name, lastname, email, date, age] = inputs;
    const isValid =
      validations.email.test(email.value) &&
      validations.lastname.test(lastname.value) &&
      validations.date.test(date.value) &&
      validations.age.test(age.value);

    if (isValid) {
      row.classList.add('valid');
      row.classList.remove('invalid');
      correctedCount++;
    } else {
      row.classList.add('invalid');
      row.classList.remove('valid');
    }
  });

  const resultText = document.getElementById('resultText');
  resultText.textContent = `Has corregido ${correctedCount} de ${rows.length} filas correctamente.`;

  if (correctedCount >= rows.length * 0.8) {
    resultText.textContent += ' ¡Felicidades! Has pasado al siguiente reto.';
    document.getElementById('nextButtonContainer').classList.remove('d-none');
  }

  document.getElementById('gameArea').style.display = 'none';
  document.getElementById('result').style.display = 'block';
});

document.getElementById('restartBtn').addEventListener('click', () => {
  location.reload();
});
