const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');
const authMiddleware = require('../middlewares/authMiddleware');

// 🔑 Rota protegida: retorna os dados do voluntário logado
router.get('/me', authMiddleware, perfilController.me);

module.exports = router;
