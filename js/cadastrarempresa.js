const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const termos = document.getElementById("termos");
    if (!termos.checked) {
        alert("Você precisa concordar com os Termos.");
        return;
    }

    const data = {
        nome_empresa: document.getElementById("nomeEmpresa").value,
        cnpj: document.getElementById("cnpj").value,
        endereco_comercial: document.getElementById("endereco").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("password").value,
    };
    const confirmaSenha = document.getElementById("confirm_password").value;
    if (data.senha !== confirmaSenha) {
        console.log(data.senha, confirmaSenha);
        alert("As senhas não coincidem!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3001/api/empresas/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Empresa cadastrada com sucesso!");
            form.reset();
        } else {
            alert("Erro ao cadastrar: " + (result.error || "Verifique os dados"));
        }

    } catch (err) {
        alert("Erro ao se conectar com o servidor.");
        console.error(err);
    }
});
