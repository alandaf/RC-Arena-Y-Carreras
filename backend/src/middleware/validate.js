const { z } = require('zod');

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalles: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
}

const reservaSchema = z.object({
  nombre: z.string().min(2, 'El nombre es muy corto').max(120),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(6, 'Teléfono inválido').max(30),
  fecha: z.coerce.date({ errorMap: () => ({ message: 'Fecha inválida' }) }),
  horario: z.string().min(1, 'Selecciona un horario'),
  tier: z.enum(['sesion-individual', 'pack-familiar', 'membresia'], {
    errorMap: () => ({ message: 'Tier inválido' }),
  }),
  personas: z.coerce.number().int().min(1).max(20),
  mensaje: z.string().max(1000).optional().nullable(),
});

const contactoSchema = z.object({
  nombre: z.string().min(2).max(120),
  email: z.string().email('Email inválido'),
  asunto: z.string().min(2).max(200),
  mensaje: z.string().min(5).max(2000),
  tipo: z.enum(['general', 'b2b']).default('general'),
  empresa: z.string().max(200).optional().nullable(),
});

const membresiaSchema = z.object({
  nombre: z.string().min(2).max(120),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(6).max(30),
  plan: z.enum(['mensual', 'trimestral', 'anual']),
});

module.exports = {
  validate,
  reservaSchema,
  contactoSchema,
  membresiaSchema,
};
