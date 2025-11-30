const { Voluntario } = require("../models"); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// 🔑 Lê a chave secreta do seu arquivo .env
const JWT_SECRET = process.env.JWT_SECRET; 

// Função auxiliar para calcular a idade (Certifique-se de que esta função está no seu arquivo)
function calcularIdade(dataNascimento) {
    const dataNasc = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }
    return idade;
}

module.exports = {
    // --- LOGIN ---
    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const voluntario = await Voluntario.findOne({ where: { email } });
            if (!voluntario) {
                return res.status(401).json({ error: "E-mail ou senha incorretos." });
            }

            const senhaValida = await bcrypt.compare(senha, voluntario.senha);
            if (!senhaValida) {
                return res.status(401).json({ error: "E-mail ou senha incorretos." });
            }

            // Gera o JWT
            const token = jwt.sign(
                { id: voluntario.id_voluntario, email: voluntario.email, tipo: 'voluntario' }, 
                JWT_SECRET, 
                { expiresIn: '1d' }
            );

            // Retorna o token e dados (sem senha)
            const { senha: _, ...voluntarioSemSenha } = voluntario.toJSON();
            res.json({ 
                mensagem: "Login realizado com sucesso!",
                token,
                voluntario: voluntarioSemSenha
            });

        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    },
    
    // --- CRIAR / CADASTRO ---
    criar: async (req, res) => {
        const { nome, sobrenome, email, senha, cpf, data_nascimento } = req.body;

        try {
            // 1. Validação de Idade (Mínimo 18 anos)
            if (calcularIdade(data_nascimento) < 18) {
                return res.status(400).json({ error: "O voluntário deve ter no mínimo 18 anos." });
            }

            // 2. Verifica se o e-mail ou CPF já estão cadastrados
            const voluntarioExistente = await Voluntario.findOne({
                where: { [Voluntario.sequelize.Op.or]: [{ email }, { cpf }] }
            });

            if (voluntarioExistente) {
                const campo = voluntarioExistente.email === email ? 'E-mail' : 'CPF';
                return res.status(409).json({ error: `${campo} já cadastrado.` });
            }

            // 3. Criptografa a senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // 4. Cria o voluntário
            const novoVoluntario = await Voluntario.create({
                nome,
                sobrenome,
                email,
                senha: senhaHash,
                cpf,
                data_nascimento
            });

            // 5. Retorna sucesso (sem a senha)
            const { senha: _, ...voluntarioCriado } = novoVoluntario.toJSON();
            return res.status(201).json({ 
                mensagem: "Cadastro realizado com sucesso!",
                voluntario: voluntarioCriado
            });

        } catch (error) {
            console.error("Erro no cadastro:", error);
            // Captura erros de validação do Sequelize (se houver)
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: error.errors.map(e => e.message) });
            }
            return res.status(500).json({ error: "Erro interno no servidor ao cadastrar." });
        }
    },

    // --- LISTAR (Função que estava faltando) ---
    listar: async (req, res) => {
        try {
            // Não retorna a senha!
            const voluntarios = await Voluntario.findAll({ attributes: { exclude: ['senha'] } });
            return res.json(voluntarios);
        } catch (error) {
            console.error("Erro ao listar voluntários:", error);
            return res.status(500).json({ error: "Erro interno ao listar voluntários." });
        }
    },

    // --- BUSCAR POR ID (Função que estava faltando) ---
    buscar: async (req, res) => {
        const { id } = req.params;
        try {
            const voluntario = await Voluntario.findByPk(id, { attributes: { exclude: ['senha'] } });
            if (!voluntario) {
                return res.status(404).json({ error: "Voluntário não encontrado." });
            }
            return res.json(voluntario);
        } catch (error) {
            console.error("Erro ao buscar voluntário:", error);
            return res.status(500).json({ error: "Erro interno ao buscar voluntário." });
        }
    },
    
    // --- ATUALIZAR (Placeholder) ---
    atualizar: async (req, res) => {
        // Implemente a lógica de atualização aqui
        res.status(501).json({ mensagem: "Função de atualização não implementada." });
    },

    // --- DELETAR (Placeholder) ---
    deletar: async (req, res) => {
        // Implemente a lógica de exclusão aqui
        res.status(501).json({ mensagem: "Função de exclusão não implementada." });
    }
};