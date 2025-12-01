document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // PEGAR TOKENS E DADOS DO LOCALSTORAGE
    // ================================
    const tokenVoluntario = localStorage.getItem("token_voluntario");
    const voluntario = JSON.parse(localStorage.getItem("voluntario") || "null");

    const tokenEmpresa = localStorage.getItem("token_empresa");
    const empresa = JSON.parse(localStorage.getItem("empresa") || "null");

    const btnCandidatar = document.querySelectorAll(".btn-candidatar");
    const btnStartLogin = document.querySelector(".start-login");
    const navContainer = document.getElementById("navContainer");

    // MODAL
    const modal = document.getElementById("authModal");
    const closeModal = document.querySelector(".close-button");
    const btnModalEntrar = document.getElementById("btnModalEntrar");

    // ================================
    // IDENTIFICAR TIPO DE USUÁRIO
    // ================================
    let tipoUser = null;

    if (tokenVoluntario && voluntario) tipoUser = "voluntario";
    else if (tokenEmpresa && empresa) tipoUser = "empresa";
    else tipoUser = null;

    const estaLogado = tipoUser !== null;

    // ================================
    // MENU DE NAVEGAÇÃO DINÂMICO
    // ================================
    const menuEstatico = `
        <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="./quemsomos.html">Quem somos</a></li>
            <li><a href="./contatos.html">Contato</a></li>
            <li><a href="./doacao.html">Doe</a></li>
            <li><a href="./voluntario.html" class="active">Voluntário</a></li>
            <li><a href="./entrarempresa.html">Empresas</a></li>
        </ul>
    `;

    const menuVoluntario = (v) => `
        <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="./quemsomos.html">Quem somos</a></li>
            <li><a href="./contatos.html">Contato</a></li>
            <li><a href="./doacao.html">Doe</a></li>
            <li><a href="./voluntario.html" class="active">Voluntário</a></li>
            <li><a href="./perfil.html?id=${v.id_voluntario}">👤 ${v.nome.split(" ")[0]}</a></li>
            <li><a href="#" id="btnLogout">Sair</a></li>
        </ul>
    `;

    const menuEmpresa = (e) => `
        <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="./quemsomos.html">Quem somos</a></li>
            <li><a href="./contatos.html">Contato</a></li>
            <li><a href="./doacao.html">Doe</a></li>
            <li><a href="./voluntario.html" class="active">Voluntário</a></li>
            <li><a href="./perfilEmpresa.html">🏢 ${e.nome_empresa}</a></li>
            <li><a href="#" id="btnLogout">Sair</a></li>
        </ul>
    `;

    if (!estaLogado) navContainer.innerHTML = menuEstatico;
    else if (tipoUser === "voluntario") navContainer.innerHTML = menuVoluntario(voluntario);
    else if (tipoUser === "empresa") navContainer.innerHTML = menuEmpresa(empresa);

    // ================================
    // FUNÇÃO PARA ABRIR O MODAL
    // ================================
    function abrirModal() {
        modal.style.display = "flex";
    }

    closeModal.onclick = () => modal.style.display = "none";
    btnModalEntrar.onclick = () => window.location.href = "./entrar.html";

    // ================================
    // COMPORTAMENTO DO BOTÃO “ME CANDIDATAR”
    // ================================
    
    // VOLUNTÁRIO → funciona normal
    if (tipoUser === "voluntario") {
        btnCandidatar.forEach(btn => {
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        });
    }

    // EMPRESA → desabilitar
    if (tipoUser === "empresa") {
        btnCandidatar.forEach(btn => {
            btn.style.background = "#999";
            btn.style.cursor = "not-allowed";
            btn.style.opacity = "0.6";
            btn.onclick = (e) => {
                e.preventDefault();
                alert("Empresas não podem se candidatar.");
            };
        });
    }

    // NÃO LOGADO → abrir modal
    if (!estaLogado) {
        btnCandidatar.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                abrirModal();
            };
        });
    }

    // ================================
    // BOTÃO “QUERO COMEÇAR AGORA!”
    // ================================
    if (!estaLogado) {
        btnStartLogin.onclick = (e) => {
            e.preventDefault();
            abrirModal();
        };
    }

    // ================================
    // LOGOUT
    // ================================
    document.addEventListener("click", (e) => {
        if (e.target.id === "btnLogout") {
            localStorage.removeItem("token_voluntario");
            localStorage.removeItem("voluntario");

            localStorage.removeItem("token_empresa");
            localStorage.removeItem("empresa");

            window.location.reload();
        }
    });
});
