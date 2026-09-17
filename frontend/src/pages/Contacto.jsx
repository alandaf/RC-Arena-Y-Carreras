import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, X, Briefcase } from 'lucide-react';
import { enviarContacto } from '@/lib/api';
import { useToast } from '@/lib/utils';

const contactoSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  asunto: z.string().min(2, 'Ingresa un asunto'),
  mensaje: z.string().min(5, 'Cuéntanos un poco más'),
});

const b2bSchema = contactoSchema.extend({
  empresa: z.string().min(2, 'Ingresa el nombre de tu empresa'),
});

function FormularioContacto({ tipo, onSuccess }) {
  const { toast } = useToast();
  const schema = tipo === 'b2b' ? b2bSchema : contactoSchema;

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm text-muted mb-1 block">Nombre completo</label>
        <input
          {...register('nombre')}
          className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
          placeholder="Tu nombre"
        />
        {errors.nombre && <p className="text-primary text-xs mt-1">{errors.nombre.message}</p>}
      </div>

      {tipo === 'b2b' && (
        <div>
          <label className="text-sm text-muted mb-1 block">Empresa</label>
          <input
            {...register('empresa')}
            className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
            placeholder="Nombre de tu empresa"
          />
          {errors.empresa && <p className="text-primary text-xs mt-1">{errors.empresa.message}</p>}
        </div>
      )}

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
        <label className="text-sm text-muted mb-1 block">Asunto</label>
        <input
          {...register('asunto')}
          className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
          placeholder={tipo === 'b2b' ? 'Ej: Evento corporativo' : 'Ej: Consulta por horarios'}
        />
        {errors.asunto && <p className="text-primary text-xs mt-1">{errors.asunto.message}</p>}
      </div>

      <div>
        <label className="text-sm text-muted mb-1 block">Mensaje</label>
        <textarea
          {...register('mensaje')}
          rows={4}
          className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
          placeholder="Cuéntanos en qué podemos ayudarte"
        />
        {errors.mensaje && <p className="text-primary text-xs mt-1">{errors.mensaje.message}</p>}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2"
      >
        {mutation.isPending && <Loader2 className="animate-spin" size={16} />}
        Enviar mensaje
      </button>
    </form>
  );
}

export default function Contacto() {
  const [modalB2B, setModalB2B] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Contacto</h1>
        <p className="text-muted mt-2">¿Tienes preguntas? Escríbenos, estamos para ayudarte.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8">
          <FormularioContacto tipo="general" />

          <button
            type="button"
            onClick={() => setModalB2B(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-accent hover:underline"
          >
            <Briefcase size={16} /> ¿Eres una empresa? Cotiza un evento corporativo
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-sm">Ubicación</p>
                <p className="text-muted text-sm">Curauma, Valparaíso, Chile</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-primary shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-sm">Teléfono</p>
                <p className="text-muted text-sm">+56 9 1234 5678</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-primary shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-sm">Email</p>
                <p className="text-muted text-sm">hola@rcarena.cl</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden h-64">
            <iframe
              title="Mapa RC Arena & Carreras"
              src="https://www.google.com/maps?q=Curauma,Valparaiso,Chile&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalB2B && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4"
            onClick={() => setModalB2B(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 sm:p-8 w-full max-w-lg relative"
            >
              <button
                type="button"
                onClick={() => setModalB2B(false)}
                className="absolute top-4 right-4 text-muted hover:text-white"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-1">Cotización corporativa</h2>
              <p className="text-muted text-sm mb-6">Cuéntanos sobre tu evento y te contactaremos.</p>
              <FormularioContacto tipo="b2b" onSuccess={() => setModalB2B(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
