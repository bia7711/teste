const express = require("express");
const router = express.Router();
// ✅ CORREÇÃO: Usando 'empresasController' para corresponder ao nome do arquivo
const EmpresaController = require("../controllers/empresasController"); 

router.get("/", EmpresaController.listar);
router.post("/", EmpresaController.criar); 
router.post("/login", EmpresaController.login); // 🔑 Rota de Login
router.get("/:id", EmpresaController.buscar);
router.put("/:id", EmpresaController.atualizar);
router.delete("/:id", EmpresaController.deletar);

module.exports = router;