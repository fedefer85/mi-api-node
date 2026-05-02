const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    //const decoded = jwt.verify(token, process.env.JWT_SECRET) || "secreto_local";
    const decoded = jwt.verify(token, "secreto_local");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = authMiddleware;