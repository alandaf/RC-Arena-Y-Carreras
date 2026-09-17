import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '56912345678';
const DEFAULT_MESSAGE = 'Hola! Quiero más información sobre RC Arena & Carreras 🏎️';

export default function WhatsAppFAB() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full bg-green flex items-center justify-center shadow-lg animate-pulse-glow hover:scale-110 transition-transform"
    >
      <MessageCircle className="text-white" size={26} />
    </a>
  );
}
