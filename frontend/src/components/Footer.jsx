import { Link } from 'react-router-dom';
import { Flag, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg mb-3">
            <Flag className="text-primary" size={22} />
            <span>RC Arena & Carreras</span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            La única pista RC familiar de Curauma. Fuera de la pantalla, pura acción.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-accent"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-accent"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">Navegación</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/" className="hover:text-white">Inicio</Link></li>
            <li><Link to="/reservas" className="hover:text-white">Reservas</Link></li>
            <li><Link to="/experiencia" className="hover:text-white">Experiencia</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">Contacto</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-primary shrink-0" />
              Curauma, Valparaíso, Chile
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary shrink-0" />
              +56 9 7623 9238
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary shrink-0" />
              ventas@simarp.net
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
