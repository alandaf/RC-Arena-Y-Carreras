function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err);

  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Registro duplicado' });
  }

  if (err.code === 'P2034') {
    return res.status(409).json({ error: 'Ese horario se acaba de ocupar, intenta con otro.' });
  }

  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Error interno del servidor'
      : err.message || 'Error interno del servidor';

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
