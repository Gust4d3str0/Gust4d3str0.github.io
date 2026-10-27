import type { BranchId } from '../types'

export type EmblemKind = 'arquiteto' | 'artifice' | 'alquimista' | 'forjador' | 'dados' | 'ferramentas' | 'nucleo'

export const branchEmblem: Record<BranchId, EmblemKind> = {
  backend: 'arquiteto',
  frontend: 'artifice',
  ia: 'alquimista',
  desktop: 'forjador',
  dados: 'dados',
  ferramentas: 'ferramentas',
}

const rad = (deg: number) => (deg * Math.PI) / 180
const f = (n: number) => n.toFixed(1)

function gearPath(teeth: number, ro: number, ri: number): string {
  const step = 360 / teeth
  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    for (const [r, d] of [[ri, -step * 0.28], [ro, -step * 0.16], [ro, step * 0.16], [ri, step * 0.28]] as const) {
      pts.push(`${f(Math.cos(rad(a + d)) * r)} ${f(Math.sin(rad(a + d)) * r)}`)
    }
  }
  return `M${pts.join('L')}Z`
}

function compassPath(): string {
  const pts: string[] = []
  for (let k = 0; k < 8; k++) {
    const tip = k % 2 === 0 ? 62 : 46
    const a = k * 45 - 90
    pts.push(`${f(Math.cos(rad(a)) * tip)} ${f(Math.sin(rad(a)) * tip)}`)
    const v = a + 22.5
    pts.push(`${f(Math.cos(rad(v)) * 34)} ${f(Math.sin(rad(v)) * 34)}`)
  }
  return `M${pts.join('L')}Z`
}

function ticks(n: number, r1: number, lens: number[]): string {
  return Array.from({ length: n }, (_, i) => {
    const a = rad((i * 360) / n)
    const r2 = r1 + lens[i % lens.length]
    return `M${f(Math.cos(a) * r1)} ${f(Math.sin(a) * r1)}L${f(Math.cos(a) * r2)} ${f(Math.sin(a) * r2)}`
  }).join('')
}

const FRAMES: Record<EmblemKind, string> = {
  arquiteto: 'M-34 42V-6C-34-26-14-40 0-50C14-40 34-26 34-6V42ZM-40 42H40V47H-40Z',
  artifice: 'M0-50 11-40 33-22 29 6 0 48-29 6-33-22-11-40Z',
  alquimista: 'M0-46A46 46 0 1 1 0 46A46 46 0 1 1 0-46Z',
  forjador: 'M-40-42H-14L0-36 14-42H40V4C40 26 20 40 0 49C-20 40-40 26-40 4Z',
  dados: 'M0-48 42-24V24L0 48-42 24V-24Z',
  ferramentas: gearPath(12, 46, 41),
  nucleo: compassPath(),
}

