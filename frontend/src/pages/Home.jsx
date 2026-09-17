import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Flag,
  Timer,
  Users,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FRASES = ['Pura adrenalina.', 'Diversión familiar.', 'Carreras reales.', 'Sin pantallas.'];

function useTypewriter(frases, speed = 70, pausa = 1400) {
  const [texto, setTexto] = useState('');
  const [indiceFrase, setIndiceFrase] = useState(0);
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const fraseActual = frases[indiceFrase % frases.length];
    let timeout;

    if (!borrando && texto.length < fraseActual.length) {
      timeout = setTimeout(() => setTexto(fraseActual.slice(0, texto.length + 1)), speed);
    } else if (!borrando && texto.length === fraseActual.length) {
      timeout = setTimeout(() => setBorrando(true), pausa);
    } else if (borrando && texto.length > 0) {
      timeout = setTimeout(() => setTexto(fraseActual.slice(0, texto.length - 1)), speed / 2);
    } else if (borrando && texto.length === 0) {
      setBorrando(false);
      setIndiceFrase((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [texto, borrando, indiceFrase, frases, speed, pausa]);

  return texto;
}

function useCountUp(target, duracion = 1500) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    let inicio = null;
    let frame;

    const step = (timestamp) => {
      if (!inicio) inicio = timestamp;
      const progreso = Math.min((timestamp - inicio) / duracion, 1);
      setValor(Math.floor(progreso * target));
      if (progreso < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duracion]);

  return valor;
}

function useCountdownSabado() {
  const [restante, setRestante] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const calcular = () => {
      const ahora = new Date();
      const proximoSabado = new Date(ahora);
      const diasHastaSabado = (6 - ahora.getDay() + 7) % 7 || 7;
      proximoSabado.setDate(ahora.getDate() + diasHastaSabado);
      proximoSabado.setHours(10, 0, 0, 0);

      const diffMs = proximoSabado - ahora;
      const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
      const segundos = Math.floor((diffMs / 1000) % 60);

      setRestante({ dias, horas, minutos, segundos });
    };

    calcular();
    const interval = setInterval(calcular, 1000);
    return () => clearInterval(interval);
  }, []);

  return restante;
}

const FEATURES = [
  {
    icon: Timer,
    titulo: 'Sesiones cronometradas',
    descripcion: 'Circuitos con tiempos reales, tabla de posiciones y desafíos por vuelta.',
  },
  {
    icon: Users,
    titulo: '100% familiar',
    descripcion: 'Autos y pistas para todas las edades, desde principiantes hasta expertos.',
  },
  {
    icon: Trophy,
    titulo: 'Torneos y eventos',
    descripcion: 'Competencias mensuales, cumpleaños y actividades corporativas.',
  },
  {
    icon: Sparkles,
    titulo: 'RC & Snacks',
    descripcion: 'Zona de snacks y bebidas para recargar energía entre carrera y carrera.',
  },
];

const TESTIMONIOS = [
  {
    nombre: 'Carolina M.',
    texto: 'Mis hijos no pidieron el celular en toda la tarde. ¡Increíble experiencia familiar!',
  },
  {
    nombre: 'Rodrigo P.',
    texto: 'La pista está impecable y el staff es súper amable. Volvemos todos los fines de semana.',
  },
  {
    nombre: 'Empresa Andes SPA',
    texto: 'Hicimos nuestro team building aquí y fue la mejor actividad corporativa del año.',
  },
];

const PRECIOS = {
  sesion: [
    { nombre: 'Sesión Individual', precio: '$8.000', detalle: '20 minutos de pista + auto RC' },
    { nombre: 'Pack Familiar', precio: '$25.000', detalle: 'Hasta 4 personas, 45 minutos' },
    { nombre: 'Cumpleaños RC', precio: '$60.000', detalle: 'Pista exclusiva 2 horas + snacks' },
  ],
  membresia: [
    { nombre: 'Membresía Mensual', precio: '$18.000/mes', detalle: 'Acceso ilimitado en horario regular' },
    { nombre: 'Membresía Trimestral', precio: '$48.000', detalle: 'Ahorra 11% + auto RC de cortesía' },
    { nombre: 'Membresía Anual', precio: '$170.000', detalle: 'Ahorra 21% + eventos exclusivos' },
  ],
};

