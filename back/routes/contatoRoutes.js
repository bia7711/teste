const express = require("express");
const router = express.Router();
const controller = require("../controllers/contatoController");

router.post("/", controller.enviar);
router.get("/", controller.listar);

module.exports = router;