/** Definições compartilhadas (gradientes, texturas, molduras e glifos). Renderizar uma vez por página. */
export function EmblemDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-gold" gradientUnits="userSpaceOnUse" x1="-50" y1="-50" x2="50" y2="50">
          <stop offset="0" stopColor="#f6e8b8" />
          <stop offset="0.35" stopColor="#d8c28a" />
          <stop offset="0.65" stopColor="#b99a5b" />
          <stop offset="1" stopColor="#7d6532" />
        </linearGradient>
        <linearGradient id="g-bronze" gradientUnits="userSpaceOnUse" x1="-50" y1="-50" x2="50" y2="50">
          <stop offset="0" stopColor="#b08d58" />
          <stop offset="0.5" stopColor="#8a6c41" />
          <stop offset="1" stopColor="#5e4a2c" />
        </linearGradient>
        <linearGradient id="plate" gradientUnits="userSpaceOnUse" x1="-50" y1="-50" x2="50" y2="50">
          <stop offset="0" stopColor="#242b31" />
          <stop offset="1" stopColor="#0d1013" />
        </linearGradient>
        <linearGradient id="violet" gradientUnits="userSpaceOnUse" x1="-30" y1="-30" x2="30" y2="30">
          <stop offset="0" stopColor="#9a86b6" />
          <stop offset="0.6" stopColor="#58476d" />
          <stop offset="1" stopColor="#2f2540" />
        </linearGradient>
        <radialGradient id="emb-glow">
          <stop offset="0" stopColor="#d8c28a" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#b99a5b" stopOpacity="0.16" />
          <stop offset="1" stopColor="#b99a5b" stopOpacity="0" />
        </radialGradient>
        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V4" stroke="#d8c28a" strokeOpacity="0.07" strokeWidth="1" />
        </pattern>

        {(Object.keys(FRAMES) as EmblemKind[]).map((k) => (
          <path key={k} id={`fr-${k}`} d={FRAMES[k]} />
        ))}

        {/* Arquiteto: portal de pedra com pedra-chave e grade */}
        <g id="gl-arquiteto">
          <g fill="none">
            <path d="M-23 38V-4C-23-18-11-28 0-33C11-28 23-18 23-4V38" />
            <path d="M-13 38V-1C-13-11-6-18 0-22C6-18 13-11 13-1V38" />
            <path d="M-27 38H27M-33 44H33" />
            <path d="M-8 38V-12M0 38V-17M8 38V-12M-13 6H13M-13 20H13" strokeOpacity="0.6" strokeWidth="0.9" />
            <path d="M-27-4H-19M19-4H27" />
          </g>
          <path d="M0-42 5.5-35 0-28-5.5-35Z" fill="url(#violet)" />
        </g>

        {/* Artífice: gema facetada presa por garras */}
        <g id="gl-artifice">
          <g fill="none">
            <path d="M-21-10-12-24H12L21-10 0 24Z" />
            <path d="M-21-10H21M-12-24-6-10 0 24 6-10 12-24" strokeOpacity="0.7" strokeWidth="1" />
            <path d="M-29-14C-31-22-27-28-21-28M29-14C31-22 27-28 21-28M-4 31 0 36 4 31" />
            <path d="M0-43V-35M-4-39H4" />
          </g>
          <path d="M-6-10 0-24 6-10Z" fill="url(#violet)" />
        </g>

        {/* Alquimista: círculo alquímico com anéis, runas e conexões */}
        <g id="gl-alquimista">
          <g fill="none">
            <circle r="31" />
            <circle r="26" strokeDasharray="1.2 3" strokeOpacity="0.7" strokeWidth="0.9" />
            <path d="M0-22 19 11H-19Z" />
            <path d="M0 12-9-3H9Z" strokeOpacity="0.65" strokeWidth="1" />
            <path d="M0-31V31M-31 0H31" strokeOpacity="0.28" strokeWidth="0.7" />
            <path d={ticks(16, 33.5, [2.4, 4.4, 2.4, 6])} strokeWidth="1.1" />
            <path d="M0-22V-28M19 11 24.5 14M-19 11-24.5 14" />
          </g>
          <circle cy="-31" r="2.8" />
          <circle cx="26.8" cy="15.5" r="2.8" />
          <circle cx="-26.8" cy="15.5" r="2.8" />
          <circle cy="1" r="5" fill="url(#violet)" />
          <circle cy="1" r="1.5" fill="#0b0d0f" />
        </g>

        {/* Forjador: bigorna, martelo e faíscas */}
        <g id="gl-forjador">
          <g fill="none">
            <path d="M-27-2H19L30 3 20 8H10V16H17V25H-17V16H-10V8H-27Z" />
            <path d="M-10 8H10" strokeOpacity="0.6" strokeWidth="0.9" />
            <path d="M-6-16-20-27M-7.7-7.2 2-19.9-4.3-24.8-14-12.1Z" />
            <path d="M10-14 15-20M16-9 24-12M8-22 9-29" strokeWidth="1.3" />
          </g>
          <circle cx="19" cy="-17" r="1.5" />
          <circle cx="26" cy="-6" r="1.3" />
          <circle cy="-35" r="3" fill="url(#violet)" />
        </g>

        {/* Dados: cristais e registros */}
        <g id="gl-dados">
          <g fill="none">
            <path d="M0-30 10-14V16L0 24-10 16V-14Z" />
            <path d="M-10-14H10M0-30V24" strokeOpacity="0.6" strokeWidth="0.9" />
            <path d="M-26-4-19-14-12-4V18L-19 24-26 18Z" />
            <path d="M26-2 19-12 12-2V18L19 24 26 18Z" />
            <path d="M-31 31H31M-23 36H23" strokeOpacity="0.6" strokeWidth="0.9" />
          </g>
          <path d="M0-30 10-14H-10Z" fill="url(#violet)" />
        </g>

        {/* Ferramentas: engrenagem e chave */}
        <g id="gl-ferramentas">
          <g fill="none">
            <g transform="rotate(40)">
              <path d="M-3.5 6V30A3.5 3.5 0 0 0 3.5 30V6" />
              <path d="M-3.5-6V-22L-8-26V-35L-3.5-33H3.5L8-35V-26L3.5-22V-6" />
            </g>
            <path d={gearPath(10, 19, 14)} />
            <circle r="9" strokeOpacity="0.6" strokeWidth="0.9" />
          </g>
          <circle r="4.4" fill="url(#violet)" />
        </g>

        {/* Núcleo: Desenvolvimento de Software (colchetes de código e centelha) */}
        <g id="gl-nucleo">
          <g fill="none">
            <circle r="27" />
            <circle r="22" strokeDasharray="1.2 3" strokeOpacity="0.7" strokeWidth="0.9" />
            <path d="M-9-10-18 0-9 10M9-10 18 0 9 10M3-12-3 12" strokeWidth="2" />
            <path d={ticks(24, 28.5, [2, 3.6])} strokeWidth="1" />
          </g>
          <path d="M0-23 2.4-19 0-15-2.4-19Z" fill="url(#violet)" />
        </g>
      </defs>
    </svg>
  )
}

