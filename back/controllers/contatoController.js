const { Contato } = require("../models");

module.exports = {
 enviar: async (req, res) => {
 try {
 const mensagem = await Contato.create(req.body);
 res.status(201).json(mensagem);
 } catch (err) {
             // 🛠️ CRÍTICO: Retorna 400 para erros de validação
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({ 
                    error: "Dados inválidos ou incompletos no formulário.",
                    details: err.errors.map(e => e.message)
                });
            }
 res.status(500).json({ error: "Erro interno no servidor." });
 }
 },

 listar: async (req, res) => {
 try {
            const lista = await Contato.findAll();
 res.json(lista);
        } catch (err) {
            res.status(500).json({ error: "Erro ao listar contatos." });
        }
 }
};