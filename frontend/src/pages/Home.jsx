import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Coffee,
  Flag,
  Gamepad2,
  HardHat,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  Package,
  PartyPopper,
  Phone,
  Users,
  Video,
} from 'lucide-react';
import HeroTrack from '@/components/HeroTrack';
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

const ACTIVITIES = [
  {
    icon: Flag,
    title: 'Pistas RC',
    text: 'Dos pistas pensadas para correr con autos RC y competir en familia o entre amigos.',
  },
  {
    icon: Video,
    title: 'Pista FPV 1:24',
    text: 'Una pista para autos RC a escala 1:24 con conducción en primera persona (FPV).',
  },
  {
    icon: HardHat,
    title: 'Arena RC',
    text: 'Una arena de desafíos para vehículos RC de construcción y actividades similares.',
  },
];

const GROUPS = [
  {
    icon: Users,
    title: 'En familia',
    text: 'Grandes y chicos jugando juntos: unos corren, otros construyen y todos comparten.',
  },
  {
    icon: Gamepad2,
    title: 'Con amigos',
    text: 'Desafíos para competir, probar tu pulso y pasar la tarde entre carrera y carrera.',
  },
  {
    icon: PartyPopper,
    title: 'En celebraciones',
    text: 'Un plan distinto para festejar rodeado de autos y máquinas RC.',
  },
];

const FOLLOW_LINKS = [
  { href: INSTAGRAM_URL, label: 'Instagram', icon: Instagram, external: true },
  { href: TIKTOK_URL, label: 'TikTok', icon: Music2, external: true },
  { href: WHATSAPP_URL, label: 'WhatsApp', icon: MessageCircle, external: true },
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
              Proyecto en desarrollo · Región de Valparaíso
            </p>
            <h1
              id="hero-title"
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Tu próxima carrera empieza aquí
            </h1>
            <p className="mt-4 text-xl font-extrabold text-rust sm:text-2xl">
              Construye. Compite. Comparte.
            </p>
            <p className="mt-4 max-w-xl text-base text-ink/80 sm:text-lg">
              Un nuevo panorama familiar con autos RC, desafíos y café. Estamos preparando el proyecto
              en la Región de Valparaíso.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#experiencia"
                className={`inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3 font-bold text-ink transition-transform hover:scale-[1.03] ${focusRing}`}
              >
                Conoce el proyecto <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#avances"
                className={`inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-ink px-7 py-3 text-center font-bold text-ink transition-colors hover:bg-ink hover:text-white ${focusRing}`}
              >
                Síguenos para enterarte de la apertura
              </a>
            </div>
          </div>

          <div>
            <HeroTrack />
            <p className="mt-3 text-center text-xs text-ink/70">
              Ilustración referencial del concepto. Todavía no hay fotos del local.
            </p>
          </div>
        </div>
        <div className="checker" aria-hidden="true" />
      </section>

      <section id="experiencia" className="scroll-mt-20 bg-sand py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Tres formas de vivir la experiencia</h2>
            <p className="mt-3 text-ink/80">
              Esto es lo que estamos preparando: pistas para competir, una pista FPV y una arena para
              construir.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ACTIVITIES.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-ink">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-extrabold text-rust" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-ink/80">{text}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-ink/70">
            Estas actividades son parte del proyecto en preparación; todavía no están abiertas al público.
          </p>
        </div>
      </section>

      <section id="panorama" className="scroll-mt-20 bg-ink text-white">
        <div className="checker" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Un panorama para <span className="text-primary">compartir</span>
            </h2>
            <p className="mt-3 text-white/80">
              Pensado para que cada visita sea un plan entretenido para todos, sin pantallas de por medio.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {GROUPS.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <Icon className="text-primary" size={28} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-white/80">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cafeteria" className="scroll-mt-20 bg-cream py-16 text-ink sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-3xl bg-sand p-8 sm:p-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-ink">
              <Coffee size={40} aria-hidden="true" />
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              <li className="rounded-full bg-white px-4 py-1.5">Café en vaso desechable</li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5">
                <Package size={14} aria-hidden="true" /> Productos envasados
              </li>
              <li className="rounded-full bg-white px-4 py-1.5">Autoservicio</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Cafetería de autoservicio</h2>
            <p className="mt-4 max-w-lg text-lg text-ink/80">
              Un rincón para recargar energía entre carrera y carrera: café en vasos desechables y
              productos envasados para acompañar la visita.
            </p>
          </div>
        </div>
      </section>

      <section id="avances" className="scroll-mt-20 bg-primary py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink p-8 text-white shadow-2xl sm:p-12">
            <p className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-ink sm:text-sm">
              Estado actual: buscando local en la Región de Valparaíso
            </p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Estamos preparando la salida</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              El proyecto está en desarrollo. Todavía no hay fecha de apertura ni reservas habilitadas;
              cuando tengamos novedades las compartiremos en nuestras redes.
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
