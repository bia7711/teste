const { Voluntario } = require("../models"); // Ajuste o caminho se necessário

module.exports = {

  // Listar todos os voluntários
  listar: async (req, res) => {
    try {
      const voluntarios = await Voluntario.findAll();
      res.json(voluntarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Criar um novo voluntário
  criar: async (req, res) => {
    try {
      const novoVoluntario = await Voluntario.create(req.body);
      res.status(201).json(novoVoluntario);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Buscar um voluntário pelo ID
  buscar: async (req, res) => {
    try {
      const voluntario = await Voluntario.findByPk(req.params.id);
      if (!voluntario) return res.status(404).json({ error: "Voluntário não encontrado" });
      res.json(voluntario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualizar um voluntário
  atualizar: async (req, res) => {
    try {
      const voluntario = await Voluntario.findByPk(req.params.id);
      if (!voluntario) return res.status(404).json({ error: "Voluntário não encontrado" });

      await voluntario.update(req.body);
      res.json(voluntario);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Deletar um voluntário
  deletar: async (req, res) => {
    try {
      const voluntario = await Voluntario.findByPk(req.params.id);
      if (!voluntario) return res.status(404).json({ error: "Voluntário não encontrado" });

      await voluntario.destroy();
      res.json({ message: "Voluntário deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
