const express = require("express");
const router = express.Router();
const controller = require("../controllers/doacaoController");

router.post("/", controller.criar);
router.get("/", controller.listar);

module.exports = router;
