// controllers/voluntarioController.js
const { Voluntario, Acoes, Inscricao } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function calcularIdade(dataNascimento) {
    const dataNasc = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) idade--;
    return idade;
}

module.exports = {
    criar: async (req, res) => {
        const { nome, sobrenome, cpf, email, senha, data_nascimento, telefone, endereco } = req.body;

        if (calcularIdade(data_nascimento) < 18) {
            return res.status(400).json({ error: "O voluntário deve ter no mínimo 18 anos." });
        }

        try {
            const voluntarioExistente = await Voluntario.findOne({
            where: { [Op.or]: [{ email }, { cpf }] }
            });


            if (voluntarioExistente) {
                const campo = voluntarioExistente.email === email ? 'E-mail' : 'CPF';
                return res.status(409).json({ error: `${campo} já cadastrado.` });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const novoVoluntario = await Voluntario.create({
                nome,
                sobrenome,
                cpf,
                email,
                senha: senhaHash,
                data_nascimento,
                telefone,
                endereco
            });

            const { senha: _, ...voluntarioCriado } = novoVoluntario.toJSON();
            return res.status(201).json({
                mensagem: "Cadastro realizado com sucesso!",
                voluntario: voluntarioCriado
            });

        } catch (error) {
            console.error("Erro no cadastro:", error);
            return res.status(500).json({ error: "Erro interno no servidor ao cadastrar." });
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const voluntario = await Voluntario.findOne({ where: { email } });
            if (!voluntario) return res.status(401).json({ error: "E-mail ou senha incorretos." });

            const senhaValida = await bcrypt.compare(senha, voluntario.senha);
            if (!senhaValida) return res.status(401).json({ error: "E-mail ou senha incorretos." });

            const token = jwt.sign(
                { id: voluntario.id_voluntario, email: voluntario.email },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            const { senha: _, ...voluntarioSemSenha } = voluntario.toJSON();
            res.json({ mensagem: "Login realizado com sucesso!", token, voluntario: voluntarioSemSenha });

        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    },

    listar: async (req, res) => {
        try {
            const voluntarios = await Voluntario.findAll({ attributes: { exclude: ['senha'] } });
            res.json(voluntarios);
        } catch (error) {
            console.error("Erro ao listar voluntários:", error);
            res.status(500).json({ error: "Erro interno ao listar voluntários." });
        }
    },

    buscar: async (req, res) => {
        const { id } = req.params;
        try {
            const voluntario = await Voluntario.findByPk(id, { attributes: { exclude: ['senha'] } });
            if (!voluntario) return res.status(404).json({ error: "Voluntário não encontrado." });
            res.json(voluntario);
        } catch (error) {
            console.error("Erro ao buscar voluntário:", error);
            res.status(500).json({ error: "Erro interno ao buscar voluntário." });
        }
    },

    perfil: async (req, res) => {
        try {
            const voluntario = await Voluntario.findByPk(req.voluntarioId, { attributes: { exclude: ['senha'] } });
            if (!voluntario) return res.status(404).json({ error: "Voluntário não encontrado." });

            const acoes_inscritas = await Inscricao.findAll({
                where: { id_voluntario: req.voluntarioId },
                include: [{ model: Acoes }]
            });

            res.json({ ...voluntario.toJSON(), acoes_inscritas });
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            res.status(500).json({ error: "Erro interno ao buscar perfil." });
        }
    },

    inscrever: async (req, res) => {
        const id_acao = req.params.id;
        const id_voluntario = req.voluntarioId;

        try {
            // Verifica se já está inscrito
            const inscricaoExistente = await Inscricao.findOne({ where: { id_voluntario, id_acao } });
            if (inscricaoExistente) {
                return res.status(400).json({ error: "Você já está inscrito nesta ação." });
            }

            const novaInscricao = await Inscricao.create({ id_voluntario, id_acao });
            res.json({ mensagem: "Inscrição realizada com sucesso!", inscricao: novaInscricao });

        } catch (error) {
            console.error("Erro ao inscrever voluntário:", error);
            res.status(500).json({ error: "Erro interno ao realizar inscrição." });
        }
    }
};
