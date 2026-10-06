const M = { a: 0.9, b: 0.08, c: -0.3, d: 0.5, e: 210, f: 84 };
const WALL = 12;
const DECK = 32;
const L = 600;
const W = 400;
const RIM = 16;

const WOOD_TOP = '#E7BD83';
const WOOD_INNER = '#C99557';
const WOOD_INNER_DARK = '#B8834A';
const WOOD_FACE = '#C48F52';
const WOOD_FACE_DARK = '#A87240';

const pt = (x, y, z = 0) => [M.a * x + M.c * y + M.e, M.b * x + M.d * y + M.f - z];
const poly = (points) =>
  points
    .map(([x, y, z = 0]) =>
      pt(x, y, z)
        .map((n) => n.toFixed(1))
        .join(',')
    )
    .join(' ');

const STRIPES = Array.from({ length: 12 }, (_, i) => i);

const RED_TEAM = [
  { x: 150, y: 205, r: 8 },
  { x: 232, y: 118, r: -28 },
  { x: 318, y: 236, r: 18 },
];
const GREEN_TEAM = [
  { x: 480, y: 168, r: 192 },
  { x: 420, y: 290, r: 158 },
  { x: 540, y: 232, r: 178 },
];

function RedCar({ x, y, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(1.75)`}>
      <rect x="-16" y="-6" width="38" height="18" rx="7" fill="#14100C" opacity="0.28" />
      <rect x="-14" y="-10.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="5" y="-10.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="-14" y="6.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="5" y="6.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="-18.5" y="-8.5" width="37" height="17" rx="6.5" fill="#D7263D" />
      <rect x="-7" y="-6" width="15" height="12" rx="4" fill="#14100C" opacity="0.85" />
      <rect x="-20" y="-9.5" width="4" height="19" rx="1.5" fill="#8E1424" />
    </g>
  );
}

function GreenCar({ x, y, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(1.75)`}>
      <rect x="-16" y="-6" width="38" height="18" rx="7" fill="#14100C" opacity="0.28" />
      <rect x="-14" y="-10.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="5" y="-10.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="-14" y="6.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="5" y="6.5" width="9" height="4" rx="1.5" fill="#0A0A0A" />
      <rect x="-18.5" y="-8.5" width="37" height="17" rx="6.5" fill="#1E8C4A" />
      <rect x="-11" y="-8.5" width="2.4" height="17" fill="#FFD23F" />
      <rect x="8" y="-8.5" width="2.4" height="17" fill="#FFD23F" />
      <rect x="-6" y="-5" width="11" height="10" rx="3.5" fill="#F4F1EA" />
    </g>
  );
}

function Goal({ backX, mouthX }) {
  const H = 22;
  const y1 = 150;
  const y2 = 250;
  const line = { stroke: '#FFFFFF', strokeWidth: 2.6, strokeLinecap: 'round', fill: 'none' };
  const segment = (a, b) => <polyline points={poly([a, b])} {...line} />;

  return (
    <g>
      <polygon points={poly([[backX, y1, 0], [backX, y2, 0], [backX, y2, H], [backX, y1, H]])} fill="#FFFFFF" opacity="0.34" />
      <polygon points={poly([[backX, y1, 0], [mouthX, y1, 0], [mouthX, y1, H], [backX, y1, H]])} fill="#FFFFFF" opacity="0.42" />
      <polygon points={poly([[backX, y2, 0], [mouthX, y2, 0], [mouthX, y2, H], [backX, y2, H]])} fill="#FFFFFF" opacity="0.3" />
      <polygon points={poly([[backX, y1, H], [mouthX, y1, H], [mouthX, y2, H], [backX, y2, H]])} fill="#FFFFFF" opacity="0.22" />
      {segment([mouthX, y1, 0], [mouthX, y1, H])}
      {segment([mouthX, y2, 0], [mouthX, y2, H])}
      {segment([mouthX, y1, H], [mouthX, y2, H])}
      {segment([backX, y1, H], [backX, y2, H])}
      {segment([backX, y1, H], [mouthX, y1, H])}
      {segment([backX, y2, H], [mouthX, y2, H])}
    </g>
  );
}

function Trestle({ x }) {
  const [sx, sy] = pt(x, W + RIM, -DECK);
  const leg = { stroke: '#26262B', strokeWidth: 9, strokeLinecap: 'butt' };
  const t = 0.55;

  return (
    <g>
      <line x1={sx - 36} y1={sy + 14} x2={sx - 84} y2={sy + 172} {...leg} />
      <line x1={sx + 36} y1={sy + 22} x2={sx + 88} y2={sy + 178} {...leg} />
      <line
        x1={sx - 36 - t * 48}
        y1={sy + 14 + t * 158}
        x2={sx + 36 + t * 52}
        y2={sy + 22 + t * 156}
        stroke="#26262B"
        strokeWidth="5"
      />
      <polygon
        points={`${sx - 46},${sy - 1} ${sx + 46},${sy + 15} ${sx + 46},${sy + 26} ${sx - 46},${sy + 10}`}
        fill="#F2A900"
        stroke="#C98700"
        strokeWidth="1"
      />
    </g>
  );
}

