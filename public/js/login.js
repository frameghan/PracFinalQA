const form = document.getElementById('loginForm');
const alertBox = document.getElementById('alertBox');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  alertBox.style.display = 'none';

  const payload = {
    correo: document.getElementById('correo').value,
    password: document.getElementById('password').value
  };

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alertBox.className = 'alert alert-error';
      alertBox.textContent = data.error || 'Credenciales invalidas.';
      alertBox.style.display = 'block';
    } else {
      sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
      window.location.href = '/dashboard';
    }
  } catch (err) {
    alertBox.className = 'alert alert-error';
    alertBox.textContent = 'Fallo de conexion con el servidor.';
    alertBox.style.display = 'block';
  }
}); 
