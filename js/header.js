document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.querySelector('nav'); // ou o seletor do seu header/nav

    const token = localStorage.getItem('token');

    function criarMiniPerfil(nome) {
        const miniPerfil = document.createElement('div');
        miniPerfil.id = 'miniPerfil';
        miniPerfil.className = 'mini-profile';
        miniPerfil.innerHTML = `
            <div class="profile-info">
                <span id="nomeVoluntario">${nome}</span>
                <img id="fotoVoluntario" src="./img/default-profile.png" alt="Foto de perfil" class="profile-pic">
            </div>
            <div class="profile-dropdown">
                <ul>
                    <li><a href="./perfil.html">Meu Perfil</a></li>
                    <li><a href="#" id="btnLogout">Sair</a></li>
                </ul>
            </div>
        `;
        headerContainer.appendChild(miniPerfil);

        // Logout
        document.getElementById('btnLogout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('voluntario'); // limpa dados do voluntário
            location.reload(); // atualiza a página
        });
    }

    function criarBotaoEntrar() {
        const botao = document.createElement('li');
        botao.innerHTML = `<a href="./entrar.html">Entrar</a>`;
        headerContainer.querySelector('ul').appendChild(botao);
    }

    if (token) {
        // Se tiver token, pega o nome do voluntário do localStorage ou faz fetch
        let voluntario = JSON.parse(localStorage.getItem('voluntario'));

        if (voluntario && voluntario.nome) {
            criarMiniPerfil(voluntario.nome);
        } else {
            // Se não tiver no storage, busca do backend
            fetch('http://localhost:3001/api/perfil/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('voluntario', JSON.stringify(data));
                criarMiniPerfil(data.nome);
            })
            .catch(err => {
                console.error('Erro ao buscar dados do voluntário:', err);
                criarBotaoEntrar();
            });
        }
    } else {
        criarBotaoEntrar();
    }
});
