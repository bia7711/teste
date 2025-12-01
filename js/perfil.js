// ---------------------------
// VALIDAR LOGIN
// ---------------------------
const token = localStorage.getItem("token_voluntario");
const voluntario = JSON.parse(localStorage.getItem("voluntario"));

if (!token || !voluntario) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "./entrar.html";
}

// ---------------------------
// PREENCHER DADOS DO PERFIL
// ---------------------------
document.getElementById("data-name").textContent = voluntario.nome + " " + voluntario.sobrenome;
document.getElementById("data-email").textContent = voluntario.email;
document.getElementById("data-phone").textContent = voluntario.telefone || "Não informado";
document.getElementById("data-city").textContent = voluntario.endereco || "Não informado";
document.getElementById("data-skills").textContent = voluntario.habilidades || "Nenhuma habilidade cadastrada";

// ---------------------------
// BUSCAR CANDIDATURAS DO VOLUNTÁRIO
// ---------------------------
async function carregarCandidaturas() {
    try {
        const response = await fetch(`http://localhost:3001/api/inscricoes/voluntario/${voluntario.id_voluntario}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const inscricoes = await response.json();

        const container = document.getElementById("applicationsContainer");
        container.innerHTML = ""; // limpa a lista atual

        if (inscricoes.length === 0) {
            container.innerHTML = "<p>Você ainda não se inscreveu em nenhum projeto.</p>";
            return;
        }

        inscricoes.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("application-card");

            card.innerHTML = `
                <p><strong>Projeto:</strong> ${item.acao.nome}</p>
                <p><strong>Data de Inscrição:</strong> ${new Date(item.created_at).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${item.status}</p>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        console.error("Erro ao carregar candidaturas:", err);
    }
}

carregarCandidaturas();
