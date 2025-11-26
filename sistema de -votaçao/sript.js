// Variável para controlar o voto (simulando armazenamento local)
let votos = {
  personagem1: 0,
  personagem2: 0,
  personagem3: 0,
  personagem4: 0
};
// Função para votar
document.getElementById("botao-votar").addEventListener("click", function () {
  const select = document.getElementById("personagens");
  const personagem = select.value;
  const mensagemErro = document.getElementById("mensagem-erro");

  // Verifica se o usuário já votou (simulação simples)
  if (localStorage.getItem("votou")) {
    mensagemErro.textContent = "Você já votou!";
  } else {
    votos[personagem]++;
    localStorage.setItem("votou", true);
    mensagemErro.textContent = "Voto computado!";
    atualizarRanking();
  }
});

// Função para atualizar o ranking
function atualizarRanking() {
  const rankingDiv = document.getElementById("ranking");
  rankingDiv.innerHTML = "<h2>Ranking:</h2>";
  for (const [personagem, votos] of Object.entries(votos)) {
    rankingDiv.innerHTML += `<p>${personagem}: ${votos}