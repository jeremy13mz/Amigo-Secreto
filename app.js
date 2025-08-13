const amigos    = [];
const listaEl   = document.getElementById('listaAmigos');
const secretoEl = document.getElementById('secreto');
const btnAdd    = document.getElementById('btnAdd');
const btnDraw   = document.getElementById('btnDraw');
const btnReset  = document.getElementById('btnReset');
const input     = document.getElementById('amigo');
const label     = document.getElementById('result-label');

// Añadir amigo
btnAdd.addEventListener('click', () => {
  const nombre = input.value.trim();
  if (!nombre) return;
  amigos.push(nombre);
  input.value = '';
  renderLista();
  btnDraw.disabled = amigos.length < 2;
});

// Sorteo: elige uno, lo muestra, lo elimina
btnDraw.addEventListener('click', () => {
  if (amigos.length < 2) return;
  const idx = Math.floor(Math.random() * amigos.length);
  const elegido = amigos.splice(idx, 1)[0];
  label.textContent = 'Sorteado';
  secretoEl.textContent = elegido;
  renderLista();

  // Si quedó uno, ese es el secreto final
  if (amigos.length === 1) {
    label.textContent = 'Amigo Secreto';
    secretoEl.textContent = amigos[0];
    btnDraw.disabled = true;
    btnReset.disabled = false;
  }
});

// Reiniciar todo
btnReset.addEventListener('click', () => {
  amigos.length = 0;
  renderLista();
  label.textContent = 'Eliminado';
  secretoEl.textContent = '—';
  btnDraw.disabled = true;
  btnReset.disabled = true;
});

function renderLista() {
  listaEl.innerHTML = '';
  amigos.forEach((n, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${n}`;
    listaEl.appendChild(li);
  });
}
