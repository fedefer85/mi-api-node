const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "mi_api",
//   password: "NO-EXPONER-PASSWORD-DE-POSTGRES",
//   port: 5433 // 👈 tu puerto
// });

// modificado para no hardcodear credenciales
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// MODIFICADO para usar en RENDER menos variables de environmet
const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: {
rejectUnauthorized: false
}
});

module.exports = pool;




// console.log("PASSWORD:", process.env.DB_PASSWORD);