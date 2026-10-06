import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  Flag,
  Glasses,
  Goal,
  HardHat,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  PartyPopper,
  Phone,
  School,
  Truck,
  Video,
} from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import {
  EMAIL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  TIKTOK_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from '@/lib/contact';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const focusRingLight =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const STATUS = {
  available: { label: 'Disponible', className: 'bg-emerald-100 text-emerald-900' },
  soon: { label: 'Muy pronto', className: 'bg-amber-100 text-amber-900' },
  later: { label: 'Próximamente', className: 'bg-ink/10 text-ink' },
};

const ACTIVITIES = [
  {
    icon: HardHat,
    title: 'Arena RC',
    status: 'available',
    text: 'Una arena de desafíos para vehículos RC de construcción: mover, cargar y construir sobre arena.',
    image: {
      src: '/fotos/arena-rc.webp',
      width: 800,
      height: 600,
      alt: 'Camión, topadora, cargador, excavadora y grúa RC sobre la arena, con sus controles alineados en el borde',
    },
  },
  {
    icon: Flag,
    title: 'Carreras 1:76',
    status: 'available',
    text: 'Pista de carreras para autos RC a escala 1:76, para competir en familia o entre amigos.',
    image: {
      src: '/fotos/pista-1-76.webp',
      width: 500,
      height: 375,
      alt: 'Pista de carreras 1:76 sobre una alfombra de circuito, con autos y controles',
    },
  },
  {
    icon: Goal,
    title: 'Fútbol con autos 1:64',
    status: 'soon',
    text: 'Partidos de fútbol jugados con autos RC a escala 1:64.',
  },
  {
    icon: Video,
    title: 'Pista FPV',
    status: 'later',
    text: 'Autos RC con conducción en primera persona (FPV). Contará con 2 estaciones.',
  },
  {
    icon: Glasses,
    title: 'Realidad virtual (VR)',
    status: 'later',
    text: 'Experiencias de realidad virtual. Contará con 2 estaciones.',
  },
];

const AUDIENCES = [
  {
    icon: PartyPopper,
    title: 'Cumpleaños',
    text: 'Un panorama distinto para que los invitados jueguen, compitan y se diviertan sin pantallas.',
  },
  {
    icon: Briefcase,
    title: 'Eventos de empresa',
    text: 'Una actividad entretenida para equipos, aniversarios y celebraciones corporativas.',
  },
  {
    icon: School,
    title: 'Colegios y ferias',
    text: 'Una atracción para jornadas, ferias y eventos con mucho público.',
  },
];

const STEPS = [
  { icon: ClipboardList, title: 'Cuéntanos tu evento', text: 'Completa el formulario con la fecha, el lugar y lo que te interesa.' },
  { icon: CalendarCheck, title: 'Recibe tu cotización', text: 'Te respondemos con una propuesta según tu evento.' },
  { icon: Truck, title: 'Llevamos y armamos', text: 'Nosotros llevamos las pistas y la arena a tu evento.' },
];

const FOLLOW_LINKS = [
  { href: INSTAGRAM_URL, label: 'Instagram', icon: Instagram },
  { href: TIKTOK_URL, label: 'TikTok', icon: Music2 },
  { href: WHATSAPP_URL, label: 'WhatsApp', icon: MessageCircle },
];

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
  }, [hash]);

  return (
    <div>
      <section className="relative overflow-hidden bg-cream text-ink" aria-labelledby="hero-title">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-28 h-[30rem] w-[30rem] rounded-full bg-primary/30 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              Para eventos · Región de Valparaíso
            </p>
            <h1
              id="hero-title"
              className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Llevamos las carreras RC a tu evento
            </h1>
            <p className="mt-4 text-xl font-extrabold text-rust sm:text-2xl">
              Construye. Compite. Comparte.
            </p>
            <p className="mt-4 max-w-xl text-base text-ink/80 sm:text-lg">
              Cumpleaños, eventos de empresa y celebraciones con autos y máquinas RC: una arena de
              desafíos, carreras y más. Cuéntanos tu evento y te enviamos una cotización.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#cotizar"
                className={`inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3 font-bold text-ink transition-transform hover:scale-[1.03] ${focusRing}`}
              >
                Cotiza tu evento <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#actividades"
                className={`inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-ink px-7 py-3 text-center font-bold text-ink transition-colors hover:bg-ink hover:text-white ${focusRing}`}
              >
                Ver qué llevamos
              </a>
            </div>
          </div>

          <figure className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rotate-2 rounded-[2rem] bg-primary"
            />
            <img
              src="/fotos/arena-y-pista.webp"
              width={1280}
              height={960}
              alt="Arena RC con camiones, excavadora y grúa a control remoto sobre arena y, al fondo, una pista de carreras 1:76"
              fetchpriority="high"
              className="relative w-full rounded-3xl border-4 border-ink object-cover shadow-2xl"
            />
            <figcaption className="relative mt-5 text-center text-sm font-medium text-ink/80">
              Nuestra arena RC y la pista de carreras 1:76, listas para llevar a tu evento.
            </figcaption>
          </figure>
        </div>
        <div className="checker" aria-hidden="true" />
      </section>

      <section id="actividades" className="scroll-mt-20 bg-sand py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Qué llevamos a tu evento</h2>
            <p className="mt-3 text-ink/80">
              Estas son las actividades con las que contamos y las que se están sumando.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map(({ icon: Icon, title, text, status, image }) => (
              <article
                key={title}
                className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
              >
                {image && (
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading="lazy"
                    className="mb-5 aspect-[4/3] w-full rounded-xl object-cover"
                  />
                )}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-ink">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS[status].className}`}>
                    {STATUS[status].label}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-ink/80">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ideal-para" className="scroll-mt-20 bg-ink text-white">
        <div className="checker" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ideal para <span className="text-primary">compartir</span>
            </h2>
            <p className="mt-3 text-white/80">Un plan entretenido para grandes y chicos, sin pantallas de por medio.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {AUDIENCES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <Icon className="text-primary" size={28} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-white/80">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-20 bg-cream py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">Cómo funciona</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="rounded-2xl bg-sand p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-extrabold text-white">
                    {index + 1}
                  </span>
                  <Icon className="text-rust" size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-ink/80">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="cotizar" className="scroll-mt-20 bg-primary py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Cotiza tu evento</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-ink/90">
              Cuéntanos qué estás celebrando y te respondemos con una cotización.
            </p>
          </div>
          <div className="mt-8 rounded-3xl bg-cream p-6 shadow-2xl sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section id="local" className="scroll-mt-20 bg-sand py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink p-8 text-white shadow-2xl sm:p-12">
            <p className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-ink sm:text-sm">
              Próximamente: nuestro local
            </p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Estamos buscando local</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Mientras tanto llevamos la experiencia a tu evento. Estamos buscando un local en la Región de
              Valparaíso para tener pistas, arena y una cafetería de autoservicio. Todavía no hay fecha de
              apertura; síguenos para enterarte.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {FOLLOW_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 font-semibold transition-colors hover:bg-white/20 ${focusRingLight}`}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </a>
              ))}
              <Link
                to="/contacto"
                className={`inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-ink transition-transform hover:scale-[1.03] ${focusRingLight}`}
              >
                Escríbenos <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <ul className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/80 sm:flex-row sm:gap-8">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" aria-hidden="true" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" aria-hidden="true" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
