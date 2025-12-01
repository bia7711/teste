
const form = document.getElementById("contactForm");
const formularioContato = document.getElementById("formularioContato");
const msgSucesso = document.getElementById("mensagemSucesso");
const msgErro = document.getElementById("mensagemErro");

// 👉 Função: voltar para o formulário (sucesso)
function novaMensagem() {
  msgSucesso.style.display = "none";
  formularioContato.style.display = "block";
}

// 👉 Função: voltar para o formulário (erro)
function tentarNovamente() {
  msgErro.style.display = "none";
  formularioContato.style.display = "block";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Esconde mensagens antigas
  msgSucesso.style.display = "none";
  msgErro.style.display = "none";

  const data = {
    nome: form.nome.value,
    sobrenome: form.sobrenome.value,
    email: form.email.value,
    mensagem: form.mensagem.value
  };

  try {
    const response = await fetch("http://localhost:3001/api/contatos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      formularioContato.style.display = "none";
      msgErro.style.display = "none";
      msgSucesso.style.display = "block";
      form.reset();
    } else {
      formularioContato.style.display = "none";
      msgSucesso.style.display = "none";
      msgErro.style.display = "block";
    }

  } catch (err) {
    formularioContato.style.display = "none";
    msgSucesso.style.display = "none";
    msgErro.style.display = "block";
  }
});
