import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

export async function crearReserva(payload) {
  const { data } = await api.post('/reservas', payload);
  return data;
}

export async function obtenerDisponibilidad(fecha) {
  const { data } = await api.get('/reservas/disponibilidad', { params: { fecha } });
  return data;
}

export async function enviarContacto(payload) {
  const { data } = await api.post('/contacto', payload);
  return data;
}

export async function crearMembresia(payload) {
  const { data } = await api.post('/membresias', payload);
  return data;
}
