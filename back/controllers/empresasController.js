const { Empresas } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// Chave Secreta para o JWT (MUDAR ISTO PARA UMA VARIÁVEL DE AMBIENTE REAL!)
const JWT_SECRET = 'sua_chave_secreta_aqui_e_muito_longa'; 

module.exports = {
    // --- Rota de Cadastro de Empresa ---
    criar: async (req, res) => {
        const { email, senha, ...outrosCampos } = req.body;

        const empresaExistente = await Empresas.findOne({ where: { email } });
        if (empresaExistente) {
            return res.status(409).json({ error: "Este e-mail já está cadastrado." });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        try {
            const novaEmpresa = await Empresas.create({
                email,
                senha: senhaHash,
                ...outrosCampos 
            });
            
            const { senha: _, ...empresaSemSenha } = novaEmpresa.toJSON();
            res.status(201).json({ 
                mensagem: "Cadastro de empresa realizado com sucesso!",
                empresa: empresaSemSenha
            });

        } catch (error) {
            console.error("Erro ao cadastrar empresa:", error);
            res.status(500).json({ error: "Erro interno no servidor ao cadastrar." });
        }
    },

    // --- Rota de Login de Empresa (Nova) ---
    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            // 1. Busca a empresa pelo e-mail
            const empresa = await Empresas.findOne({ where: { email } });
            
            if (!empresa) {
                return res.status(401).json({ error: "E-mail ou senha incorretos." });
            }

            // 2. Compara a senha fornecida com o hash armazenado
            const senhaValida = await bcrypt.compare(senha, empresa.senha);

            if (!senhaValida) {
                return res.status(401).json({ error: "E-mail ou senha incorretos." });
            }

            // 3. Gera o JWT (Token de Autenticação)
            const token = jwt.sign(
                { id: empresa.id, email: empresa.email, tipo: 'empresa' }, 
                JWT_SECRET, 
                { expiresIn: '1d' } // Expira em 1 dia
            );

            // 4. Retorna o token e os dados da empresa (sem senha)
            const { senha: _, ...empresaSemSenha } = empresa.toJSON();
            
            res.json({ 
                mensagem: "Login realizado com sucesso!",
                token,
                empresa: empresaSemSenha
            });

        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    },
    
    // --- Rotas CRUD Existentes ---
    listar: async (_, res) => res.json(await Empresas.findAll()),

    buscar: async (req, res) => {
        const dado = await Empresas.findByPk(req.params.id);
        res.json(dado);
    },

    atualizar: async (req, res) => {
        const dado = await Empresas.findByPk(req.params.id);
        await dado.update(req.body);
        res.json(dado);
    },

    deletar: async (req, res) => {
        const dado = await Empresas.findByPk(req.params.id);
        await dado.destroy();
        res.json({ message: "Deletado" });
    }
};