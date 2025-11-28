const { Empresas } = require("../models");

module.exports = {
    listar: async (_, res) => res.json(await Empresas.findAll()),

    criar: async (req, res) => {
        const novo = await Empresas.create(req.body);
        res.status(201).json(novo);
    },

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
