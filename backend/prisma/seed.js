const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function fechaEnDias(dias) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function main() {
  console.log('🌱 Sembrando datos de prueba...');

  await prisma.reserva.deleteMany();
  await prisma.contacto.deleteMany();
  await prisma.membresia.deleteMany();

  await prisma.reserva.createMany({
    data: [
      {
        nombre: 'Matías Contreras',
        email: 'matias.contreras@example.com',
        telefono: '+56912345678',
        fecha: fechaEnDias(2),
        horario: '11:00',
        tier: 'pista-1-76',
        personas: 1,
        mensaje: 'Primera vez, ¿hay autos disponibles para principiantes?',
        estado: 'confirmada',
        recordatorio: false,
      },
      {
        nombre: 'Familia Reyes',
        email: 'familia.reyes@example.com',
        telefono: '+56923456789',
        fecha: fechaEnDias(3),
        horario: '15:00',
        tier: 'arena-construccion',
        personas: 4,
        mensaje: 'Cumpleaños de mi hijo, somos 4 personas.',
        estado: 'confirmada',
        recordatorio: false,
      },
      {
        nombre: 'Javiera Muñoz',
        email: 'javiera.munoz@example.com',
        telefono: '+56934567890',
        fecha: fechaEnDias(5),
        horario: '17:00',
        tier: 'pista-1-24-fpv',
        personas: 2,
        mensaje: null,
        estado: 'pendiente',
        recordatorio: false,
      },
      {
        nombre: 'Sebastián Torres',
        email: 'sebastian.torres@example.com',
        telefono: '+56945678901',
        fecha: fechaEnDias(-3),
        horario: '12:00',
        tier: 'pista-1-76',
        personas: 1,
        mensaje: null,
        estado: 'completada',
        recordatorio: true,
      },
      {
        nombre: 'Grupo Amigos RC',
        email: 'grupo.amigosrc@example.com',
        telefono: '+56956789012',
        fecha: fechaEnDias(-10),
        horario: '18:00',
        tier: 'pista-1-24-fpv',
        personas: 6,
        mensaje: 'Torneo entre amigos, necesitamos toda la pista.',
        estado: 'cancelada',
        recordatorio: false,
      },
    ],
  });

  await prisma.contacto.createMany({
    data: [
      {
        nombre: 'Camila Soto',
        email: 'camila.soto@example.com',
        asunto: 'Consulta por horarios de fin de semana',
        mensaje: '¿Tienen horarios extendidos los sábados?',
        tipo: 'general',
        empresa: null,
        leido: false,
      },
      {
        nombre: 'Diego Fernández',
        email: 'diego.fernandez@example.com',
        asunto: 'Cumpleaños infantil',
        mensaje: 'Quiero cotizar una celebración de cumpleaños para 10 niños.',
        tipo: 'general',
        empresa: null,
        leido: true,
      },
      {
        nombre: 'Constructora Valparaíso SPA',
        email: 'eventos@constructoravalpo.cl',
        asunto: 'Evento corporativo de fin de año',
        mensaje: 'Buscamos actividad de team building para 30 personas.',
        tipo: 'b2b',
        empresa: 'Constructora Valparaíso SPA',
        leido: false,
      },
    ],
  });

  await prisma.membresia.createMany({
    data: [
      {
        nombre: 'Ignacio Vergara',
        email: 'ignacio.vergara@example.com',
        telefono: '+56967890123',
        plan: 'mensual',
        estado: 'interesado',
      },
      {
        nombre: 'Antonia Rivas',
        email: 'antonia.rivas@example.com',
        telefono: '+56978901234',
        plan: 'trimestral',
        estado: 'activo',
      },
    ],
  });

  console.log('✅ Seed completado.');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
