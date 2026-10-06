const STRIPES = Array.from({ length: 8 }, (_, i) => i);

const CARS = [
  { x: 318, y: 238, r: 22, body: '#F7941D', accent: '#14100C' },
  { x: 292, y: 372, r: -12, body: '#F7941D', accent: '#14100C' },
  { x: 428, y: 330, r: 28, body: '#F7941D', accent: '#14100C' },
  { x: 508, y: 262, r: 205, body: '#F4EFE6', accent: '#F7941D' },
  { x: 520, y: 398, r: 160, body: '#F4EFE6', accent: '#F7941D' },
];

function Car({ x, y, r, body, accent }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(1.1)`}>
      <rect x="-14" y="-10" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="5" y="-10" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="-14" y="6.5" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="5" y="6.5" width="9" height="3.5" rx="1.2" fill="#0A0A0A" />
      <rect x="-18" y="-7.5" width="36" height="15" rx="6" fill={body} />
      <rect x="-3" y="-7.5" width="3.5" height="15" fill={accent} opacity="0.85" />
      <rect x="-7" y="-5" width="15" height="10" rx="3.5" fill="#14100C" opacity="0.88" />
    </g>
  );
}

function Goal({ x }) {
  return (
    <g>
      <rect x={x} y="252" width="40" height="96" rx="4" fill="url(#goalMesh)" stroke="#8C8C94" strokeWidth="3" />
    </g>
  );
}

export default function FootballIllustration() {
  return (
    <svg
      viewBox="0 0 800 600"
      role="img"
      aria-label="Ilustración: cancha de fútbol sobre una mesa con autos RC pequeños de dos equipos, una pelota y dos arcos"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="goalMesh" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#ECECEE" />
          <circle cx="4" cy="4" r="1.6" fill="#9A9AA2" />
        </pattern>
      </defs>

      <rect width="800" height="600" fill="#8A5A33" />
      <rect x="0" y="560" width="800" height="40" fill="#74492A" />
      <rect x="28" y="28" width="744" height="544" rx="14" fill="#2F8F4E" />
      {STRIPES.map((i) => (
        <rect key={i} x={28 + i * 93} y="28" width="93" height="544" fill={i % 2 ? '#2F8F4E' : '#36A057'} />
      ))}

      <g fill="none" stroke="#FFF8EE" strokeWidth="4" opacity="0.92">
        <rect x="48" y="48" width="704" height="504" />
        <line x1="400" y1="48" x2="400" y2="552" />
        <circle cx="400" cy="300" r="72" />
        <rect x="48" y="190" width="120" height="220" />
        <rect x="632" y="190" width="120" height="220" />
        <rect x="48" y="245" width="50" height="110" />
        <rect x="702" y="245" width="50" height="110" />
      </g>
      <circle cx="400" cy="300" r="6" fill="#FFF8EE" />

      <Goal x={14} />
      <Goal x={746} />

      <g transform="translate(468 322)">
        <circle r="13" fill="#FFFFFF" stroke="#14100C" strokeWidth="2" />
        <polygon points="0,-6 5.7,-1.9 3.5,4.9 -3.5,4.9 -5.7,-1.9" fill="#14100C" />
      </g>

      {CARS.map((car) => (
        <Car key={`${car.x}-${car.y}`} {...car} />
      ))}
    </svg>
  );
}
