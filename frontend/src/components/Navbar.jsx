import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/reservas', label: 'Reservas' },
  { to: '/experiencia', label: 'Experiencia' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/95 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-extrabold text-lg">
          <img src="/logo.jpg" alt="RC Arena & Carreras" className="h-11 w-11 rounded-full object-cover" />
          <span className="hidden sm:inline">
            RC Arena <span className="text-gradient">& Carreras</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  isActive ? 'text-accent' : 'text-muted'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/#avances"
            className="bg-primary hover:bg-primary/90 text-ink text-sm font-bold px-5 py-2 rounded-full transition-colors"
          >
            Entérate de la apertura
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'py-2 px-3 rounded-lg text-sm font-medium',
                      isActive ? 'bg-primary/20 text-accent' : 'text-muted'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/#avances"
                onClick={() => setOpen(false)}
                className="mt-2 bg-primary text-ink text-sm font-bold px-5 py-3 rounded-full text-center"
              >
                Entérate de la apertura
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
