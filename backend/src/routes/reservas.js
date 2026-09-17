const express = require('express');
const { validate, reservaSchema } = require('../middleware/validate');
const {
  crearReserva,
  obtenerDisponibilidad,
} = require('../controllers/reservasController');

module.exports = function reservasRouter(formLimiter) {
  const router = express.Router();

  router.post('/', formLimiter, validate(reservaSchema), crearReserva);
  router.get('/disponibilidad', obtenerDisponibilidad);

  return router;
};
