const express = require("express");
const router = express.Router();
const controller = require("../controllers/perfilController");

router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

module.exports = router;
