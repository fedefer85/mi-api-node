const express = require("express");
const router = express.Router();

// argegado para middleware
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuariosController");

// Definición de rutas
// router.get("/", getUsuarios);
// router.post("/", crearUsuario);
// router.put("/:id", actualizarUsuario);
// router.delete("/:id", eliminarUsuario);

// nuevas rutas incluyendo el middleware de Auth
router.get("/", authMiddleware, getUsuarios);
// router.post("/", authMiddleware, crearUsuario);
router.post("/", crearUsuario); // esta linea es temporal para probar el token
router.put("/:id", authMiddleware, actualizarUsuario);
router.delete("/:id", authMiddleware, eliminarUsuario);

module.exports = router;