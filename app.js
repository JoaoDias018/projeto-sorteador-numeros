/* Função responsável por sortear números aleatórios com base nos valores inseridos pelo usuário.
Recupera a quantidade de números a serem sorteados e o intervalo (de e até).
Valida os números e, se tudo estiver correto, gera e exibe números aleatórios não repetidos. */
function sortear(){
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    if(validaNumeros(de, ate,quantidade) == 'Erro'){
        limparCampos();
        return;
    }

    let sorteados = [];
    let numero;

    for(let i = 0; i < quantidade; i++){
        numero = obterNumeroAleatorio(de, ate);
        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(de, ate);
        }
        sorteados.push(numero);
    }

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados:  ${sorteados}</label>`;

    habilitarBotaoReiniciar();
}

/* Função que valida os números inseridos pelo usuário.
@param {number} de - O limite inferior do intervalo.
@param {number} ate - O limite superior do intervalo.
@param {number} quantidade - A quantidade de números a serem sorteados.
@returns {string} - Retorna 'Erro' em caso de falha na validação.*/
function validaNumeros(de, ate, quantidade){
    if(quantidade <= 0) {
        alert('O campo "Quantidade" deve ser superior a 0. Por favor, verifique!');
        return 'Erro';
    }
    if(isNaN(de) || isNaN(ate) || isNaN(quantidade)) {
        alert('Existe(m) campo(s) vazio(s). Por favor, verifique!');
        return 'Erro';
    }
    if (de >= ate) {
        alert('Campo "Do número" deve ser inferior ao campo "Até o número". Verifique!');
        return 'Erro'; 
      }
    if (quantidade > (ate - de) + 1) {
        alert('A quantidade informada deve ser inferior a quantidade de números existentes no intervalo. Verifique!');
        return 'Erro';
    }
}

/* Função que gera um número aleatório entre os valores mínimo e máximo fornecidos.
@param {number} min - O valor mínimo do intervalo.
@param {number} max - O valor máximo do intervalo.
@returns {number} - Um número aleatório entre min e max.*/
function obterNumeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Função que habilita o botão de reiniciar se ele estiver desabilitado.*/
function habilitarBotaoReiniciar(){
    if(document.getElementById('btn-reiniciar').disabled == true)
        alterarStatusBotao('container__botao-desabilitado','container__botao',false);
}

/* Reinicia os campos de entrada e desabilita o botão de reiniciar.*/
function reiniciar(){   
    limparCampos();
    alterarStatusBotao('container__botao','container__botao-desabilitado',true);  
}

/* Altera o status do botão de reiniciar, removendo e adicionando classes CSS
e definindo o estado de habilitação do botão. 
@param {string} remove - Nome da classe a ser removida do botão.
@param {string} add - Nome da classe a ser adicionada ao botão.
@param {boolean} status - Estado de habilitação do botão (true para desabilitar, false para habilitar).*/
function alterarStatusBotao(remove, add, status){
    let botao = document.getElementById('btn-reiniciar');
    botao.classList.remove(remove);
    botao.classList.add(add);
    botao.disabled = status;
}

/* Limpa os campos de entrada e redefine o resultado exibido.*/
function limparCampos(){
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados:  nenhum até agora</label>';
}