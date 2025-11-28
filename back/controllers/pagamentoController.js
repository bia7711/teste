const { Pagamento, TipoPagamento } = require("../models");

module.exports = {
    listar: async (_, res) => {
        const dados = await Pagamento.findAll({ include: [TipoPagamento] });
        res.json(dados);
    },

    criar: async (req, res) => {
        const novo = await Pagamento.create(req.body);
        res.status(201).json(novo);
    },

    buscar: async (req, res) => {
        const dado = await Pagamento.findByPk(req.params.id, {
            include: [TipoPagamento]
        });
        res.json(dado);
    },

    atualizar: async (req, res) => {
        const dado = await Pagamento.findByPk(req.params.id);
        await dado.update(req.body);
        res.json(dado);
    },

    deletar: async (req, res) => {
        const dado = await Pagamento.findByPk(req.params.id);
        await dado.destroy();
        res.json({ message: "Deletado" });
    }
};
