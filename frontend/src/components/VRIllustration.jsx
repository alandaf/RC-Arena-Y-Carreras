const SKIN = '#E8B48A';
const INK = '#14100C';

export default function VRIllustration() {
  return (
    <svg
      viewBox="0 0 800 600"
      role="img"
      aria-label="Ilustración: personaje de caricatura sentado en un asiento de carreras, con lentes VR y control remoto, manejando un auto RC con cámara sobre una pista"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="600" fill="#EBDCC4" />
      <rect y="480" width="800" height="120" fill="#E2D1B6" />
      <ellipse cx="230" cy="500" rx="170" ry="20" fill={INK} opacity="0.12" />
      <ellipse cx="610" cy="520" rx="190" ry="22" fill={INK} opacity="0.12" />

      <g>
        <rect x="120" y="474" width="190" height="12" rx="6" fill="#26262B" />
        <rect x="170" y="420" width="44" height="58" fill="#26262B" />
        <rect x="108" y="398" width="190" height="36" rx="14" fill="#1B1A1F" />
        <g transform="rotate(-7 125 330)">
          <rect x="98" y="232" width="56" height="196" rx="26" fill="#1B1A1F" />
          <rect x="120" y="250" width="12" height="150" rx="6" fill="#D7263D" />
        </g>
      </g>

      <g>
        <line x1="185" y1="398" x2="298" y2="402" stroke="#26262B" strokeWidth="36" strokeLinecap="round" />
        <line x1="298" y1="402" x2="308" y2="462" stroke="#26262B" strokeWidth="30" strokeLinecap="round" />
        <rect x="290" y="456" width="52" height="20" rx="9" fill="#F4F1EA" />
        <rect x="290" y="470" width="52" height="6" rx="3" fill="#B8B2A6" />

        <g transform="rotate(8 170 330)">
          <rect x="138" y="262" width="66" height="140" rx="28" fill="#F7941D" />
        </g>
        <rect x="180" y="248" width="20" height="26" fill={SKIN} />

        <line x1="196" y1="288" x2="240" y2="344" stroke="#F7941D" strokeWidth="24" strokeLinecap="round" />
        <line x1="240" y1="344" x2="300" y2="332" stroke="#F7941D" strokeWidth="22" strokeLinecap="round" />
        <rect x="292" y="318" width="40" height="26" rx="7" fill="#26262B" />
        <circle cx="312" cy="314" r="6" fill="#F7941D" />
        <rect x="318" y="336" width="8" height="16" rx="3" fill="#D7263D" />
        <circle cx="300" cy="334" r="12" fill={SKIN} />

        <circle cx="188" cy="222" r="36" fill={SKIN} />
        <circle cx="166" cy="226" r="8" fill="#D49A70" />
        <path d="M150 220 C146 184 196 172 222 202 C198 196 172 200 150 220 Z" fill="#2B2018" />
        <path d="M196 252 Q208 262 222 254" stroke="#8A4B2A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="214" cy="243" r="6" fill="#D49A70" />

        <line x1="190" y1="218" x2="150" y2="222" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <rect x="188" y="204" width="58" height="32" rx="10" fill={INK} />
        <rect x="232" y="212" width="12" height="7" rx="3" fill="#FF6A1A" />
        <rect x="196" y="212" width="30" height="16" rx="6" fill="#2D2C33" />
      </g>

      <g>
        <polygon points="430,440 750,404 792,478 476,520" fill="#2D2C33" />
        <polygon points="430,440 750,404 792,478 476,520" fill="none" stroke="#FFF8EE" strokeWidth="3" strokeDasharray="14 12" opacity="0.7" />
        <polyline points="460,486 600,470 760,448" fill="none" stroke="#FFF8EE" strokeWidth="2.5" strokeDasharray="10 12" opacity="0.7" />

        <g transform="translate(610 462) scale(1.25)">
          <rect x="-34" y="-12" width="14" height="6" rx="2" fill="#0A0A0A" />
          <rect x="14" y="-12" width="14" height="6" rx="2" fill="#0A0A0A" />
          <rect x="-34" y="10" width="14" height="6" rx="2" fill="#0A0A0A" />
          <rect x="14" y="10" width="14" height="6" rx="2" fill="#0A0A0A" />
          <rect x="-44" y="-14" width="88" height="30" rx="12" fill="#5B3DB4" />
          <rect x="-12" y="-9" width="30" height="20" rx="7" fill={INK} opacity="0.85" />
          <rect x="-50" y="-17" width="8" height="36" rx="3" fill={INK} />
          <rect x="-2" y="-30" width="20" height="14" rx="3" fill="#26262B" />
          <circle cx="20" cy="-23" r="5" fill="#9AD1FF" />
          <circle cx="20" cy="-23" r="2" fill={INK} />
          <circle cx="-26" cy="1" r="6" fill="#FFF8EE" />
        </g>
      </g>

      <path
        d="M 632 428 C 560 320 380 240 262 220"
        fill="none"
        stroke="#F7941D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="4 12"
      />
      <polygon points="262,220 282,210 280,232" fill="#F7941D" />
    </svg>
  );
}
