const form = document.getElementById('formMeta');
const listaMetas = document.getElementById('listaMetas');


form.addEventListener('submit', function(e) {
e.preventDefault();


const titulo = document.getElementById('titulo').value;
const descricao = document.getElementById('descricao').value;
const prioridade = document.getElementById('prioridade').value;
const data = document.getElementById('data').value;


const metaDiv = document.createElement('div');
metaDiv.classList.add('meta');


metaDiv.innerHTML = `
<h3>${titulo}</h3>
<p><strong>Descrição:</strong> ${descricao}</p>
<p><strong>Prioridade:</strong> ${prioridade}</p>
<p><strong>Data:</strong> ${data}</p>
<div class="botoes">
<button onclick="concluir(this)">Concluir</button>
<button onclick="reaver(this)">Reaver</button>
</div>
`;


listaMetas.appendChild(metaDiv);
form.reset();
});


function concluir(botao) {
const meta = botao.parentElement.parentElement;
meta.classList.add('concluida');
}


function reaver(botao) {
const meta = botao.parentElement.parentElement;
meta.classList.remove('concluida');
}
// Delegação de eventos para botões
listaMetas.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('concluir')) {
        el.closest('.meta').classList.add('concluida');
    }

    if (el.classList.contains('reaver')) {
        el.closest('.meta').classList.remove('concluida');
    }
});
