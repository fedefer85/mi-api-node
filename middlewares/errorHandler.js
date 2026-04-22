const errorHandler = (err, req, res, next) => {
  console.log("💥 Error:", err);

  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor"
  });
};

module.exports = errorHandler;