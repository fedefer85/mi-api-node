const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let usuarios = [
  { id: 1, nombre: "Fede" },
  { id: 2, nombre: "Ana" }
];

// GET anterior
// const getUsuarios = (req, res) => {
//   console.log("GET /usuarios");
//   res.json(usuarios);
// };

// GET nuevo para base de datos con POSTGRES
const getUsuarios = async (req, res) => {
  console.log("GET /usuarios desde DB");

  try {
    // const result = await pool.query("SELECT * FROM usuarios");
    // const result = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");
    const result = await pool.query("SELECT id, nombre FROM usuarios ORDER BY id ASC");
    console.log("Resultado DB:", result.rows);

    res.json(result.rows);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
}; 

// POST anterior
// const crearUsuario = (req, res) => {
//   console.log("POST /usuarios");
//   console.log("Body:", req.body);

//   const { nombre } = req.body;

//   if (!nombre || nombre.trim() === "") {
//     return res.status(400).json({
//       error: "El nombre es obligatorio"
//     });
//   }

//   const nuevoUsuario = {
//     id: usuarios.length + 1,
//     nombre
//   };

//   usuarios.push(nuevoUsuario);

//   res.status(201).json({
//     mensaje: "Usuario creado",
//     usuario: nuevoUsuario
//   });
// };

// POST nuevo con POSTGRES
// const crearUsuario = async (req, res) => {
//   console.log("POST /usuarios");

//   const { nombre } = req.body;
//   console.log("Body recibido:", req.body);

//   // Validación
//   if (!nombre || nombre.trim() === "") {
//     console.log("❌ Nombre inválido");

//     // return res.status(400).json({
//     //   error: "El nombre es obligatorio"
//     // });

//     // escrito mas profesionalmente:
//     throw { status: 400, message: "El nombre es obligatorio" };
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO usuarios (nombre) VALUES ($1) RETURNING *",
//       [nombre]
//     );

//     console.log("✅ Usuario creado en DB:", result.rows[0]);

//     res.status(201).json({
//       mensaje: "Usuario creado",
//       usuario: result.rows[0]
//     });
//   } catch (error) {
//     console.log("❌ ERROR:", error);
//     res.status(500).json({
//       error: "Error del servidor"
//     });
//   }
// };

// POST nuevo con POSTGRES + PASSWORD
// const bcrypt = require("bcrypt");

const crearUsuario = async (req, res) => {
  console.log("POST /usuarios");

  const { nombre, password } = req.body;
  console.log("Body recibido:", req.body);

  // Validación
  if (!nombre || nombre.trim() === "") {
    throw { status: 400, message: "El nombre es obligatorio" };
  }

  if (!password || password.trim() === "") {
    throw { status: 400, message: "La contraseña es obligatoria" };
  }

  try {
    // 🔐 HASH DEL PASSWORD
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nombre, password) VALUES ($1, $2) RETURNING id, nombre",
      [nombre, hash]
    );

    console.log("✅ Usuario creado en DB:", result.rows[0]);

    res.status(201).json({
      mensaje: "Usuario creado",
      usuario: result.rows[0]
    });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({
      error: "Error del servidor"
    });
  }
};

// PUT anterior
// const actualizarUsuario = (req, res) => {
//   console.log("PUT /usuarios/:id");

//   const id = parseInt(req.params.id);
//   const { nombre } = req.body;

//   const usuario = usuarios.find(u => u.id === id);

//   if (!usuario) {
//     return res.status(404).json({
//       error: "Usuario no encontrado"
//     });
//   }

//   if (!nombre || nombre.trim() === "") {
//     return res.status(400).json({
//       error: "El nombre es obligatorio"
//     });
//   }

//   usuario.nombre = nombre;

//   res.json({
//     mensaje: "Usuario actualizado",
//     usuario
//   });
// };

// PUT nuevo para POSTGRES
const actualizarUsuario = async (req, res) => {
  console.log("PUT /usuarios/:id");

  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  console.log("ID:", id);
  console.log("Body:", req.body);

  // Validación
  if (!nombre || nombre.trim() === "") {
    
    // return res.status(400).json({
    //   error: "El nombre es obligatorio"
    // });

    // escrito mas profesionalmente:
    throw { status: 400, message: "El nombre es obligatorio" };
  }

  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1 WHERE id = $2 RETURNING *",
      [nombre, id]
    );

    console.log("Resultado DB:", result.rows);

    // Si no encontró usuario
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario actualizado",
      usuario: result.rows[0]
    });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({
      error: "Error del servidor"
    });
  }
};

// DELETE anterior
// const eliminarUsuario = (req, res) => {
//   console.log("DELETE /usuarios/:id");

//   const id = parseInt(req.params.id);

//   const index = usuarios.findIndex(u => u.id === id);

//   if (index === -1) {
//     return res.status(404).json({
//       error: "Usuario no encontrado"
//     });
//   }

//   usuarios.splice(index, 1);

//   res.json({
//     mensaje: "Usuario eliminado"
//   });
// };

// DELETE nuevo para Postgres
const eliminarUsuario = async (req, res) => {
  console.log("DELETE /usuarios/:id");

  const id = parseInt(req.params.id);
  console.log("ID:", id);

  try {
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );

    console.log("Resultado DB:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario eliminado",
      usuario: result.rows[0]
    });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({
      error: "Error del servidor"
    });
  }
};

// creamos el LOGIN
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const login = async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE nombre = $1",
      [nombre]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    if (!user.password) {
      return res.status(500).json({ error: "Usuario sin password en DB" });
    }
    
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Password incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, nombre: user.nombre },
      //process.env.JWT_SECRET || "secreo_local",
      "secreto_local",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    console.log("❌ ERROR LOGIN:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  login
};