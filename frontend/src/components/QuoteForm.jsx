import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { CircleCheck, Loader2, Send } from 'lucide-react';
import { enviarContacto } from '@/lib/api';
import { useToast } from '@/lib/utils';
import Field, { inputClass } from '@/components/FormField';

const EVENT_TYPES = [
  'Cumpleaños',
  'Evento de empresa',
  'Colegio o jardín',
  'Feria o evento masivo',
  'Otro',
];

const DURATIONS = ['1 hora', '2 horas', '3 horas', '4 horas', '5 horas', '6 horas', 'Más de 6 horas'];

const INTERESTS = [
  { label: 'Arena RC', disabled: false },
  { label: 'Carreras 1:76', disabled: false },
  { label: 'FPV con autos pequeños 1:64', disabled: false },
  { label: 'Fútbol con autos 1:64', disabled: true, tag: 'Muy pronto' },
  { label: 'Pista FPV (1:24)', disabled: true, tag: 'Próximamente' },
  { label: 'Realidad virtual (VR)', disabled: true, tag: 'Próximamente' },
];

const schema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Ingresa un email válido'),
  telefono: z.string().min(6, 'Ingresa un teléfono o WhatsApp'),
  tipoEvento: z.enum(EVENT_TYPES, { errorMap: () => ({ message: 'Elige el tipo de evento' }) }),
  fecha: z.string().optional(),
  comuna: z.string().min(2, 'Indica la comuna o ciudad del evento'),
  personas: z
    .string()
    .min(1, 'Indica cuántas personas asistirán')
    .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 5000, 'Ingresa un número válido'),
  hora: z.string().optional(),
  duracion: z.enum(DURATIONS, { errorMap: () => ({ message: 'Elige la duración' }) }),
  interes: z.array(z.string()).optional(),
  comentarios: z.string().max(1000, 'Máximo 1000 caracteres').optional(),
});

