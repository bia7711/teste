// js/doacao.js

// ------------------------------------------------------------------
// Lógica para MUDANÇA DE ETAPAS E VALIDAÇÃO DE PRÓXIMO
// ------------------------------------------------------------------
// A função deve ser mantida fora de qualquer escopo para que o HTML a encontre
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

doacaoForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(doacaoForm);
    const dados = {};
    formData.forEach((value, key) => {
        if (value.trim() !== "") {
            dados[key] = value.trim();
        }
    });
    
    if (dados.valorDoacao === 'Outro' && dados.valorPersonalizado) {
        dados.valorDoacao = dados.valorPersonalizado;
    }
    delete dados.valorPersonalizado;
    
    const url = 'http://localhost:3001/api/doacao/registrar'; 
    
    console.log('Tentando enviar dados para o Back-end:', dados);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert('✅ DOAÇÃO RECEBIDA COM SUCESSO! ' + resultado.message);
            doacaoForm.reset(); 
            // Volta para a Etapa 1
            document.getElementById('etapa1').style.display = 'block';
            document.getElementById('etapa2').style.display = 'none';
        } else {
            alert('❌ ERRO ao processar a doação: ' + (resultado.message || 'Erro desconhecido no servidor.'));
        }

    } catch (error) {
        console.error('⚠️ Erro de Rede/CORS. Verifique o console do navegador.', error);
        alert('Erro de conexão com o servidor. Verifique se o Back-end está rodando e se há erro de CORS no console.');
    }
});