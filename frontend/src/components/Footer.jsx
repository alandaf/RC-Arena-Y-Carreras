import { Link } from 'react-router-dom';
import { Instagram, Music2, MapPin, Phone, Mail } from 'lucide-react';
import { EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, TIKTOK_URL } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 font-extrabold text-lg mb-3">
            <img src="/logo.jpg" alt="RC Arena & Carreras" className="h-12 w-12 rounded-full object-cover" />
            <span>RC Arena & Carreras</span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Construye. Compite. Comparte. Carreras RC y arena para cumpleaños y eventos en la Región de Valparaíso.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-accent"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-accent"
              aria-label="TikTok"
            >
              <Music2 size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">Navegación</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/" className="hover:text-white">Inicio</Link></li>
            <li><Link to="/#actividades" className="hover:text-white">Actividades</Link></li>
            <li><Link to="/#cotizar" className="hover:text-white">Cotiza tu evento</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">Contacto</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-primary shrink-0" />
              Región de Valparaíso
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary shrink-0" />
              {PHONE_DISPLAY}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary shrink-0" />
              {EMAIL}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} RC Arena & Carreras. Todos los derechos reservados.
      </div>
    </footer>
  );
}
