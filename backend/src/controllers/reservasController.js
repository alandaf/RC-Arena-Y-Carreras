const { PrismaClient } = require('@prisma/client');
const { enviarEmail } = require('../services/emailService');

const prisma = new PrismaClient();

const HORARIOS_BASE = [
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

const CUPOS_POR_HORARIO = 3;

const NOMBRES_PISTA = {
  'arena-construccion': 'Arena de Construcción',
  'pista-1-76': 'Pista de Carreras 1:76',
  'pista-1-24-fpv': 'Pista de Carreras 1:24 FPV',
};

async function crearReserva(req, res, next) {
  try {
    const { nombre, email, telefono, fecha, horario, tier, personas, mensaje } = req.body;

    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);
    const finDia = new Date(fecha);
    finDia.setHours(23, 59, 59, 999);

    // Transacción serializable: evita que dos reservas concurrentes para el mismo
    // horario pasen ambas la validación de cupos (condición de carrera count+create).
    const reserva = await prisma.$transaction(
      async (tx) => {
        const reservasEnHorario = await tx.reserva.count({
          where: {
            fecha: { gte: inicioDia, lte: finDia },
            horario,
            estado: { not: 'cancelada' },
          },
        });

        if (reservasEnHorario >= CUPOS_POR_HORARIO) {
          const error = new Error('Ese horario ya no tiene cupos disponibles');
          error.status = 409;
          throw error;
        }

        return tx.reserva.create({
          data: { nombre, email, telefono, fecha: inicioDia, horario, tier, personas, mensaje },
        });
      },
      { isolationLevel: 'Serializable' }
    );

    const fechaFormateada = inicioDia.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const nombrePista = NOMBRES_PISTA[reserva.tier] || reserva.tier;

    await enviarEmail({
      to: reserva.email,
      subject: 'Confirmación de tu reserva — RC Arena & Carreras',
      template: 'confirmacion-reserva.html',
      variables: {
        nombre: reserva.nombre,
        fecha: fechaFormateada,
        horario: reserva.horario,
        tier: nombrePista,
        personas: reserva.personas,
      },
    });

    await enviarEmail({
      to: process.env.EMAIL_DUENO || 'dueno@rcarena.local',
      subject: `Nueva reserva: ${reserva.nombre} — ${fechaFormateada}`,
      template: 'notificacion-dueno.html',
      variables: {
        nombre: reserva.nombre,
        email: reserva.email,
        telefono: reserva.telefono,
        fecha: fechaFormateada,
        horario: reserva.horario,
        tier: nombrePista,
        personas: reserva.personas,
        mensaje: reserva.mensaje || 'Sin mensaje adicional',
      },
    });

    res.status(201).json({ reserva });
  } catch (error) {
    next(error);
  }
}

async function obtenerDisponibilidad(req, res, next) {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ error: 'Parámetro fecha es requerido (YYYY-MM-DD)' });
    }

    const fechaConsulta = new Date(fecha);
    if (Number.isNaN(fechaConsulta.getTime())) {
      return res.status(400).json({ error: 'Fecha inválida' });
    }

    const inicioDia = new Date(fechaConsulta);
    inicioDia.setHours(0, 0, 0, 0);
    const finDia = new Date(fechaConsulta);
    finDia.setHours(23, 59, 59, 999);

    const reservas = await prisma.reserva.findMany({
      where: {
        fecha: { gte: inicioDia, lte: finDia },
        estado: { not: 'cancelada' },
      },
      select: { horario: true },
    });

    const conteoPorHorario = reservas.reduce((acc, r) => {
      acc[r.horario] = (acc[r.horario] || 0) + 1;
      return acc;
    }, {});

    const disponibilidad = HORARIOS_BASE.map((horario) => {
      const ocupados = conteoPorHorario[horario] || 0;
      return {
        horario,
        cuposDisponibles: Math.max(CUPOS_POR_HORARIO - ocupados, 0),
        disponible: ocupados < CUPOS_POR_HORARIO,
      };
    });

    res.json({ fecha, disponibilidad });
  } catch (error) {
    next(error);
  }
}

module.exports = { crearReserva, obtenerDisponibilidad };
