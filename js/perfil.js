document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3001'; 
    const navContainer = document.getElementById('navContainer');

    // --- Lógica do Cabeçalho (Reutilizada de voluntarios.js) ---

    // HTML do menu estático de fallback
    const menuEstaticoHTML = `
        <ul>
            <li><a href="./index.html">Home</a></li> 
            <li><a href="./quemsomos.html">Quem somos</a></li>
            <li><a href="./contatos.html">Contato</a></li>
            <li><a href="./doacao.html">Doe</a></li>
            <li><a href="./voluntarios.html">Voluntários</a></li>
            <li><a href="entrarempresa.html">Empresas</a></li> 
        </ul>
    `;

    const setupLogout = () => {
        const btnLogout = document.getElementById('btnLogout');
        if (btnLogout) {
            btnLogout.addEventListener('click', async (e) => {
                e.preventDefault();
                console.log("Usuário deslogado (simulação).");
                // Aqui você chamaria sua rota de logout do backend
                window.location.href = '/entrar.html'; 
            });
        }
    };

    const verificarEcarregarNav = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/status`);
            const data = await response.json();

            // SEGURANÇA: Se não estiver logado como voluntário, redireciona
            if (!data.isLoggedIn || data.userType !== 'voluntario') {
                alert('Você precisa estar logado como voluntário para acessar esta página.');
                window.location.href = './entrar.html'; 
                return; 
            }

            // 1. LOGADO: Carrega o Mini-Perfil (mini-profile.html)
            const perfilResponse = await fetch('./mini-profile.html');
            const perfilHTML = await perfilResponse.text();

            navContainer.innerHTML = perfilHTML;

            // 2. Popula os dados do mini-perfil
            const nomeVoluntario = document.getElementById('nomeVoluntario');
            if (nomeVoluntario) nomeVoluntario.textContent = `Olá, ${data.name || 'Voluntário'}!`; 
            
            // 3. Atribui a função de Logout
            setupLogout();

            // Usuário logado: Carrega os dados do Perfil e as Candidaturas
            loadProfileData();
            loadApplications();

        } catch (error) {
            console.error('Erro de conexão ou carregamento do cabeçalho:', error);
            navContainer.innerHTML = menuEstaticoHTML; // Fallback
        }
    };

    // --- Lógica de Carregamento de Dados do Perfil ---

    // SIMULAÇÃO: Busca de Dados Cadastrais
    const fetchProfileData = async () => {
        // Esta seria a chamada real ao seu backend: 
        // fetch(`${BASE_URL}/api/voluntario/meu-perfil`)
        return {
            name: "Maria da Silva",
            email: "maria.silva@exemplo.com",
            phone: "(11) 98765-4321",
            city: "São Paulo, SP",
            skills: "Design Gráfico, Edição de Vídeo, Jardinagem",
            isLoaded: true
        };
    };

    const loadProfileData = async () => {
        const data = await fetchProfileData();

        if (data.isLoaded) {
            document.getElementById('data-name').textContent = data.name;
            document.getElementById('data-email').textContent = data.email;
            document.getElementById('data-phone').textContent = data.phone;
            document.getElementById('data-city').textContent = data.city;
            document.getElementById('data-skills').textContent = data.skills;
        }
    };

    // SIMULAÇÃO: Busca de Candidaturas
    const fetchApplications = async () => {
        // Esta seria a chamada real ao seu backend: 
        // fetch(`${BASE_URL}/api/voluntario/candidaturas`)
        return [
            {
                id: 101,
                title: "Reflorestamento na Serra",
                area: "Meio Ambiente",
                status: "Aprovado", // Aprovado, Pendente, Rejeitado
                date: "2025-01-20"
            },
            {
                id: 102,
                title: "Aulas de Edição para ONG",
                area: "Marketing Digital",
                status: "Pendente",
                date: "2025-01-25"
            },
            {
                id: 103,
                title: "Construção de Estufa Comunitária",
                area: "Comunidade",
                status: "Rejeitado",
                date: "2025-01-10"
            }
        ];
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Aprovado':
                return 'status-approved';
            case 'Rejeitado':
                return 'status-rejected';
            case 'Pendente':
            default:
                return 'status-pending';
        }
    };

    const loadApplications = async () => {
        const applicationsContainer = document.getElementById('applicationsContainer');
        const applications = await fetchApplications();

        applicationsContainer.innerHTML = ''; // Limpa a mensagem de carregamento

        if (applications.length === 0) {
            applicationsContainer.innerHTML = '<p class="no-data">Você ainda não se candidatou a nenhuma vaga.</p>';
            return;
        }

        applications.forEach(app => {
            const statusClass = getStatusClass(app.status);
            const appCard = document.createElement('div');
            appCard.className = 'application-card';
            appCard.innerHTML = `
                <h3>${app.title}</h3>
                <p><strong>Área:</strong> ${app.area}</p>
                <p><strong>Data da Candidatura:</strong> ${new Date(app.date).toLocaleDateString('pt-BR')}</p>
                <div class="status ${statusClass}">${app.status}</div>
                <button class="btn-detail">Ver Detalhes</button>
            `;
            applicationsContainer.appendChild(appCard);
        });
    };

    // Inicia o processo de verificação e carregamento
    verificarEcarregarNav();
});