// Espera o evento DOMContentLoaded para garantir que o HTML foi totalmente carregado antes de executar o código.
document.addEventListener("DOMContentLoaded", () => {
    carregarTarefasDoArmazenamento(); // Carrega as tarefas do armazenamento ao carregar a página.
});

// Função para adicionar uma nova tarefa à lista.
function adicionarTarefa() {
    const entradaTarefa = document.getElementById("entradaTarefa");
    const textoTarefa = entradaTarefa.value.trim(); // Remove espaços em branco no inicio e fim.

    // Verifica se o texto da tarefa tem pelo menos 5 letras ou números.
    if (contarLetrasENumeros(textoTarefa) >= 5) {
        const listaTarefas = document.getElementById("listaTarefas");

        // Cria um novo elemento de lista (li) para a tarefa.
        const itemTarefa = document.createElement("li");
        itemTarefa.className = "tarefa"; // Define a classe do item da tarefa.

        // Insere o HTML no item da tarefa com o texto e botões necessários.
        itemTarefa.innerHTML = `
            <span class="texto-tarefa">${textoTarefa}</span>
            <div class="botoes-tarefa">
                <button onclick="alternarConclusaoTarefa(this)">Concluída</button>
                <button onclick="excluirTarefa(this)">Excluir</button>
            </div>
        `;

        // Adiciona o item da tarefa à lista de tarefas.
        listaTarefas.appendChild(itemTarefa);

        // Salva a tarefa no armazenamento local.
        salvarTarefaNoArmazenamento(textoTarefa);

        // Limpa o campo de entrada após adicionar a tarefa.
        entradaTarefa.value = "";
    } else {
        alert("Adicione uma tarefa válida com pelo menos 5 letras ou números.");
    }
}

// Função para contar o número de letras e números em uma string.
function contarLetrasENumeros(texto) {
    let contagem = 0;
    // Percorre cada caractere da string e verifica se é uma letra ou número.
    for (let i = 0; i < texto.length; i++) {
        const caractere = texto[i];
        if ((caractere >= "a" && caractere <= "z") || (caractere >= "A" && caractere <= "Z") || (caractere >= "0" && caractere <= "9")) {
            contagem++;
        }
    }
    return contagem;
}

// Função para alternar a conclusão de uma tarefa.
function alternarConclusaoTarefa(botao) {
    const itemTarefa = botao.parentNode.parentNode; // Obtém o elemento de lista (itemTarefa) que contém a tarefa associada ao botão clicado.
    itemTarefa.classList.toggle("concluida"); // Alterna a classe "concluida" no item da tarefa.
}

// Função para excluir uma tarefa.
function excluirTarefa(botao) {
    const itemTarefa = botao.parentNode.parentNode; 
    const textoTarefa = itemTarefa.querySelector(".texto-tarefa").innerText;

    // Remove o item da tarefa da lista.
    itemTarefa.remove();

    // Remove a tarefa do armazenamento local.
    removerTarefaDoArmazenamento(textoTarefa);
}

// Função para limpar as tarefas concluídas.
function limparTarefasConcluidas() {
    const tarefasConcluidas = document.querySelectorAll(".concluida");

    // Itera sobre as tarefas concluídas e as remove da lista  do armazenamento local.
    tarefasConcluidas.forEach((itemTarefa) => {
        const textoTarefa = itemTarefa.querySelector(".texto-tarefa").innerText;
        itemTarefa.remove();
        removerTarefaDoArmazenamento(textoTarefa);
    });
}

// Função para salvar uma tarefa no armazenamento local.
function salvarTarefaNoArmazenamento(textoTarefa) {
    let tarefas = obterTarefasDoArmazenamento();
    tarefas.push(textoTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para remover uma tarefa do armazenamento local.
function removerTarefaDoArmazenamento(textoTarefa) {
    let tarefas = obterTarefasDoArmazenamento();
    tarefas = tarefas.filter((tarefa) => tarefa !== textoTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para obter as tarefas do armazenamento local.
function obterTarefasDoArmazenamento() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    return tarefas;
}

// Função para carregar as tarefas do armazenamento local ao carregar a página.
function carregarTarefasDoArmazenamento() {
    const tarefas = obterTarefasDoArmazenamento();
    const listaTarefas = document.getElementById("listaTarefas");

    // Itera sobre as tarefas e as adiciona à lista.
    tarefas.forEach((textoTarefa) => {
        const itemTarefa = document.createElement("li");
        itemTarefa.className = "tarefa";
        itemTarefa.innerHTML = `
            <span class="texto-tarefa">${textoTarefa}</span>
            <div class="botoes-tarefa">
                <button onclick="alternarConclusaoTarefa(this)">Concluída</button>
                <button onclick="excluirTarefa(this)">Excluir</button>
            </div>
        `;

        listaTarefas.appendChild(itemTarefa);
    });
}
