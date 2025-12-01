// 1. Verificar autenticação
const token = localStorage.getItem("token_empresa");
const empresaData = localStorage.getItem("empresa");

if (!token || !empresaData) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "./entrarempresa.html";
}

const empresa = JSON.parse(empresaData);

// 2. Preencher dados no HTML
document.getElementById("empresaNome").textContent = empresa.nome_empresa;
document.getElementById("empresaCnpj").textContent = empresa.cnpj;
document.getElementById("empresaEmail").textContent = empresa.email;
document.getElementById("empresaTelefone").textContent = empresa.telefone || "Não informado";
document.getElementById("empresaEndereco").textContent = empresa.endereco_comercial || "Não informado";
