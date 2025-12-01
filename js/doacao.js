// js/doacao.js

// ------------------------------------------------------------------
// Lógica para MUDANÇA DE ETAPAS E VALIDAÇÃO DE PRÓXIMO
// ------------------------------------------------------------------

const etapa1 = document.getElementById('etapa1');
const etapa2 = document.getElementById('etapa2');
const sucessEtapa = document.getElementById('sucessEtapa');
const failEtapa = document.getElementById('failEtapa');

function voltar() {
    etapa1.style.display = 'block';
    etapa2.style.display = 'none';
    sucessEtapa.style.display = 'none';
    failEtapa.style.display = 'none';
}

function proximaEtapa() {

    // 1. Validação dos campos obrigatórios da Etapa 1
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const termos = document.getElementById('termos').checked;
    
    if (!nome || !email || !termos) {
        alert('Por favor, preencha o Nome, Email e aceite os Termos para continuar.');
        return;
    }

    // 2. Passa para a Etapa 2
    etapa1.style.display = 'none';
    etapa2.style.display = 'block';
}

// Lógica para mostrar o campo de "Outro Valor"
document.querySelectorAll('input[name="valorDoacao"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const outroValorInput = document.getElementById('outro-valor-input');
        if (this.value === 'Outro') {
            outroValorInput.style.display = 'block';
            document.getElementById('valorPersonalizado').required = true;
        } else {
            outroValorInput.style.display = 'none';
            document.getElementById('valorPersonalizado').required = false;
        }
    });
});

// ------------------------------------------------------------------
// Lógica para ENVIO DOS DADOS (Comunicação com o Back-end)
// ------------------------------------------------------------------
const doacaoForm = document.getElementById('doacaoForm');
const URL_BACKEND = 'http://localhost:3001/api/doacoes/'; 

doacaoForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(doacaoForm);
    const dados = {};

    // 1. Coleta e Filtra os dados
    formData.forEach((value, key) => {
        if (value.trim() !== "" && key !== 'termos') {
            dados[key] = value.trim();
        }
    });
    
    // 2. Mapeamento e Limpeza (CamelCase -> Snake_Case)
    
    // Mapeamento de Valor
    if (dados.valorDoacao === 'Outro' && dados.valorPersonalizado) {
        dados.valor_doacao = dados.valorPersonalizado; 
    } else if (dados.valorDoacao) {
        dados.valor_doacao = dados.valorDoacao;
    }
    delete dados.valorDoacao;
    delete dados.valorPersonalizado;
    
    // CORREÇÃO CRÍTICA DE NOMENCLATURA (Frontend para o Modelo do BD)
    if (dados.dataNascimento) {
        dados.data_nascimento = dados.dataNascimento; 
        delete dados.dataNascimento;
    }
    
    if (dados.comoConheceu) {
        dados.como_ficou_sabendo = dados.comoConheceu; 
        delete dados.comoConheceu;
    }
    
    // ✅ CRÍTICO: ADICIONAR IDs FIXOS PARA SATISFAZER O BANCO DE DADOS
    // Estes IDs (1) DEVEM EXISTIR NAS SUAS TABELAS (TipoPagamento, FormaPagamento, etc.)
    dados.id_tipo_pagamento = 1; 
    dados.id_forma_pagamento = 1; 
    // ---------------------------------------------------------------------

    // Remove campos restantes
    delete dados.id_pagamento; 
    delete dados.recorrencia;
    delete dados.documento;
    delete dados.formaPagamento;

    
    console.log('Tentando enviar dados finais para o Back-end:', dados);

    try {
        const response = await fetch(URL_BACKEND, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Rota Desprotegida, não precisa de Authorization Header
            },
            body: JSON.stringify(dados)
        });

        // Tenta sempre ler o JSON da resposta
        const resultado = await response.json(); 

        if (response.ok) {
            console.log('✅ DOAÇÃO RECEBIDA COM SUCESSO! ' + JSON.stringify(resultado));
            doacaoForm.reset(); 
            // Volta para a Etapa 1
            etapa2.style.display = 'none';
            sucessEtapa.style.display = 'block';
        } else {
            // Se o Back-end retornar um erro (400, 500, etc.)
            console.error('❌ ERRO do Servidor:', resultado);
            console.log('❌ ERRO ao processar a doação: ' + (resultado.errorDetails || resultado.message || 'Erro desconhecido no servidor.'));
            etapa2.style.display = 'none';
            failEtapa.style.display = 'block';
    }

    } catch (error) {
        console.error('⚠️ Erro de Rede. Verifique se o Back-end está rodando.', error);
        alert('Erro de conexão com o servidor. Verifique se o Back-end está rodando na porta 3001.');
        etapa2.style.display = 'none';
        failEtapa.style.display = 'block';
    }
});