function Layer({ kind, metal, plate }: { kind: EmblemKind; metal: string; plate: boolean }) {
  const frame = `#fr-${kind}`
  const glyph = `#gl-${kind}`
  return (
    <>
      {plate && (
        <>
          <use href={frame} fill="url(#plate)" />
          <use href={frame} fill="url(#hatch)" />
        </>
      )}
      {plate && <use href={frame} fill="none" stroke="#000" strokeOpacity="0.65" strokeWidth="3.6" transform="translate(0 1.1)" />}
      <use href={frame} fill="none" stroke={metal} strokeWidth="2" strokeLinejoin="round" />
      <use href={frame} fill="none" stroke={metal} strokeWidth="0.8" strokeOpacity="0.75" transform="scale(.89)" />
      {plate && (
        <use href={glyph} stroke="#000" strokeOpacity="0.6" strokeWidth="2.4" fill="#000" fillOpacity="0.5" transform="translate(.7 1)" />
      )}
      <use href={glyph} stroke={metal} fill={metal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

interface ArtProps {
  kind: EmblemKind
  /** Selecionado: acende em ouro, com brilho pulsante suave. */
  active?: boolean
}

/** Insígnia desenhada em coordenadas -52..52, para uso dentro de um <svg> ou <g>. */
export function EmblemArt({ kind, active = false }: ArtProps) {
  return (
    <g className={active ? 'emb-on' : undefined}>
      <circle r={64} fill="url(#emb-glow)" className="emb-lit emb-glow" />
      <Layer kind={kind} metal="url(#g-bronze)" plate />
      <g className="emb-lit">
        <Layer kind={kind} metal="url(#g-gold)" plate={false} />
      </g>
    </g>
  )
}
