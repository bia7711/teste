const formLogin = document.getElementById("loginEmpresaForm");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const termos = document.getElementById("termos").checked;

    if (!termos) {
        alert("Você deve concordar com os Termos.");
        return;
    }

    const dados = { email, senha };

    try {
        const resposta = await fetch("http://localhost:3001/api/empresas/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const result = await resposta.json();

        if (!resposta.ok) {
            alert(result.error || "Erro ao fazer login.");
            return;
        }

        // Salva token e dados da empresa no navegador
        localStorage.setItem("token_empresa", result.token);
        localStorage.setItem("empresa", JSON.stringify(result.empresa));

        alert("Login realizado com sucesso!");
        window.location.href = "./empresas.html";

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao conectar ao servidor.");
    }
});
