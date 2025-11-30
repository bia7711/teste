const { Perfil, Voluntario } = require("../models");

module.exports = {
 listar: async (req, res) => {
 try {
  const dados = await Perfil.findAll({ 
  include: [{
   model: Voluntario,
   attributes: { exclude: ['senha'] } // 🔒 Excluir senha
  }] 
  });
  res.json(dados);
 } catch (err) {
  res.status(500).json({ error: "Erro ao listar perfis." });
 }
 },

 criar: async (req, res) => {
 try {
  const novo = await Perfil.create(req.body);
  res.status(201).json(novo);
 } catch (err) {
             // Retorna 400 para erros de validação
            if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: "Dados inválidos ou perfil duplicado." });
            }
  res.status(500).json({ error: "Erro ao criar perfil." });
 }
 },

 buscar: async (req, res) => {
 try {
  const dado = await Perfil.findByPk(req.params.id, { 
  include: [{
   model: Voluntario,
   attributes: { exclude: ['senha'] } // 🔒 Excluir senha
  }]
  });
  res.json(dado);
 } catch (err) {
  res.status(500).json({ error: "Erro ao buscar perfil." });
 }
 },

 atualizar: async (req, res) => {
 try {
  const dado = await Perfil.findByPk(req.params.id);
  if (!dado) return res.status(404).json({ error: "Não encontrado" });
  await dado.update(req.body);
  res.json(dado);
 } catch (err) {
  res.status(400).json({ error: "Erro ao atualizar perfil." });
 }
 },

 deletar: async (req, res) => {
 try {
  const dado = await Perfil.findByPk(req.params.id);
  await dado.destroy();
  res.json({ message: "Deletado" });
 } catch (err) {
  res.status(500).json({ error: "Erro ao deletar perfil." });
 }
 }
};