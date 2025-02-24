let tierSelecionado = 0;

// Função para alternar a visibilidade do dropdown
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Fecha o dropdown se clicar fora dele
window.onclick = function (event) {
  if (!event.target.closest(".dropdown")) {
    document.getElementById("dropdown-menu").style.display = "none";
  }
};

// Função para selecionar o tier da arma, atualizar o cálculo e trocar o texto do botão
function calcular(tier) {
    tierSelecionado = tier;
    
    // Mapeia os valores dos tiers para exibição no botão
    const tierTextos = ["4.4", "5.4", "6.4", "7.4", "8.4"];
    
    // Atualiza o texto do botão de seleção, mantendo a seta à direita
    document.querySelector(".dropbtn").innerHTML = `Tier ${tierTextos[tier - 1]} <span class="arrow">▼</span>`;

    atualizarCalculo(); // Atualiza o cálculo automaticamente
}

// Valida o input, permitindo apenas números e uma única vírgula
function validarTensao(input) {
    input.value = input.value.replace(/[^0-9,]/g, ""); // Remove tudo que não for número ou vírgula
    let partes = input.value.split(",");
    if (partes.length > 2) {
        input.value = partes[0] + "," + partes.slice(1).join(""); // Permite apenas uma vírgula
    }
}

// Atualiza o cálculo em tempo real
function atualizarCalculo() {
    let tensaoInput = document.getElementById("tensao");
    let tensao = tensaoInput.value.replace(",", "."); // Substitui vírgula por ponto
    let valorTensao = parseFloat(tensao) || 0;
    let resultado = 0;

    // Tabela de multiplicadores para cada tier
    const valores = [21590, 52732, 129572, 348337, 1041869];

    if (tierSelecionado >= 1 && tierSelecionado <= 5) {
        resultado = valores[tierSelecionado - 1] * valorTensao;
    }

    // Atualiza o valor na tela
    document.getElementById("resultado").innerText = resultado.toLocaleString("pt-BR");
}

// Adiciona um evento ao input para atualizar o cálculo em tempo real
document.getElementById("tensao").addEventListener("input", atualizarCalculo);
