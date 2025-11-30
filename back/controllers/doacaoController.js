const { Doacao, Pagamento, TipoPagamento } = require("../models");

module.exports = {
 criar: async (req, res) => {
  try {
    const nova = await Doacao.create(req.body);
    console.log(req.body)
    res.status(201).json(nova);
  } catch (err) {
 console.error("Erro ao criar Doação:", err);
             // 🛠️ CRÍTICO: Retorna 400 para erros de validação (dados do usuário)
 if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ 
        message: "Dados inválidos ou incompletos. Verifique o formulário.",
        errors: err.errors.map(e => e.message)
        });
    }
    // Retorna 500 para erros internos (DB)
 res.status(500).json({ 
  message: "Erro interno do servidor ao salvar doação.", 
  errorDetails: err.message
 });
  }
 },

 listar: async (req, res) => {
  const lista = await Doacao.findAll({
 include: [
  { model: Pagamento, include: [TipoPagamento] }
 ]
  });
  res.json(lista);
 }
};