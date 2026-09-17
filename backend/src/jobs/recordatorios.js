const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const { enviarEmail } = require('../services/emailService');

const prisma = new PrismaClient();

async function enviarRecordatorios() {
  const inicioManana = new Date();
  inicioManana.setDate(inicioManana.getDate() + 1);
  inicioManana.setHours(0, 0, 0, 0);

  const finManana = new Date(inicioManana);
  finManana.setHours(23, 59, 59, 999);

  const reservas = await prisma.reserva.findMany({
    where: {
      fecha: { gte: inicioManana, lte: finManana },
      estado: 'confirmada',
      recordatorio: false,
    },
  });

  for (const reserva of reservas) {
    try {
      await enviarEmail({
        to: reserva.email,
        subject: 'Recordatorio: tu reserva en RC Arena & Carreras es mañana',
        template: 'recordatorio-reserva.html',
        variables: {
          nombre: reserva.nombre,
          fecha: reserva.fecha.toLocaleDateString('es-CL'),
          horario: reserva.horario,
          tier: reserva.tier,
        },
      });

      await prisma.reserva.update({
        where: { id: reserva.id },
        data: { recordatorio: true },
      });

      console.log(`🔔 Recordatorio enviado a ${reserva.email}`);
    } catch (error) {
      console.error(`❌ Error enviando recordatorio a ${reserva.email}:`, error.message);
    }
  }
}

function iniciarJobRecordatorios() {
  // Corre todos los días a las 09:00
  cron.schedule('0 9 * * *', () => {
    console.log('⏰ Ejecutando job de recordatorios...');
    enviarRecordatorios().catch((err) => console.error('Error en job de recordatorios:', err));
  });

  console.log('⏰ Job de recordatorios programado (diario 09:00).');
}

module.exports = { iniciarJobRecordatorios, enviarRecordatorios };
