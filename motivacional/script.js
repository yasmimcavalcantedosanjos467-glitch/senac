// Frases inspiradoras 🌼
const frases = [
  "A cada novo dia, Deus renova a esperança em nosso coração.",
  "A fé não elimina as perguntas, mas dá força para seguir.",
  "Pequenos atos de amor transformam o mundo ao redor.",
  "Não desista: Deus age quando a perseverança encontra a oração.",
  "Sorria — mesmo na dificuldade, há motivos para agradecer."
];

// Chaves do localStorage
const LS_FAV = 'motiva_fav_v1';
const LS_METAS = 'motiva_metas_v1';
const LS_THEME = 'motiva_theme_v1';

// Funções utilitárias de armazenamento
function lerFavoritos(){ try { return JSON.parse(localStorage.getItem(LS_FAV) || '[]'); } catch { return []; } }
function salvarFavoritos(list){ localStorage.setItem(LS_FAV, JSON.stringify(list)); }
function lerMetas(){ try { return JSON.parse(localStorage.getItem(LS_METAS) || '[]'); } catch { return []; } }
function salvarMetas(list){ localStorage.setItem(LS_METAS, JSON.stringify(list)); }

// Elementos
const fraseBox = document.getElementById('fraseBox');
const novaFraseBtn = document.getElementById('novaFraseBtn');
const favoritarBtn = document.getElementById('favoritarBtn');
const verFavoritosBtn = document.getElementById('verFavoritosBtn');
const favoritosDiv = document.getElementById('favoritos');
const metaInput = document.getElementById('metaInput');
const addMetaBtn = document.getElementById('addMetaBtn');
const metaList = document.getElementById('metaList');
const progressBar = document.getElementById('progressBar');
const metaStatus = document.getElementById('metaStatus');
const badgesDiv = document.getElementById('badges');
const limparFavoritosBtn = document.getElementById('limparFavoritos');
const resetMetasBtn = document.getElementById('resetMetas');
const themeToggle = document.getElementById('themeToggle');

let atualIndex = 0;
let favoritos = lerFavoritos();
let metas = lerMetas();

// --- Frases ---
function mostrarFrase(index=null){
  if(index===null) index = Math.floor(Math.random()*frases.length);
  atualIndex = index;
  fraseBox.textContent = frases[index];
}
novaFraseBtn.addEventListener('click', ()=> mostrarFrase());

// --- Favoritar ---
function atualizaFavoritosUI(){
  favoritosDiv.innerHTML = favoritos.length === 0
    ? '<small style="color:#666">Nenhum favorito ainda.</small>'
    : favoritos.map((f, i) =>
      `<div class="fav-item"><div>${f}<br><small>Favorito ${i+1}</small></div>
       <button onclick="removerFavorito(${i})" style="border:0;background:transparent;color:#c33;cursor:pointer">Remover</button></div>`
    ).join('');
}
function removerFavorito(i){ favoritos.splice(i,1); salvarFavoritos(favoritos); atualizaFavoritosUI(); showBadgeIfEligible(); }
favoritarBtn.addEventListener('click', ()=>{
  const texto = frases[atualIndex];
  if(!favoritos.includes(texto)){
    favoritos.unshift(texto);
    salvarFavoritos(favoritos);
    atualizaFavoritosUI();
    showBadgeIfEligible();
    alert('Frase adicionada aos Favoritos 💖');
  } else alert('Essa frase já está nos favoritos.');
});
verFavoritosBtn.addEventListener('click', ()=>{
  favoritosDiv.style.display = favoritosDiv.style.display === 'none' ? 'block' : 'none';
  verFavoritosBtn.textContent = favoritosDiv.style.display === 'block' ? 'Fechar Favoritos' : 'Ver Favoritos';
});

// --- Metas ---
function renderMetas(){
  metaList.innerHTML = metas.map((m, i)=>`
    <div class="meta-item">
      <input type="checkbox" ${m.done?'checked':''} onchange="toggleMeta(${i})">
      <div style="flex:1">${m.text}</div>
      <button onclick="removerMeta(${i})" style="border:0;background:transparent;color:#c33;cursor:pointer">Remover</button>
    </div>`).join('');
  updateProgress();
}
function toggleMeta(i){ metas[i].done=!metas[i].done; salvarMetas(metas); renderMetas(); showBadgeIfEligible(); }
function removerMeta(i){ metas.splice(i,1); salvarMetas(metas); renderMetas(); showBadgeIfEligible(); }
addMetaBtn.addEventListener('click', ()=>{
  const t=metaInput.value.trim();
  if(!t)return;
  metas.unshift({text:t,done:false});
  salvarMetas(metas);
  metaInput.value='';
  renderMetas();
  showBadgeIfEligible();
});
metaInput.addEventListener('keypress', e=>{ if(e.key==='Enter') addMetaBtn.click(); });
function updateProgress(){
  const total=metas.length;
  const done=metas.filter(m=>m.done).length;
  const pct=total?Math.round((done/total)*100):0;
  progressBar.style.width=pct+'%';
  metaStatus.textContent=`${done} de ${total} concluídas`;
}

// --- Conquistas ---
function showBadgeIfEligible(){
  badgesDiv.innerHTML='';
  const badges=[];
  if(favoritos.length>=1)badges.push('💖 Primeiro Favorito');
  if(favoritos.length>=5)badges.push('🌟 5 Favoritos');
  if(metas.filter(m=>m.done).length>=1)badges.push('✅ Primeira Meta Concluída');
  if(metas.filter(m=>m.done).length>=5)badges.push('🏆 5 Metas Concluídas');
  badgesDiv.innerHTML=badges.length?badges.map(b=>`<div class="badge">${b}</div>`).join(''):'<small style="color:#666">Nenhuma conquista ainda — vamos começar!</small>';
}

// --- Limpar/Reset ---
limparFavoritosBtn.addEventListener('click', ()=>{ if(confirm('Limpar todos os favoritos?')){favoritos=[];salvarFavoritos(favoritos);atualizaFavoritosUI();showBadgeIfEligible();}});
resetMetasBtn.addEventListener('click', ()=>{ if(confirm('Resetar todas as metas?')){metas=[];salvarMetas(metas);renderMetas();showBadgeIfEligible();}});

// --- Tema (claro/escuro) ---
function setTheme(dark){
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem(LS_THEME, dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☀️' : '🌙';
}
themeToggle.addEventListener('click', ()=> setTheme(!document.documentElement.classList.contains('dark')));
setTheme(localStorage.getItem(LS_THEME) === 'dark');

// --- Inicialização ---
function init(){
  favoritos = lerFavoritos();
  metas = lerMetas();
  mostrarFrase();
  atualizaFavoritosUI();
  renderMetas();
  showBadgeIfEligible();
}
init();
