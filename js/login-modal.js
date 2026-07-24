const navLogin = document.getElementById('nav-login');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeLoginModal');
const form = document.getElementById('loginForm');
const mensaje = document.getElementById('loginMensaje');
const fetchOriginal = window.fetch.bind(window);
window.fetch = (resource, options = {}) => {
  const url = typeof resource === 'string' ? resource : resource.url;
  try {
    const apiUrl = new URL(url, window.location.origin);
    if (apiUrl.pathname.startsWith('/api/')) {
      const token = localStorage.getItem('token');
      options.headers = { ...(options.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
    }
  } catch (err) {
    // Ignore invalid URL and continue with original request.
  }
  return fetchOriginal(resource, options);
};
function renderNav() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  if (token && username) {
    navLogin.innerHTML = `<span>&#128100; ${username}</span><div id="logoutDiv" class="nav-btn">Cerrar sesi\u00f3n</div>`;
    document.getElementById('logoutDiv').addEventListener('click', () => {
      localStorage.removeItem('token'); localStorage.removeItem('username'); localStorage.removeItem('role');
      form.reset(); window.location.reload();
    });
  } else {
    navLogin.innerHTML = '<div id="loginDiv" class="nav-btn">Login</div>';
    document.getElementById('loginDiv').addEventListener('click', () => { loginModal.style.display = 'block'; });
  }
}
closeModal.addEventListener('click', () => { loginModal.style.display = 'none'; form.reset(); });
form.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: document.getElementById('user').value, password: document.getElementById('password').value }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'No se pudo iniciar sesi\u00f3n');
    localStorage.setItem('token', data.token); localStorage.setItem('role', data.role); localStorage.setItem('username', document.getElementById('user').value);
    window.location.reload();
  } catch (error) { mensaje.textContent = `Error: ${error.message}`; mensaje.style.color = 'red'; }
});
renderNav();
