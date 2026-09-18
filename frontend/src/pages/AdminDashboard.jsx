import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { LogOut, Loader2, Mail, MailOpen } from 'lucide-react';
import {
  listarReservasAdmin,
  actualizarEstadoReservaAdmin,
  listarContactosAdmin,
  marcarContactoLeidoAdmin,
  listarMembresiasAdmin,
  limpiarTokenAdmin,
} from '@/lib/api';
import { useToast } from '@/lib/utils';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'reservas', label: 'Reservas' },
  { id: 'contactos', label: 'Contactos' },
  { id: 'membresias', label: 'Membresías' },
];

const ESTADOS_RESERVA = ['pendiente', 'confirmada', 'completada', 'cancelada'];

const NOMBRES_PISTA = {
  'arena-construccion': 'Arena',
  'pista-1-76': 'Pista 1:76',
  'pista-1-24-fpv': 'Pista 1:24 FPV',
};

function badgeEstado(estado) {
  const colores = {
    pendiente: 'bg-accent/20 text-accent',
    confirmada: 'bg-green/20 text-green',
    completada: 'bg-muted/20 text-muted',
    cancelada: 'bg-primary/20 text-primary',
  };
  return colores[estado] || 'bg-muted/20 text-muted';
}

function TablaReservas() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'reservas'],
    queryFn: () => listarReservasAdmin(),
  });

  const mutation = useMutation({
    mutationFn: ({ id, estado }) => actualizarEstadoReservaAdmin(id, estado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reservas'] });
      toast({ title: 'Reserva actualizada' });
    },
    onError: () => {
      toast({ title: 'No se pudo actualizar la reserva', variant: 'destructive' });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted text-sm py-10 justify-center">
        <Loader2 className="animate-spin" size={16} /> Cargando reservas...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted border-b border-white/10">
            <th className="py-2 pr-4">Cliente</th>
            <th className="py-2 pr-4">Pista</th>
            <th className="py-2 pr-4">Fecha</th>
            <th className="py-2 pr-4">Horario</th>
            <th className="py-2 pr-4">Personas</th>
            <th className="py-2 pr-4">Estado</th>
          </tr>
        </thead>
        <tbody>
          {data?.reservas.map((r) => (
            <tr key={r.id} className="border-b border-white/5">
              <td className="py-3 pr-4">
                <p className="font-medium">{r.nombre}</p>
                <p className="text-muted text-xs">{r.email} · {r.telefono}</p>
              </td>
              <td className="py-3 pr-4">{NOMBRES_PISTA[r.tier] || r.tier}</td>
              <td className="py-3 pr-4">{format(new Date(r.fecha), "d 'de' MMM", { locale: es })}</td>
              <td className="py-3 pr-4">{r.horario}</td>
              <td className="py-3 pr-4">{r.personas}</td>
              <td className="py-3 pr-4">
                <select
                  value={r.estado}
                  onChange={(e) => mutation.mutate({ id: r.id, estado: e.target.value })}
                  className={cn('rounded-full px-3 py-1 text-xs font-semibold bg-transparent border-0 outline-none', badgeEstado(r.estado))}
                >
                  {ESTADOS_RESERVA.map((estado) => (
                    <option key={estado} value={estado} className="bg-surface text-white">
                      {estado}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {data?.reservas.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-muted">
                No hay reservas todavía.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TablaContactos() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'contactos'],
    queryFn: listarContactosAdmin,
  });

  const mutation = useMutation({
    mutationFn: ({ id, leido }) => marcarContactoLeidoAdmin(id, leido),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'contactos'] });
    },
    onError: () => {
      toast({ title: 'No se pudo actualizar el contacto', variant: 'destructive' });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted text-sm py-10 justify-center">
        <Loader2 className="animate-spin" size={16} /> Cargando contactos...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data?.contactos.map((c) => (
        <div key={c.id} className={cn('glass rounded-xl p-4', !c.leido && 'border-l-4 border-l-accent')}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">
                {c.nombre}{' '}
                {c.tipo === 'b2b' && (
                  <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                    B2B{c.empresa ? ` · ${c.empresa}` : ''}
                  </span>
                )}
              </p>
              <p className="text-muted text-xs">{c.email}</p>
              <p className="text-sm mt-2 font-medium">{c.asunto}</p>
              <p className="text-sm text-muted mt-1">{c.mensaje}</p>
            </div>
            <button
              type="button"
              onClick={() => mutation.mutate({ id: c.id, leido: !c.leido })}
              className="shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center hover:text-accent"
              title={c.leido ? 'Marcar como no leído' : 'Marcar como leído'}
            >
              {c.leido ? <MailOpen size={16} /> : <Mail size={16} className="text-accent" />}
            </button>
          </div>
        </div>
      ))}
      {data?.contactos.length === 0 && (
        <p className="text-center text-muted py-8">No hay mensajes de contacto todavía.</p>
      )}
    </div>
  );
}

function TablaMembresias() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'membresias'],
    queryFn: listarMembresiasAdmin,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted text-sm py-10 justify-center">
        <Loader2 className="animate-spin" size={16} /> Cargando membresías...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted border-b border-white/10">
            <th className="py-2 pr-4">Nombre</th>
            <th className="py-2 pr-4">Contacto</th>
            <th className="py-2 pr-4">Plan</th>
            <th className="py-2 pr-4">Estado</th>
          </tr>
        </thead>
        <tbody>
          {data?.membresias.map((m) => (
            <tr key={m.id} className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium">{m.nombre}</td>
              <td className="py-3 pr-4 text-muted">{m.email} · {m.telefono}</td>
              <td className="py-3 pr-4 capitalize">{m.plan}</td>
              <td className="py-3 pr-4 capitalize">{m.estado}</td>
            </tr>
          ))}
          {data?.membresias.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-muted">
                No hay interesados en membresías todavía.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('reservas');

  const cerrarSesion = () => {
    limpiarTokenAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Panel de administración</h1>
        <button
          type="button"
          onClick={cerrarSesion}
          className="flex items-center gap-2 text-sm text-muted hover:text-primary"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
              tab === t.id ? 'bg-primary text-white' : 'glass text-muted'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        {tab === 'reservas' && <TablaReservas />}
        {tab === 'contactos' && <TablaContactos />}
        {tab === 'membresias' && <TablaMembresias />}
      </div>
    </div>
  );
}
