const express = require("express");
const router = express.Router();
const controller = require("../controllers/funcionario.controller");

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);

module.exports = router;