// Arquivo: back/models/usuarios.js

// --- BLOCO DE CONEXÃO DESATIVADO TEMPORARIAMENTE ---
// COMENTE as linhas que fazem a importação do driver de banco de dados
// e a conexão real. Isso impede o erro de conexão no servidor Node.js
// sem ter que apagar o código de banco permanentemente.
// ----------------------------------------------------

// const db = require('../config/database'); // <--- Comente esta linha para não carregar a conexão
let mockDatabase = []; // VAI CONTINUAR SENDO USADO TEMPORARIAMENTE
let nextId = 1;      // VAI CONTINUAR SENDO USADO TEMPORARIAMENTE


// Objeto que exporta as funções do modelo
const Usuario = {
    // Simula a busca de um usuário por email OU CPF
    findByEmailOrCpf: async (email, cpf) => {
        
        // --- FUTURA LÓGICA DE BANCO DE DADOS AQUI ---
        // Quando for conectar, o código de query SQL virá aqui.
        // Exemplo: return db.execute('SELECT * FROM usuarios WHERE email = ? OR cpf = ?', [email, cpf]);
        // --------------------------------------------
        
        // Versão MOCK (Temporária para evitar erro 500):
        const user = mockDatabase.find(u => u.email === email || u.cpf === cpf);
        return user;
    },

    // Simula a criação de um novo usuário
    create: async (nome, sobrenome, email, senhaHash, cpf) => {
        
        // --- FUTURA LÓGICA DE BANCO DE DADOS AQUI ---
        // Quando for conectar, o código de query SQL virá aqui.
        // Exemplo: const [result] = await db.execute('INSERT INTO usuarios ...');
        // --------------------------------------------
        
        // Versão MOCK (Temporária para evitar erro 500):
        const novoUsuario = {
            id: nextId++,
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senhaHash: senhaHash,
            cpf: cpf,
            dataCriacao: new Date()
        };

        mockDatabase.push(novoUsuario);
        return novoUsuario;
    }
};

module.exports = Usuario;