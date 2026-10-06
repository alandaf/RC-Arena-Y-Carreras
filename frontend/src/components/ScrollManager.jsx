import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    const irAlDestino = () => document.getElementById(id)?.scrollIntoView();

    irAlDestino();
    const frame = requestAnimationFrame(irAlDestino);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
