import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Briefcase, Loader2, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react';
import { enviarContacto } from '@/lib/api';
import { useToast } from '@/lib/utils';
import { EMAIL, PHONE_DISPLAY, WHATSAPP_NUMBER, WHATSAPP_URL } from '@/lib/contact';
import Field, { inputClass } from '@/components/FormField';

const contactoSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Ingresa un email válido'),
  asunto: z.string().min(2, 'Ingresa un asunto'),
  mensaje: z.string().min(5, 'Cuéntanos un poco más'),
});

const b2bSchema = contactoSchema.extend({
  empresa: z.string().min(2, 'Ingresa el nombre de tu empresa'),
});

function FormularioContacto({ tipo, onSuccess }) {
  const { toast } = useToast();
  const schema = tipo === 'b2b' ? b2bSchema : contactoSchema;
  const prefijo = `c-${tipo}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: enviarContacto,
    onSuccess: () => {
      toast({ title: '¡Mensaje enviado!', description: 'Te responderemos a la brevedad.' });
      reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: 'No pudimos enviar tu mensaje',
        description: error?.response?.data?.error || 'Intenta nuevamente en unos minutos.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (datos) => mutation.mutate({ ...datos, tipo });

  const describedBy = (campo) => (errors[campo] ? `${prefijo}-${campo}-error` : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field id={`${prefijo}-nombre`} label="Nombre completo" error={errors.nombre?.message}>
        <input
          id={`${prefijo}-nombre`}
          autoComplete="name"
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={describedBy('nombre')}
          className={inputClass}
          {...register('nombre')}
        />
      </Field>

      {tipo === 'b2b' && (
        <Field id={`${prefijo}-empresa`} label="Empresa" error={errors.empresa?.message}>
          <input
            id={`${prefijo}-empresa`}
            autoComplete="organization"
            aria-invalid={Boolean(errors.empresa)}
            aria-describedby={describedBy('empresa')}
            className={inputClass}
            {...register('empresa')}
          />
        </Field>
      )}

      <Field id={`${prefijo}-email`} label="Email" error={errors.email?.message}>
        <input
          id={`${prefijo}-email`}
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy('email')}
          className={inputClass}
          {...register('email')}
        />
      </Field>

      <Field id={`${prefijo}-asunto`} label="Asunto" error={errors.asunto?.message}>
        <input
          id={`${prefijo}-asunto`}
          aria-invalid={Boolean(errors.asunto)}
          aria-describedby={describedBy('asunto')}
          className={inputClass}
          placeholder={tipo === 'b2b' ? 'Ej: Evento corporativo' : 'Ej: Consulta sobre un evento'}
          {...register('asunto')}
        />
      </Field>

      <Field id={`${prefijo}-mensaje`} label="Mensaje" error={errors.mensaje?.message}>
        <textarea
          id={`${prefijo}-mensaje`}
          rows={4}
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={describedBy('mensaje')}
          className={inputClass}
          {...register('mensaje')}
        />
      </Field>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 font-bold text-white transition-colors hover:bg-ink/90 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {mutation.isPending && <Loader2 className="animate-spin" size={18} aria-hidden="true" />}
        Enviar mensaje
      </button>
    </form>
  );
}

export default function Contacto() {
  const [modalB2B, setModalB2B] = useState(false);

  useEffect(() => {
    if (!modalB2B) return undefined;
    const alPresionar = (e) => {
      if (e.key === 'Escape') setModalB2B(false);
    };
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [modalB2B]);

  return (
    <div className="bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Contacto</h1>
          <p className="mt-2 text-ink/80">¿Tienes preguntas? Escríbenos, estamos para ayudarte.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
            <FormularioContacto tipo="general" />

            <button
              type="button"
              onClick={() => setModalB2B(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-rust hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Briefcase size={16} aria-hidden="true" /> ¿Eres una empresa? Cotiza un evento corporativo
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-5 rounded-2xl border border-ink/10 bg-sand p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-rust" size={20} aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">Cobertura</p>
                  <p className="text-sm text-ink/80">Eventos en la Región de Valparaíso</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 shrink-0 text-rust" size={20} aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">Teléfono</p>
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-sm text-ink/80 hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 shrink-0 text-rust" size={20} aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">Email</p>
                  <a href={`mailto:${EMAIL}`} className="text-sm text-ink/80 hover:underline">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <MessageCircle size={18} aria-hidden="true" /> Escríbenos por WhatsApp
              </a>
              <Link
                to="/#cotizar"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-ink transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Cotiza tu evento <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalB2B && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 p-4"
            onClick={() => setModalB2B(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-b2b"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-6 text-ink shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setModalB2B(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-ink/70 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                aria-label="Cerrar"
              >
                <X size={20} aria-hidden="true" />
              </button>
              <h2 id="titulo-b2b" className="mb-1 text-xl font-extrabold">
                Cotización corporativa
              </h2>
              <p className="mb-6 text-sm text-ink/80">Cuéntanos sobre tu evento y te contactaremos.</p>
              <FormularioContacto tipo="b2b" onSuccess={() => setModalB2B(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
