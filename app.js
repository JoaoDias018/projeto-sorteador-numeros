function sortear(){

    //Recupera os campos inseridos pelo usuario
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    if(validaNumeros(de, ate,quantidade) == 'Erro'){
        limparCampos();
        return;
    }
        

    let sorteados = [];
    let numero;

    //Gera numeros aleatorios e verifica se nao sao repetidos
    for(let i = 0; i < quantidade; i++){
        numero = obterNumeroAleatorio(de, ate);

        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(de, ate);
        }

        sorteados.push(numero);
    }

    //Altera label que apresenta os numeros gerados 
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados:  ${sorteados}</label>`;

    habilitarBotaoReiniciar();
}

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

function obterNumeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function habilitarBotaoReiniciar(){
    if(document.getElementById('btn-reiniciar').disabled == true)
        alterarStatusBotao('container__botao-desabilitado','container__botao',false);
}

function reiniciar(){
    limparCampos();
    alterarStatusBotao('container__botao','container__botao-desabilitado',true);  
}

function alterarStatusBotao(remove, add, status){
    let botao = document.getElementById('btn-reiniciar');
    botao.classList.remove(remove);
    botao.classList.add(add);
    botao.disabled = status;
}

function limparCampos(){
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados:  nenhum até agora</label>';
}