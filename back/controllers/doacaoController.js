const { Doacao, Pagamento, TipoPagamento } = require("../models");

module.exports = {
    async criar(req, res) {
        try {
            const nova = await Doacao.create(req.body);
            res.status(201).json(nova);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async listar(req, res) {
        const lista = await Doacao.findAll({
            include: [
                { model: Pagamento, include: [TipoPagamento] }
            ]
        });
        res.json(lista);
    }
};
