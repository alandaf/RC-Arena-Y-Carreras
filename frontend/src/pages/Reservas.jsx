import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Check, ChevronLeft, ChevronRight, Loader2, MessageCircle } from 'lucide-react';
import { crearReserva, obtenerDisponibilidad } from '@/lib/api';
import { useToast } from '@/lib/utils';
import { cn } from '@/lib/utils';

const TIERS = [
  { id: 'sesion-individual', nombre: 'Sesión Individual', precio: '$8.000', maxPersonas: 4 },
  { id: 'pack-familiar', nombre: 'Pack Familiar', precio: '$25.000', maxPersonas: 6 },
  { id: 'membresia', nombre: 'Sesión de Membresía', precio: 'Incluida', maxPersonas: 2 },
];

const reservaSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(6, 'Teléfono inválido'),
  personas: z.coerce.number().int().min(1, 'Mínimo 1 persona').max(20),
  mensaje: z.string().optional(),
});

function generarProximosDias(cantidad = 10) {
  return Array.from({ length: cantidad }, (_, i) => addDays(new Date(), i));
}

export default function Reservas() {
  const { toast } = useToast();
  const [paso, setPaso] = useState(1);
  const [tierSeleccionado, setTierSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [reservaExitosa, setReservaExitosa] = useState(null);

  const dias = generarProximosDias();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(reservaSchema), defaultValues: { personas: 1 } });

  const fechaISO = fechaSeleccionada ? format(fechaSeleccionada, 'yyyy-MM-dd') : null;

  const { data: disponibilidad, isLoading: cargandoHorarios } = useQuery({
    queryKey: ['disponibilidad', fechaISO],
    queryFn: () => obtenerDisponibilidad(fechaISO),
    enabled: Boolean(fechaISO),
  });

  useEffect(() => {
    setHorarioSeleccionado(null);
  }, [fechaISO]);

  const mutation = useMutation({
    mutationFn: crearReserva,
    onSuccess: (data) => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E94560', '#F5A623', '#06A77D'],
      });
      setReservaExitosa(data.reserva);
      setPaso(4);
      reset();
    },
    onError: (error) => {
      toast({
        title: 'No pudimos crear tu reserva',
        description: error?.response?.data?.error || 'Intenta nuevamente en unos minutos.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (datos) => {
    mutation.mutate({
      ...datos,
      fecha: fechaISO,
      horario: horarioSeleccionado,
      tier: tierSeleccionado,
    });
  };

  const puedeAvanzarPaso1 = Boolean(tierSeleccionado);
  const puedeAvanzarPaso2 = Boolean(fechaSeleccionada && horarioSeleccionado);

  const mensajeWhatsapp = reservaExitosa
    ? encodeURIComponent(
        `Hola! Acabo de reservar en RC Arena para el ${format(
          new Date(reservaExitosa.fecha),
          "d 'de' MMMM",
          { locale: es }
        )} a las ${reservaExitosa.horario}. Mi nombre es ${reservaExitosa.nombre}.`
      )
    : '';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center">Reserva tu carrera</h1>
      <p className="text-muted text-center mt-2">Elige tu plan, fecha y horario en 3 simples pasos</p>

      <div className="flex items-center justify-center gap-2 mt-10 mb-12">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center">
            <div
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                paso >= n ? 'bg-primary text-white' : 'glass text-muted'
              )}
            >
              {paso > n ? <Check size={16} /> : n}
            </div>
            {n < 3 && (
              <div className={cn('w-10 sm:w-20 h-0.5 mx-1', paso > n ? 'bg-primary' : 'bg-white/10')} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {paso === 1 && (
          <motion.div
            key="paso1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-xl font-semibold mb-6">1. Elige tu plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setTierSeleccionado(tier.id)}
                  className={cn(
                    'glass rounded-2xl p-5 text-left transition-all border-2',
                    tierSeleccionado === tier.id ? 'border-primary' : 'border-transparent'
                  )}
                >
                  <p className="font-semibold">{tier.nombre}</p>
                  <p className="text-accent font-bold text-lg mt-1">{tier.precio}</p>
                  <p className="text-xs text-muted mt-2">Hasta {tier.maxPersonas} personas</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                disabled={!puedeAvanzarPaso1}
                onClick={() => setPaso(2)}
                className="bg-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                Siguiente <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {paso === 2 && (
          <motion.div
            key="paso2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-xl font-semibold mb-6">2. Elige fecha y horario</h2>

            <div className="flex gap-3 overflow-x-auto pb-3">
              {dias.map((dia) => {
                const activo = fechaSeleccionada && format(fechaSeleccionada, 'yyyy-MM-dd') === format(dia, 'yyyy-MM-dd');
                return (
                  <button
                    key={dia.toISOString()}
                    type="button"
                    onClick={() => setFechaSeleccionada(dia)}
                    className={cn(
                      'shrink-0 w-16 py-3 rounded-xl glass text-center border-2 transition-all',
                      activo ? 'border-primary' : 'border-transparent'
                    )}
                  >
                    <p className="text-xs text-muted capitalize">{format(dia, 'EEE', { locale: es })}</p>
                    <p className="font-bold text-lg">{format(dia, 'd')}</p>
                  </button>
                );
              })}
            </div>

            {fechaSeleccionada && (
              <div className="mt-6">
                <p className="text-sm text-muted mb-3">Horarios disponibles</p>
                {cargandoHorarios ? (
                  <div className="flex items-center gap-2 text-muted text-sm">
                    <Loader2 className="animate-spin" size={16} /> Cargando horarios...
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {disponibilidad?.disponibilidad.map((h) => (
                      <button
                        key={h.horario}
                        type="button"
                        disabled={!h.disponible}
                        onClick={() => setHorarioSeleccionado(h.horario)}
                        className={cn(
                          'py-2.5 rounded-xl text-sm font-semibold glass border-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed',
                          horarioSeleccionado === h.horario ? 'border-primary' : 'border-transparent'
                        )}
                      >
                        {h.horario}
                        <span className="block text-[10px] text-muted font-normal">
                          {h.disponible ? `${h.cuposDisponibles} cupos` : 'Agotado'}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setPaso(1)}
                className="glass hover:text-accent font-semibold px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Atrás
              </button>
              <button
                type="button"
                disabled={!puedeAvanzarPaso2}
                onClick={() => setPaso(3)}
                className="bg-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                Siguiente <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {paso === 3 && (
          <motion.form
            key="paso3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-xl font-semibold mb-6">3. Tus datos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm text-muted mb-1 block">Nombre completo</label>
                <input
                  {...register('nombre')}
                  className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-primary text-xs mt-1">{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-primary text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Teléfono</label>
                <input
                  {...register('telefono')}
                  className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
                  placeholder="+56 9 1234 5678"
                />
                {errors.telefono && <p className="text-primary text-xs mt-1">{errors.telefono.message}</p>}
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Número de personas</label>
                <input
                  {...register('personas')}
                  type="number"
                  min={1}
                  className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
                />
                {errors.personas && <p className="text-primary text-xs mt-1">{errors.personas.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-muted mb-1 block">Mensaje (opcional)</label>
                <textarea
                  {...register('mensaje')}
                  rows={3}
                  className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
                  placeholder="¿Algo que debamos saber?"
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setPaso(2)}
                className="glass hover:text-accent font-semibold px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Atrás
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                {mutation.isPending && <Loader2 className="animate-spin" size={16} />}
                Confirmar reserva
              </button>
            </div>
          </motion.form>
        )}

        {paso === 4 && reservaExitosa && (
          <motion.div
            key="paso4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center glass rounded-2xl p-10"
          >
            <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4">
              <Check className="text-green" size={32} />
            </div>
            <h2 className="text-2xl font-extrabold">¡Reserva confirmada!</h2>
            <p className="text-muted mt-2">
              Te enviamos un correo de confirmación a <strong className="text-white">{reservaExitosa.email}</strong>.
            </p>
            <div className="mt-6 glass rounded-xl p-4 text-left text-sm max-w-sm mx-auto">
              <p><span className="text-muted">Fecha:</span> {format(new Date(reservaExitosa.fecha), "d 'de' MMMM", { locale: es })}</p>
              <p><span className="text-muted">Horario:</span> {reservaExitosa.horario}</p>
              <p><span className="text-muted">Personas:</span> {reservaExitosa.personas}</p>
            </div>
            <a
              href={`https://wa.me/56912345678?text=${mensajeWhatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-green hover:bg-green/90 text-white font-semibold px-6 py-3 rounded-full"
            >
              <MessageCircle size={18} /> Avisar por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
