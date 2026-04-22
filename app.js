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

// esto lo modifico cuando paso a etapa de DEPLOY en la web
// app.listen(3000, () => {
//   console.log("Servidor corriendo en http://localhost:3000");
// });

// para DEPLOY en render:
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// agregado para el errorHandler
const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);