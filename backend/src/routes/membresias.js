const express = require('express');
const { validate, membresiaSchema } = require('../middleware/validate');
const { crearMembresia } = require('../controllers/membresiaController');

module.exports = function membresiasRouter(formLimiter) {
  const router = express.Router();

  router.post('/', formLimiter, validate(membresiaSchema), crearMembresia);

  return router;
};
