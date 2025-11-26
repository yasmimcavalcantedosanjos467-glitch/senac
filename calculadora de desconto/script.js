function calcular() {
  let valor = parseFloat(document.getElementById('valor').value);
  let pagamento = document.getElementById('pagamento').value;
  let resultado = document.getElementById('resultado');

  if (isNaN(valor) || valor <= 0) {
    resultado.textContent = "Por favor, digite um valor válido!";
    return;
  }

  let valorFinal = 0;

  switch (pagamento) {
    case 'avista':
      valorFinal = valor * 0.9; // 10% de desconto
      break;
    case 'credito':
      valorFinal = valor * 1.05; // 5% de acréscimo
      break;
    case 'duasvezes':
      valorFinal = valor; // sem desconto
      break;
    case 'dezvezes':
      valorFinal = valor * 1.10; // 10% de acréscimo
      break;
  }

  resultado.textContent = `Valor final: R$ ${valorFinal.toFixed(2)}`;
}
