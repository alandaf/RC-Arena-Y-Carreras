import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flag, Timer, Trophy, Coffee, Users, Baby, Briefcase, PartyPopper, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const TIMELINE = [
  { icon: Flag, titulo: 'Bienvenida y briefing', descripcion: 'Te recibimos y explicamos las reglas de seguridad de la pista.' },
  { icon: Timer, titulo: 'Elige tu auto RC', descripcion: 'Selecciona entre distintos modelos según tu nivel y estilo.' },
  { icon: Trophy, titulo: 'Carrera cronometrada', descripcion: 'Compite por el mejor tiempo en nuestro circuito temático.' },
  { icon: Coffee, titulo: 'RC & Snacks', descripcion: 'Recarga energía en nuestra zona de snacks y bebidas.' },
];

const PARA_QUIEN = [
  { icon: Baby, titulo: 'Niños y familias', descripcion: 'Autos adaptados y pista segura para todas las edades.' },
  { icon: Users, titulo: 'Grupos de amigos', descripcion: 'Compite en carreras grupales y torneos improvisados.' },
  { icon: Briefcase, titulo: 'Empresas', descripcion: 'Team building distinto, activo y memorable.' },
  { icon: PartyPopper, titulo: 'Cumpleaños', descripcion: 'Celebra con pista exclusiva, snacks y torta.' },
];

const MEMBRESIAS = [
  { nombre: 'Mensual', precio: '$18.000/mes', beneficios: ['Acceso ilimitado en horario regular', '10% dcto en cumpleaños', 'Sin permanencia'] },
  { nombre: 'Trimestral', precio: '$48.000', beneficios: ['Ahorra 11% vs mensual', 'Auto RC de cortesía', 'Prioridad en reservas'] },
  { nombre: 'Anual', precio: '$170.000', beneficios: ['Ahorra 21% vs mensual', 'Eventos exclusivos', 'Invitado gratis 1 vez al mes'] },
];

const FAQS = [
  { pregunta: '¿Necesito experiencia previa para correr?', respuesta: 'No, nuestro staff te enseña lo básico en el briefing inicial y hay autos para todos los niveles.' },
  { pregunta: '¿Cuál es la edad mínima?', respuesta: 'Recomendamos desde los 5 años con acompañante adulto. Desde los 10 años pueden correr solos.' },
  { pregunta: '¿Qué pasa si llueve?', respuesta: 'Nuestra pista principal está techada, así que las sesiones se mantienen con lluvia.' },
  { pregunta: '¿Puedo cancelar o reprogramar mi reserva?', respuesta: 'Sí, escríbenos con al menos 24 horas de anticipación por WhatsApp o email.' },
];

function FaqItem({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-semibold text-sm sm:text-base">{pregunta}</span>
        <ChevronDown className={cn('transition-transform shrink-0', abierto && 'rotate-180')} size={18} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: abierto ? 'auto' : 0, opacity: abierto ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sm text-muted">{respuesta}</p>
      </motion.div>
    </div>
  );
}

export default function Experiencia() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">La experiencia RC Arena</h1>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          Desde que entras hasta que te vas con la sonrisa puesta: así es una sesión típica en nuestra pista.
        </p>
      </section>

      {/* TIMELINE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-8 space-y-10">
          {TIMELINE.map((paso, i) => (
            <motion.div
              key={paso.titulo}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 sm:pl-10"
            >
              <div className="absolute -left-[27px] sm:-left-[35px] top-0 w-11 h-11 rounded-full bg-primary flex items-center justify-center">
                <paso.icon size={18} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg">{paso.titulo}</h3>
              <p className="text-muted text-sm mt-1">{paso.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PARA QUIEN */}
      <section className="bg-surface py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-10">¿Para quién es RC Arena?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARA_QUIEN.map((item) => (
              <div key={item.titulo} className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-accent" size={22} />
                </div>
                <h3 className="font-semibold mb-2">{item.titulo}</h3>
                <p className="text-sm text-muted">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBRESIAS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-center mb-10">Membresías</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBRESIAS.map((m) => (
            <div key={m.nombre} className="card bg-card rounded-2xl p-6 border border-white/5">
              <h3 className="font-semibold text-lg">{m.nombre}</h3>
              <p className="text-3xl font-extrabold text-accent my-3">{m.precio}</p>
              <ul className="space-y-2 text-sm text-muted">
                {m.beneficios.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <Link
                to="/contacto"
                className="mt-6 block text-center bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-full transition-colors"
              >
                Quiero esta membresía
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-10">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <FaqItem key={f.pregunta} {...f} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