export default function Home() {
  const textoTypewriter = useTypewriter(FRASES);
  const [tab, setTab] = useState('sesion');
  const pistas = useCountUp(3);
  const familias = useCountUp(1200);
  const carreras = useCountUp(8500);
  const countdown = useCountdownSabado();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const stats = useMemo(
    () => [
      { valor: pistas, sufijo: '', label: 'Pistas temáticas' },
      { valor: familias, sufijo: '+', label: 'Familias felices' },
      { valor: carreras, sufijo: '+', label: 'Carreras corridas' },
    ],
    [pistas, familias, carreras]
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-dark py-24 md:py-36">
        <div className="absolute inset-0 pointer-events-none">
          <span className="speed-line top-1/4 animate-speedlines" style={{ animationDelay: '0s' }} />
          <span className="speed-line top-1/2 animate-speedlines" style={{ animationDelay: '0.4s' }} />
          <span className="speed-line top-3/4 animate-speedlines" style={{ animationDelay: '0.8s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-accent mb-6"
          >
            <Flag size={14} /> Curauma, Valparaíso
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          >
            RC Arena <span className="text-gradient">& Carreras</span>
          </motion.h1>

          <p className="mt-4 text-lg sm:text-xl text-muted h-8">
            {textoTypewriter}
            <span className="animate-pulse">|</span>
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-muted"
          >
            La única pista RC familiar de Curauma. Fuera de la pantalla, pura acción.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/reservas"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full transition-transform hover:scale-105"
            >
              Reserva tu carrera
            </Link>
            <Link
              to="/experiencia"
              className="glass px-8 py-3 rounded-full font-semibold hover:text-accent transition-colors"
            >
              Ver experiencia
            </Link>
          </motion.div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-gradient">
                  {s.valor}
                  {s.sufijo}
                </p>
                <p className="text-xs sm:text-sm text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold">¿Por qué RC Arena?</h2>
          <p className="text-muted mt-2">Todo lo que necesitas para una tarde inolvidable</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                <f.icon className="text-primary" size={22} />
              </div>
              <h3 className="font-semibold mb-2">{f.titulo}</h3>
              <p className="text-sm text-muted">{f.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold">Precios</h2>
            <p className="text-muted mt-2">Elige entre una sesión puntual o una membresía</p>

            <div className="inline-flex glass rounded-full p-1 mt-6">
              <button
                type="button"
                onClick={() => setTab('sesion')}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-semibold transition-colors',
                  tab === 'sesion' ? 'bg-primary text-white' : 'text-muted'
                )}
              >
                Sesión
              </button>
              <button
                type="button"
                onClick={() => setTab('membresia')}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-semibold transition-colors',
                  tab === 'membresia' ? 'bg-primary text-white' : 'text-muted'
                )}
              >
                Membresía
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRECIOS[tab].map((plan) => (
              <div key={plan.nombre} className="card bg-card rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold text-lg">{plan.nombre}</h3>
                <p className="text-3xl font-extrabold text-accent my-3">{plan.precio}</p>
                <p className="text-sm text-muted flex items-start gap-2">
                  <Check size={16} className="text-green mt-0.5 shrink-0" />
                  {plan.detalle}
                </p>
                <Link
                  to="/reservas"
                  className="mt-6 block text-center bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-full transition-colors"
                >
                  Elegir plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-extrabold text-center mb-10">Lo que dicen nuestras familias</h2>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIOS.map((t) => (
                <div key={t.nombre} className="flex-[0_0_100%] px-2">
                  <div className="glass rounded-2xl p-8 text-center">
                    <p className="text-lg text-muted italic">"{t.texto}"</p>
                    <p className="mt-4 font-semibold text-accent">{t.nombre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="absolute -left-4 sm:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute -right-4 sm:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-surface py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-2">Próxima carrera grupal</h2>
          <p className="text-muted mb-10">Todos los sábados desde las 10:00 AM</p>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            {[
              { valor: countdown.dias, label: 'Días' },
              { valor: countdown.horas, label: 'Horas' },
              { valor: countdown.minutos, label: 'Min' },
              { valor: countdown.segundos, label: 'Seg' },
            ].map((c) => (
              <div key={c.label} className="glass rounded-2xl py-5">
                <p className="text-2xl sm:text-4xl font-extrabold text-gradient">
                  {String(c.valor).padStart(2, '0')}
                </p>
                <p className="text-xs text-muted mt-1">{c.label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/reservas"
            className="inline-block mt-10 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full transition-transform hover:scale-105"
          >
            Reservar mi cupo
          </Link>
        </div>
      </section>
    </div>
  );
}
