const { PrismaClient } = require('@prisma/client');
const { enviarEmail } = require('../services/emailService');

const prisma = new PrismaClient();

async function crearMembresia(req, res, next) {
  try {
    const { nombre, email, telefono, plan } = req.body;

    const membresia = await prisma.membresia.create({
      data: { nombre, email, telefono, plan },
    });

    await enviarEmail({
      to: process.env.EMAIL_DUENO || 'dueno@rcarena.local',
      subject: `Nuevo interesado en membresía (${plan}): ${nombre}`,
      template: 'notificacion-dueno.html',
      variables: {
        nombre: membresia.nombre,
        email: membresia.email,
        telefono: membresia.telefono,
        fecha: new Date().toLocaleDateString('es-CL'),
        horario: '—',
        tier: `Membresía ${membresia.plan}`,
        personas: '—',
        mensaje: 'Nuevo interesado en membresía, contactar para más detalles.',
      },
    });

    res.status(201).json({ membresia });
  } catch (error) {
    next(error);
  }
}

module.exports = { crearMembresia };
