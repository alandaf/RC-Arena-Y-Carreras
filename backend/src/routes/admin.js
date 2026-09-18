const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const {
  login,
  listarReservas,
  actualizarEstadoReserva,
  listarContactos,
  marcarContactoLeido,
  listarMembresias,
} = require('../controllers/adminController');

module.exports = function adminRouter(loginLimiter) {
  const router = express.Router();

  router.post('/login', loginLimiter, login);

  router.get('/reservas', requireAdmin, listarReservas);
  router.patch('/reservas/:id', requireAdmin, actualizarEstadoReserva);

  router.get('/contactos', requireAdmin, listarContactos);
  router.patch('/contactos/:id', requireAdmin, marcarContactoLeido);

  router.get('/membresias', requireAdmin, listarMembresias);

  return router;
};
