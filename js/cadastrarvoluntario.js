document.getElementById("formCadastro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const cpf = document.getElementById("cpf").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const data_nascimento = document.getElementById("data_nascimento").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;
    const termos = document.getElementById("termos").checked;

    const feedback = document.getElementById("mensagemFeedback");

    // ------------------------------
    // VALIDAR CPF
    // ------------------------------
    if (!validarCPF(cpf)) {
        feedback.innerHTML = "CPF inválido.";
        feedback.style.color = "red";
        return;
    }

    // ------------------------------
    // VALIDAR SENHA
    // ------------------------------
    if (senha.length < 6) {
        feedback.innerHTML = "A senha deve ter pelo menos 6 caracteres.";
        feedback.style.color = "red";
        return;
    }

    if (senha !== confirmaSenha) {
        feedback.innerHTML = "As senhas não coincidem.";
        feedback.style.color = "red";
        return;
    }

    // ------------------------------
    // VALIDAR TERMOS
    // ------------------------------
    if (!termos) {
        feedback.innerHTML = "Você precisa aceitar os termos.";
        feedback.style.color = "red";
        return;
    }

    // ------------------------------
    // MONTAR OBJETO PARA O BACKEND
    // ------------------------------
    const dados = {
        cpf,
        nome,
        sobrenome,
        email,
        senha,
        telefone: telefone || null,
        endereco: endereco || null,
        data_nascimento
    };

    try {
        const response = await fetch("http://localhost:3001/api/voluntarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (response.ok) {
            feedback.innerHTML = "Conta criada com sucesso! Redirecionando...";
            feedback.style.color = "green";

            setTimeout(() => {
                window.location.href = "./entrar.html";
            }, 1500);
        } else {
            feedback.innerHTML = result.error || "Erro ao cadastrar.";
            feedback.style.color = "red";
        }

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        feedback.innerHTML = "Erro de conexão com o servidor.";
        feedback.style.color = "red";
    }
});


// --------------------------------------------------
// FUNÇÃO DE VALIDAÇÃO DE CPF
// --------------------------------------------------
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
}
