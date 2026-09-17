const express = require('express');
const { validate, contactoSchema } = require('../middleware/validate');
const { crearContacto } = require('../controllers/contactoController');

module.exports = function contactoRouter(formLimiter) {
  const router = express.Router();

  router.post('/', formLimiter, validate(contactoSchema), crearContacto);

  return router;
};
