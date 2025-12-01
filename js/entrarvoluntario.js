document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const termos = document.getElementById("termos").checked;
    const feedback = document.getElementById("mensagemFeedback");

    // ---------------------------
    // VALIDAR TERMOS
    // ---------------------------
    if (!termos) {
        feedback.innerHTML = "Você precisa aceitar os termos para continuar.";
        feedback.style.color = "red";
        return;
    }

    // ---------------------------
    // MONTAR OBJETO
    // ---------------------------
    const dados = { email, senha };

    try {
        const response = await fetch("http://localhost:3001/api/voluntarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (!response.ok) {
            feedback.innerHTML = result.error || "Email ou senha incorretos.";
            feedback.style.color = "red";
            return;
        }

        // ---------------------------
        // SALVAR TOKEN
        // ---------------------------
        localStorage.setItem("token_voluntario", result.token);
        localStorage.setItem("voluntario", JSON.stringify(result.voluntario));

        feedback.innerHTML = "Login realizado com sucesso! Redirecionando...";
        feedback.style.color = "green";

        setTimeout(() => {
            window.location.href = "./perfil.html";
        }, 1500);

    } catch (error) {
        console.error("Erro no login:", error);
        feedback.innerHTML = "Erro de conexão com o servidor.";
        feedback.style.color = "red";
    }
});
