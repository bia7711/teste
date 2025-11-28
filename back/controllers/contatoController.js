const { Contato } = require("../models");

module.exports = {
    async enviar(req, res) {
        try {
            const mensagem = await Contato.create(req.body);
            res.status(201).json(mensagem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async listar(req, res) {
        const lista = await Contato.findAll();
        res.json(lista);
    }
};
