// js/doacao.js

// ------------------------------------------------------------------
// Lógica para MUDANÇA DE ETAPAS E VALIDAÇÃO DE PRÓXIMO
// ------------------------------------------------------------------
function proximaEtapa() {
    const etapa1 = document.getElementById('etapa1');
    const etapa2 = document.getElementById('etapa2');

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
const URL_BACKEND = 'http://localhost:3001/api/doacao/'; 

doacaoForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(doacaoForm);
    const dados = {};

    // 1. Coleta e Filtra os dados (Exclui campos vazios e o campo "termos")
    formData.forEach((value, key) => {
        // Exclui o campo 'termos' pois ele não existe no modelo do BD
        if (value.trim() !== "" && key !== 'termos') {
            dados[key] = value.trim();
        }
    });
    
    // 2. Lógica para mapear o valor da doação para o padrão do Sequelize (valor_doacao)
    if (dados.valorDoacao === 'Outro' && dados.valorPersonalizado) {
        // Usa o valor personalizado e renomeia
        dados.valor_doacao = dados.valorPersonalizado; 
    } else if (dados.valorDoacao) {
        // Usa o valor pré-selecionado e renomeia
        dados.valor_doacao = dados.valorDoacao;
    }
    
    // Remove os campos temporários (que não estão no modelo do BD)
    delete dados.valorDoacao;
    delete dados.valorPersonalizado;
    
    // 3. Adiciona o id_pagamento (se estiver faltando)
    // ATENÇÃO: Se este campo for NOT NULL no BD, ele precisa de um valor válido!
    if (!dados.id_pagamento) {
        dados.id_pagamento = null; // Assume que o campo aceita NULL temporariamente
    }
    
    console.log('Tentando enviar dados para o Back-end:', dados);

    try {
        const response = await fetch(URL_BACKEND, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        // Tenta sempre ler o JSON da resposta
        const resultado = await response.json(); 

        if (response.ok) {
            alert('✅ DOAÇÃO RECEBIDA COM SUCESSO! ' + JSON.stringify(resultado));
            doacaoForm.reset(); 
            // Volta para a Etapa 1
            document.getElementById('etapa1').style.display = 'block';
            document.getElementById('etapa2').style.display = 'none';
        } else {
            // O erro 500 ou 400 virá para cá, mostrando a mensagem do back-end
            console.error('❌ ERRO do Servidor:', resultado);
            alert('❌ ERRO ao processar a doação: ' + (resultado.errorDetails || resultado.message || 'Erro desconhecido no servidor.'));
        }

    } catch (error) {
        console.error('⚠️ Erro de Rede. Verifique se o Back-end está rodando.', error);
        alert('Erro de conexão com o servidor. Verifique se o Back-end está rodando na porta 3001.');
    }
});