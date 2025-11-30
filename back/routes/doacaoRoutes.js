// back/routes/doacaoRoutes.js

const express = require('express');
const router = express.Router();
const doacaoController = require('../controllers/doacaoController');

// Rota AGORA PÚBLICA: Não exige Token JWT
router.post('/', doacaoController.criar); // ⬅️ authMiddleware REMOVIDO

module.exports = router;