const express = require("express");
const router = express.Router();
const controller = require("../controllers/voluntarioController");
const authMiddleware = require("../middlewares/authMiddleware"); // 🔑 Se você tiver um middleware para rotas protegidas

router.post("/login", controller.login); // 🔑 CRÍTICO: Rota de Login Adicionada

// Rotas CRUD padrão (Opcional: Proteja-as com authMiddleware)
router.get("/", controller.listar); 
router.post("/", controller.criar); 
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

module.exports = router;