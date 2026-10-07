const { PrismaClient } = require('@prisma/client');
const { enviarEmail } = require('../services/emailService');

const prisma = new PrismaClient();

async function crearContacto(req, res, next) {
  try {
    const { nombre, email, asunto, mensaje, tipo, empresa, telefono } = req.body;

    const contacto = await prisma.contacto.create({
      data: { nombre, email, asunto, mensaje, tipo, empresa },
    });

    await enviarEmail({
      to: contacto.email,
      subject: 'Recibimos tu mensaje — RC Arena & Carreras',
      template: 'auto-respuesta-contacto.html',
      variables: {
        nombre: contacto.nombre,
        asunto: contacto.asunto,
      },
    });

    await enviarEmail({
      to: process.env.EMAIL_DUENO || 'dueno@rcarena.local',
      subject:
        contacto.tipo === 'evento'
          ? `Nueva cotización de evento: ${contacto.asunto}`
          : `Nuevo contacto (${contacto.tipo}): ${contacto.asunto}`,
      template: 'notificacion-contacto.html',
      variables: {
        nombre: contacto.nombre,
        email: contacto.email,
        telefono: telefono || '—',
        fecha: new Date().toLocaleDateString('es-CL'),
        tier:
          contacto.tipo === 'b2b'
            ? `B2B (${contacto.empresa || 'empresa sin nombre'})`
            : contacto.tipo === 'evento'
              ? 'Cotización de evento'
              : 'Consulta general',
        mensaje: contacto.mensaje,
      },
    });

    res.status(201).json({ contacto });
  } catch (error) {
    next(error);
  }
}

module.exports = { crearContacto };
