import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

const TOKEN_KEY = 'rcarena_admin_token';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.url?.startsWith('/admin') && config.url !== '/admin/login') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const esRutaAdmin = error.config?.url?.startsWith('/admin') && error.config?.url !== '/admin/login';
    if (esRutaAdmin && error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

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

export function guardarTokenAdmin(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function obtenerTokenAdmin() {
  return localStorage.getItem(TOKEN_KEY);
}

export function limpiarTokenAdmin() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function loginAdmin(usuario, password) {
  const { data } = await api.post('/admin/login', { usuario, password });
  return data;
}

export async function listarReservasAdmin(estado) {
  const { data } = await api.get('/admin/reservas', { params: estado ? { estado } : {} });
  return data;
}

export async function actualizarEstadoReservaAdmin(id, estado) {
  const { data } = await api.patch(`/admin/reservas/${id}`, { estado });
  return data;
}

export async function listarContactosAdmin() {
  const { data } = await api.get('/admin/contactos');
  return data;
}

export async function marcarContactoLeidoAdmin(id, leido) {
  const { data } = await api.patch(`/admin/contactos/${id}`, { leido });
  return data;
}

export async function listarMembresiasAdmin() {
  const { data } = await api.get('/admin/membresias');
  return data;
}
