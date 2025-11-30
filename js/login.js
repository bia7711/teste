document.addEventListener('DOMContentLoaded', () => {
    // 1. Encontrar o botão 'Entrar' e o formulário
    const btnEntrar = document.querySelector('button[type="submit"]');
    
    // 2. Adicionar um evento de clique
    if (btnEntrar) {
        btnEntrar.addEventListener('click', async (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            // 3. Coletar dados do formulário
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            // 4. Checagem básica
            if (!email || !senha) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // 5. URL da API (Ajuste para a rota correta do VoluntarioController)
            const API_URL = 'http://localhost:3001/api/voluntarios/login'; // Assumindo esta é a rota correta

            try {
                // 6. Fazer a requisição POST para o backend
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // REMOVIDO: credentials: 'include' (Não é necessário para JWT via Authorization Header)
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    // ✅ CORREÇÃO CRÍTICA: Salvar o Token no localStorage
                    if (data.token) {
                        localStorage.setItem('jwtToken', data.token);
                        // Opcional: Salvar dados do usuário, se necessário:
                        // localStorage.setItem('userData', JSON.stringify(data.voluntario));
                    }
                    
                    alert('Login realizado com sucesso!');
                    // Redirecionar para o perfil ou home
                    window.location.href = './perfil.html'; 
                } else {
                    // Exibir o erro retornado pelo backend (ex: "Senha incorreta")
                    alert(`Erro ao logar: ${data.error || 'Erro desconhecido'}`);
                }
            } catch (error) {
                // Se der erro de rede (problema de conexão)
                alert('Erro de conexão com o servidor de autenticação. Verifique se o backend está ativo (porta 3001).');
                console.error('Erro de rede:', error);
            }
        });
    }
});