const usuario = JSON.parse(sessionStorage.getItem('usuario'));

if (!usuario) {
  window.location.href = '/login';
} else {
  document.getElementById('userGreeting').textContent = `Sesion activa: ${usuario.nombre} (${usuario.correo})`;
}

document.getElementById('btnLogout').addEventListener('click', () => {
  sessionStorage.removeItem('usuario');
  window.location.href = '/login';
}); 
