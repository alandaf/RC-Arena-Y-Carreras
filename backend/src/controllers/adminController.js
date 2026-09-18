const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function login(req, res, next) {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    const usuarioValido = usuario === process.env.ADMIN_USERNAME;
    const passwordValida =
      usuarioValido &&
      (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ''));

    if (!usuarioValido || !passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ usuario, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
}

async function listarReservas(req, res, next) {
  try {
    const { estado } = req.query;
    const reservas = await prisma.reserva.findMany({
      where: estado ? { estado } : undefined,
      orderBy: { fecha: 'desc' },
    });
    res.json({ reservas });
  } catch (error) {
    next(error);
  }
}

async function actualizarEstadoReserva(req, res, next) {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['pendiente', 'confirmada', 'completada', 'cancelada'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const reserva = await prisma.reserva.update({
      where: { id },
      data: { estado },
    });

    res.json({ reserva });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    next(error);
  }
}

async function listarContactos(req, res, next) {
  try {
    const contactos = await prisma.contacto.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ contactos });
  } catch (error) {
    next(error);
  }
}

async function marcarContactoLeido(req, res, next) {
  try {
    const { id } = req.params;
    const { leido } = req.body;

    const contacto = await prisma.contacto.update({
      where: { id },
      data: { leido: Boolean(leido) },
    });

    res.json({ contacto });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    next(error);
  }
}

async function listarMembresias(req, res, next) {
  try {
    const membresias = await prisma.membresia.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ membresias });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  listarReservas,
  actualizarEstadoReserva,
  listarContactos,
  marcarContactoLeido,
  listarMembresias,
};
