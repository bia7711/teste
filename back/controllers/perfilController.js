const { Perfil, Voluntario } = require("../models");

module.exports = {
    listar: async (req, res) => {
        const dados = await Perfil.findAll({ include: [Voluntario] });
        res.json(dados);
    },

    criar: async (req, res) => {
        const novo = await Perfil.create(req.body);
        res.status(201).json(novo);
    },

    buscar: async (req, res) => {
        const dado = await Perfil.findByPk(req.params.id, { include: [Voluntario] });
        res.json(dado);
    },

    atualizar: async (req, res) => {
        const dado = await Perfil.findByPk(req.params.id);
        if (!dado) return res.status(404).json({ error: "Não encontrado" });

        await dado.update(req.body);
        res.json(dado);
    },

    deletar: async (req, res) => {
        const dado = await Perfil.findByPk(req.params.id);
        await dado.destroy();
        res.json({ message: "Deletado" });
    }
};