export default function QuoteForm() {
  const { toast } = useToast();
  const [enviado, setEnviado] = useState(false);
  const hoy = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { tipoEvento: '', duracion: '', interes: [] },
  });

  const mutation = useMutation({
    mutationFn: enviarContacto,
    onSuccess: () => {
      reset();
      setEnviado(true);
    },
    onError: (error) => {
      toast({
        title: 'No pudimos enviar tu solicitud',
        description: error?.response?.data?.error || 'Intenta nuevamente o escríbenos por WhatsApp.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (datos) => {
    const lineas = [
      `Tipo de evento: ${datos.tipoEvento}`,
      `Comuna o ciudad: ${datos.comuna}`,
      `Teléfono/WhatsApp: ${datos.telefono}`,
      `Le interesa: ${datos.interes?.length ? datos.interes.join(', ') : 'No indicado'}`,
    ];
    if (datos.comentarios) lineas.push(`Comentarios: ${datos.comentarios}`);

    mutation.mutate({
      nombre: datos.nombre,
      email: datos.email,
      telefono: datos.telefono,
      asunto: `Cotización: ${datos.tipoEvento}`,
      mensaje: lineas.join('\n'),
      tipo: 'evento',
      fechaEvento: datos.fecha || null,
      horaInicio: datos.hora || null,
      duracion: datos.duracion,
      personas: Number(datos.personas),
    });
  };

  if (enviado) {
    return (
      <div role="status" className="py-8 text-center">
        <CircleCheck className="mx-auto text-emerald-700" size={48} aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-extrabold text-ink">¡Recibimos tu solicitud!</h3>
        <p className="mx-auto mt-2 max-w-md text-ink/80">
          Te enviamos un correo de confirmación y te responderemos con una cotización para tu evento.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-6 rounded-full border-2 border-ink px-6 py-2.5 font-bold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field id="q-nombre" label="Nombre" error={errors.nombre?.message}>
        <input
          id="q-nombre"
          autoComplete="name"
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={errors.nombre ? 'q-nombre-error' : undefined}
          className={inputClass}
          {...register('nombre')}
        />
      </Field>

      <Field id="q-email" label="Email" error={errors.email?.message}>
        <input
          id="q-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'q-email-error' : undefined}
          className={inputClass}
          {...register('email')}
        />
      </Field>

      <Field id="q-telefono" label="Teléfono o WhatsApp" error={errors.telefono?.message}>
        <input
          id="q-telefono"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.telefono)}
          aria-describedby={errors.telefono ? 'q-telefono-error' : undefined}
          className={inputClass}
          {...register('telefono')}
        />
      </Field>

      <Field id="q-tipo" label="Tipo de evento" error={errors.tipoEvento?.message}>
        <select
          id="q-tipo"
          aria-invalid={Boolean(errors.tipoEvento)}
          aria-describedby={errors.tipoEvento ? 'q-tipo-error' : undefined}
          className={inputClass}
          {...register('tipoEvento')}
        >
          <option value="">Selecciona una opción</option>
          {EVENT_TYPES.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </Field>

      <Field id="q-fecha" label="Fecha tentativa (opcional)" error={errors.fecha?.message}>
        <input id="q-fecha" type="date" min={hoy} className={inputClass} {...register('fecha')} />
      </Field>

      <Field id="q-comuna" label="Comuna o ciudad del evento" error={errors.comuna?.message}>
        <input
          id="q-comuna"
          aria-invalid={Boolean(errors.comuna)}
          aria-describedby={errors.comuna ? 'q-comuna-error' : undefined}
          className={inputClass}
          {...register('comuna')}
        />
      </Field>

      <Field id="q-hora" label="Hora de inicio (opcional)" error={errors.hora?.message}>
        <input id="q-hora" type="time" className={inputClass} {...register('hora')} />
      </Field>

      <Field id="q-duracion" label="Duración del evento" error={errors.duracion?.message}>
        <select
          id="q-duracion"
          aria-invalid={Boolean(errors.duracion)}
          aria-describedby={errors.duracion ? 'q-duracion-error' : undefined}
          className={inputClass}
          {...register('duracion')}
        >
          <option value="">Selecciona una opción</option>
          {DURATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>

      <Field id="q-personas" label="Cantidad aproximada de personas" error={errors.personas?.message}>
        <input
          id="q-personas"
          type="number"
          min="1"
          inputMode="numeric"
          aria-invalid={Boolean(errors.personas)}
          aria-describedby={errors.personas ? 'q-personas-error' : undefined}
          className={inputClass}
          {...register('personas')}
        />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-semibold text-ink">¿Qué te interesa llevar? (opcional)</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(({ label, disabled, tag }) => (
            <label
              key={label}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                disabled
                  ? 'cursor-not-allowed border-ink/15 bg-ink/5 text-ink/40 select-none'
                  : 'cursor-pointer border-ink/25 bg-white text-ink hover:border-ink/50 has-[:checked]:border-ink has-[:checked]:bg-primary'
              }`}
            >
              <input
                type="checkbox"
                value={label}
                disabled={disabled}
                className="h-4 w-4 accent-ink disabled:cursor-not-allowed disabled:opacity-40"
                {...register('interes')}
              />
              <span>{label}</span>
              {tag && (
                <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-ink/60">
                  {tag}
                </span>
              )}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <Field id="q-comentarios" label="Comentarios (opcional)" error={errors.comentarios?.message}>
          <textarea id="q-comentarios" rows={3} className={inputClass} {...register('comentarios')} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 font-bold text-white transition-colors hover:bg-ink/90 disabled:opacity-60 sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {mutation.isPending ? (
            <Loader2 className="animate-spin" size={18} aria-hidden="true" />
          ) : (
            <Send size={18} aria-hidden="true" />
          )}
          Solicitar cotización
        </button>
      </div>
    </form>
  );
}
