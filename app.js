// agregado para no hardcodear credenciales
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

// importar rutas
const usuariosRoutes = require("./routes/usuariosRoutes");

// usar rutas
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});
//

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

// agregado para el errorHandler
const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);