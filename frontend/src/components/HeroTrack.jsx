import { useReducedMotion } from 'framer-motion';

const TRACK =
  'M 130 140 C 130 90 170 70 220 70 L 460 70 C 520 70 550 105 550 150 L 550 250 C 550 300 515 320 470 320 L 330 320 C 290 320 285 270 245 270 C 205 270 200 320 160 320 C 140 320 130 300 130 280 Z';

const CARS = [
  { body: '#F7941D', accent: '#14100C', begin: 0, at: 0.08 },
  { body: '#F4EFE6', accent: '#F7941D', begin: 3.7, at: 0.41 },
  { body: '#FFD23F', accent: '#14100C', begin: 7.4, at: 0.74 },
];

const LAP_SECONDS = 11;

function Car({ body, accent, begin, at, still }) {
  const motion = still
    ? { dur: '0.01s', fill: 'freeze', keyPoints: `${at};${at}`, keyTimes: '0;1', calcMode: 'linear' }
    : { dur: `${LAP_SECONDS}s`, repeatCount: 'indefinite', begin: `-${begin}s` };

  return (
    <g>
      <animateMotion rotate="auto" {...motion}>
        <mpath href="#trackCenter" />
      </animateMotion>
      <rect x="-12" y="-10" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="5" y="-10" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="-12" y="6.5" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="5" y="6.5" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="-18" y="-7.5" width="36" height="15" rx="6" fill={body} />
      <rect x="-3" y="-7.5" width="3.5" height="15" fill={accent} opacity="0.85" />
      <rect x="-7" y="-5" width="15" height="10" rx="3.5" fill="#14100C" opacity="0.88" />
      <rect x="-19" y="-8.5" width="3.5" height="17" rx="1.2" fill={accent} />
    </g>
  );
}

function Cone({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points="0,-10 6.5,6 -6.5,6" fill="#F7941D" />
      <rect x="-2.6" y="-3" width="5.2" height="2.6" fill="#FFF8EE" />
      <rect x="-8" y="6" width="16" height="3" rx="1.5" fill="#14100C" opacity="0.75" />
    </g>
  );
}

export default function HeroTrack() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 640 560"
      role="img"
      aria-label="Ilustración del concepto: tres autos RC pequeños corriendo en una pista y, debajo, una arena con una excavadora y un camión RC"
      className="w-full h-auto drop-shadow-[0_24px_40px_rgba(20,16,12,0.35)]"
    >
      <defs>
        <path id="trackCenter" d={TRACK} fill="none" />
        <pattern id="startChecks" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#FFF8EE" />
          <rect width="4" height="4" fill="#14100C" />
          <rect x="4" y="4" width="4" height="4" fill="#14100C" />
        </pattern>
        <pattern id="sandDots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="1.1" fill="#B98544" opacity="0.55" />
          <circle cx="10" cy="10" r="1.3" fill="#B98544" opacity="0.4" />
        </pattern>
        <radialGradient id="infieldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F7941D" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#F7941D" stopOpacity="0" />
        </radialGradient>
        <clipPath id="logoClip">
          <circle cx="340" cy="166" r="54" />
        </clipPath>
      </defs>

      <rect width="640" height="560" rx="28" fill="#1B1A1F" />

      <circle cx="340" cy="166" r="110" fill="url(#infieldGlow)" />
      <image href="/logo.jpg" x="286" y="112" width="108" height="108" clipPath="url(#logoClip)" preserveAspectRatio="xMidYMid slice" />
      <circle cx="340" cy="166" r="54" fill="none" stroke="#F7941D" strokeWidth="2" opacity="0.7" />

      <path d={TRACK} fill="none" stroke="#C8321E" strokeWidth="56" strokeLinejoin="round" />
      <path d={TRACK} fill="none" stroke="#FFF8EE" strokeWidth="56" strokeLinejoin="round" strokeDasharray="16 16" />
      <path d={TRACK} fill="none" stroke="#2D2C33" strokeWidth="44" strokeLinejoin="round" />
      <path d={TRACK} fill="none" stroke="#FFF8EE" strokeWidth="2" strokeDasharray="12 14" opacity="0.65" />
      <rect x="296" y="48" width="8" height="44" fill="url(#startChecks)" />

      {CARS.map((car) => (
        <Car key={car.body} {...car} still={reduceMotion} />
      ))}

      <rect x="16" y="392" width="608" height="152" rx="20" fill="#DDAA68" />
      <rect x="16" y="392" width="608" height="152" rx="20" fill="url(#sandDots)" />
      <rect x="16" y="392" width="608" height="152" rx="20" fill="none" stroke="#FFF8EE" strokeWidth="2" strokeDasharray="10 8" opacity="0.7" />

      <ellipse cx="310" cy="505" rx="62" ry="18" fill="#E8BE82" />
      <ellipse cx="540" cy="494" rx="46" ry="14" fill="#E8BE82" />
      <path d="M 215 524 Q 300 478 375 522" fill="none" stroke="#B98544" strokeWidth="3" opacity="0.5" strokeLinecap="round" />

      <g transform="translate(58 436) scale(0.85)">
        <rect x="0" y="0" width="64" height="12" rx="5" fill="#26262B" />
        <rect x="0" y="32" width="64" height="12" rx="5" fill="#26262B" />
        <rect x="6" y="6" width="48" height="32" rx="7" fill="#F2A900" />
        <rect x="34" y="10" width="16" height="24" rx="3" fill="#D18F00" />
        <rect x="10" y="11" width="20" height="22" rx="4" fill="#FFC93C" />
        <rect x="13" y="14" width="8" height="16" rx="2" fill="#1C2430" />
        <path d="M 54 22 L 98 8 L 132 26" fill="none" stroke="#F2A900" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 132 26 L 146 16 L 152 30 L 138 38 Z" fill="#26262B" />
      </g>

      <g transform="translate(372 452)">
        <rect x="6" y="-3" width="12" height="4" rx="1.5" fill="#26262B" />
        <rect x="40" y="-3" width="12" height="4" rx="1.5" fill="#26262B" />
        <rect x="6" y="25" width="12" height="4" rx="1.5" fill="#26262B" />
        <rect x="40" y="25" width="12" height="4" rx="1.5" fill="#26262B" />
        <rect x="0" y="0" width="58" height="26" rx="4" fill="#F2A900" />
        <rect x="4" y="4" width="50" height="18" rx="3" fill="#D18F00" />
        <rect x="60" y="3" width="20" height="20" rx="4" fill="#FFC93C" />
        <rect x="69" y="6" width="7" height="14" rx="2" fill="#1C2430" />
      </g>

      <Cone x={232} y={440} />
      <Cone x={252} y={452} />
      <Cone x={578} y={438} />
    </svg>
  );
}