export default function FootballIllustration() {
  const [ballX, ballY] = pt(358, 204);

  return (
    <svg
      viewBox="0 0 800 600"
      role="img"
      aria-label="Ilustración: mesa de fútbol sobre caballetes plegables, con autos RC pequeños de dos equipos (rojos y verdes), una pelota y dos arcos"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="600" fill="#EBDCC4" />
      <rect y="470" width="800" height="130" fill="#E2D1B6" />
      <ellipse cx="400" cy="530" rx="340" ry="38" fill="#14100C" opacity="0.12" />


      <g transform={`matrix(${M.a} ${M.b} ${M.c} ${M.d} ${M.e} ${M.f})`}>
        <rect width={L} height={W} fill="#2F8F4E" />
        {STRIPES.map((i) => (
          <rect key={i} x={i * 50} width="50" height={W} fill={i % 2 ? '#2F8F4E' : '#37A258'} />
        ))}
        <g fill="none" stroke="#FFF8EE" strokeWidth="3.2" opacity="0.94">
          <rect x="18" y="18" width={L - 36} height={W - 36} />
          <line x1={L / 2} y1="18" x2={L / 2} y2={W - 18} />
          <circle cx={L / 2} cy={W / 2} r="52" />
          <rect x="18" y="105" width="96" height="190" />
          <rect x={L - 114} y="105" width="96" height="190" />
          <rect x="18" y="150" width="40" height="100" />
          <rect x={L - 58} y="150" width="40" height="100" />
        </g>
        <circle cx={L / 2} cy={W / 2} r="4.5" fill="#FFF8EE" />
        {RED_TEAM.map((car) => (
          <RedCar key={`r-${car.x}`} {...car} />
        ))}
        {GREEN_TEAM.map((car) => (
          <GreenCar key={`g-${car.x}`} {...car} />
        ))}
      </g>

      <polygon points={poly([[0, 0, 0], [L, 0, 0], [L, 0, WALL], [0, 0, WALL]])} fill={WOOD_INNER} />
      <polygon points={poly([[0, 0, 0], [0, W, 0], [0, W, WALL], [0, 0, WALL]])} fill={WOOD_INNER_DARK} />

      <Goal backX={4} mouthX={30} />
      <Goal backX={L - 4} mouthX={L - 30} />

      <ellipse cx={ballX + 3} cy={ballY + 5} rx="9" ry="4" fill="#14100C" opacity="0.3" />
      <circle cx={ballX} cy={ballY - 6} r="8" fill="#FFFFFF" stroke="#14100C" strokeWidth="1.6" />
      <polygon
        points={`${ballX},${ballY - 11} ${ballX + 4},${ballY - 8} ${ballX + 2.5},${ballY - 3.2} ${ballX - 2.5},${ballY - 3.2} ${ballX - 4},${ballY - 8}`}
        fill="#14100C"
      />

      <polygon points={poly([[-RIM, -RIM, WALL], [L + RIM, -RIM, WALL], [L + RIM, 0, WALL], [-RIM, 0, WALL]])} fill={WOOD_TOP} />
      <polygon points={poly([[-RIM, -RIM, WALL], [0, -RIM, WALL], [0, W + RIM, WALL], [-RIM, W + RIM, WALL]])} fill={WOOD_TOP} />

      <polygon points={poly([[-RIM, W, WALL], [L + RIM, W, WALL], [L + RIM, W + RIM, WALL], [-RIM, W + RIM, WALL]])} fill={WOOD_TOP} />
      <polygon points={poly([[L, -RIM, WALL], [L + RIM, -RIM, WALL], [L + RIM, W + RIM, WALL], [L, W + RIM, WALL]])} fill={WOOD_TOP} />
      <polygon points={poly([[-RIM, W + RIM, WALL], [L + RIM, W + RIM, WALL], [L + RIM, W + RIM, -DECK], [-RIM, W + RIM, -DECK]])} fill={WOOD_FACE} />
      <polygon points={poly([[L + RIM, -RIM, WALL], [L + RIM, W + RIM, WALL], [L + RIM, W + RIM, -DECK], [L + RIM, -RIM, -DECK]])} fill={WOOD_FACE_DARK} />

      <Trestle x={150} />
      <Trestle x={450} />
    </svg>
  );
}
