const form = document.getElementById('registerForm');
const alertBox = document.getElementById('alertBox');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  alertBox.style.display = 'none';

  const payload = {
    nombre: document.getElementById('nombre').value,
    correo: document.getElementById('correo').value,
    edad: document.getElementById('edad').value,
    password: document.getElementById('password').value
  };

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alertBox.className = 'alert alert-error';
      alertBox.textContent = data.error || 'Error al procesar registro.';
      alertBox.style.display = 'block';
    } else {
      alertBox.className = 'alert alert-success';
      alertBox.textContent = data.mensaje;
      alertBox.style.display = 'block';
      form.reset();
    }
  } catch (err) {
    alertBox.className = 'alert alert-error';
    alertBox.textContent = 'Fallo de comunicacion con el servidor.';
    alertBox.style.display = 'block';
  }
});
