const form = document.getElementById('registerForm');
const alertBox = document.getElementById('alertBox');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  alertBox.style.display = 'none';

  // Construcción del formulario multipart
  const formData = new FormData();
  formData.append('nombre', document.getElementById('nombre').value);
  formData.append('correo', document.getElementById('correo').value);
  formData.append('edad', document.getElementById('edad').value);
  formData.append('password', document.getElementById('password').value);

  const fotoInput = document.getElementById('foto');
  if (fotoInput && fotoInput.files[0]) {
    formData.append('foto', fotoInput.files[0]);
  }

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      // No definir headers de Content-Type aquí; el navegador lo hace solo
      body: formData
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
