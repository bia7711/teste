// routes/voluntarioRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/voluntarioController");
const authMiddleware = require("../middlewares/authMiddleware");

// Cadastro e login
router.post("/", controller.criar);
router.post("/login", controller.login);

// CRUD básico
router.get("/", controller.listar);
router.get("/:id", controller.buscar);

// Perfil do voluntário (protegido)
router.get("/perfil/me", authMiddleware, controller.perfil);

// Inscrever em ação (protegido)
router.post("/acoes/:id/inscrever", authMiddleware, controller.inscrever);

module.exports = router;
