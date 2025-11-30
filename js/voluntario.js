document.addEventListener('DOMContentLoaded', () => {
    // Rota corrigida para o Controller de Voluntários
    const BASE_URL = 'http://localhost:3001'; 
    // ROTA_CADASTRO_VOLUNTARIO deve apontar para onde seu VoluntarioController.create está
    const ROTA_CADASTRO_VOLUNTARIO = `${BASE_URL}/api/voluntarios`; 

    const formCadastro = document.getElementById('formCadastro');
    const mensagemFeedback = document.getElementById('mensagemFeedback');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            mensagemFeedback.textContent = '';
            mensagemFeedback.style.color = ''; 
            
            // 1. Captura de todos os campos do formulário
            const cpf = document.getElementById('cpf').value;
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmaSenha = document.getElementById('confirmaSenha').value;
            const dataNascimento = document.getElementById('dataNascimento').value;
            const termos = document.getElementById('termos').checked;
            
            // Validação de campos vazios (fallback para o 'required' do HTML)
            if (!cpf || !nome || !sobrenome || !email || !senha || !confirmaSenha || !dataNascimento) {
                exibirFeedback('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }

            // 2. Validação de Senha e Termos
            if (senha !== confirmaSenha) {
                exibirFeedback('As senhas digitadas não coincidem.', 'erro');
                return;
            }
            if (!termos) {
                exibirFeedback('Você deve concordar com os Termos e Condições.', 'erro');
                return;
            }
            
            // 3. Validação de Idade Mínima (18 ANOS) 🎂
            const dataNasc = new Date(dataNascimento);
            const hoje = new Date();
            let idade = hoje.getFullYear() - dataNasc.getFullYear();
            const mes = hoje.getMonth() - dataNasc.getMonth();

            // Ajusta a idade se o aniversário ainda não ocorreu neste ano
            if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
                idade--;
            }

            if (idade < 18) {
                exibirFeedback('❌ O voluntário deve ter no mínimo 18 anos para se cadastrar.', 'erro');
                return;
            }
            // --- FIM DA VALIDAÇÃO DE IDADE ---

            // 4. Cria o objeto de dados (MAPEAMENTO para o Backend)
            const dadosCadastro = {
                cpf,
                nome,
                sobrenome, 
                email,
                senha,
                data_nascimento: dataNascimento, // Mapeado para o nome do campo no seu Model
            };
            
            // 5. Envia a requisição para o Backend
            try {
                const response = await fetch(ROTA_CADASTRO_VOLUNTARIO, { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosCadastro),
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    exibirFeedback(data.mensagem || '✅ Cadastro de Voluntário realizado com sucesso! Redirecionando para o login...', 'sucesso');
                    // Redireciona para o login após sucesso
                    setTimeout(() => { window.location.href = './entrar.html'; }, 1500); 
                } else {
                    // Exibe o erro retornado pelo Controller (ex: "E-mail já cadastrado")
                    exibirFeedback(data.error || data.mensagem || '❌ Ocorreu um erro no cadastro. Verifique os dados.', 'erro');
                }

            } catch (error) {
                console.error('Erro de conexão:', error);
                exibirFeedback('⚠️ Erro de conexão: Verifique se o servidor está ativo na porta 3001.', 'erro');
            }
        });
    }

    function exibirFeedback(mensagem, tipo) {
        const feedbackDiv = document.getElementById('mensagemFeedback');
        if (!feedbackDiv) return;

        feedbackDiv.textContent = mensagem;
        feedbackDiv.style.fontWeight = 'bold';
        
        if (tipo === 'sucesso') {
            feedbackDiv.style.color = '#10B981'; // Cor verde
        } else if (tipo === 'erro') {
            feedbackDiv.style.color = '#EF4444'; // Cor vermelha
        }
    }
});