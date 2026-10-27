import { useMemo, useRef, useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import { branches, skills } from '../data/skills'
import type { Selection } from '../types'
import { TREE_EXTENT_X, TREE_EXTENT_Y, computeLayout, relatedSkillIds } from '../utils/skillTree'
import { EmblemArt, branchEmblem } from './emblems'

interface Props {
  selection: Selection | null
  onSelect: (s: Selection | null) => void
}

const MIN_ZOOM = 1
const MAX_ZOOM = 2.6
const BRONZE = '#8a6a3d'
const GOLD = '#e6d29c'

type NodeState = 'idle' | 'selected' | 'related' | 'dim'

/** Medalhão de tecnologia (círculo) ou conceito/habilidade (losango). */
function Medallion({ concept, used, state }: { concept: boolean; used: boolean; state: NodeState }) {
  const shape = (metal: string, plate: boolean) => {
    const common = concept
      ? { d: 'M0-24 20 0 0 24-20 0Z' }
      : { d: 'M0-20A20 20 0 1 1 0 20A20 20 0 1 1 0-20Z' }
    const inner = concept ? 'M0-17 14 0 0 17-14 0Z' : 'M0-15A15 15 0 1 1 0 15A15 15 0 1 1 0-15Z'
    return (
      <>
        {plate && <path d={common.d} fill="url(#plate)" />}
        {plate && <path d={common.d} fill="url(#hatch)" />}
        {plate && <path d={common.d} fill="none" stroke="#000" strokeOpacity="0.65" strokeWidth="3.4" transform="translate(0 1)" />}
        <path d={common.d} fill="none" stroke={metal} strokeWidth="2.2" strokeLinejoin="round" />
        <path d={inner} fill="none" stroke={metal} strokeWidth="0.9" strokeOpacity="0.7" />
        <path d="M0-6 5 0 0 6-5 0Z" fill={used ? metal : 'none'} stroke={metal} strokeWidth="1.2" />
        {!concept && (
          <>
            <circle cy="-20" r="1.8" fill={metal} />
            <circle cy="20" r="1.8" fill={metal} />
            <circle cx="-20" r="1.8" fill={metal} />
            <circle cx="20" r="1.8" fill={metal} />
          </>
        )}
      </>
    )
  }
  return (
    <g className={state === 'selected' ? 'emb-on' : state === 'related' ? 'emb-rel' : undefined}>
      <circle r={36} fill="url(#emb-glow)" className="emb-lit emb-glow" />
      {shape(BRONZE, true)}
      <g className="emb-lit">{shape(GOLD, false)}</g>
      {state === 'selected' && (
        <path
          d={concept ? 'M0-31 27 0 0 31-27 0Z' : 'M0-28A28 28 0 1 1 0 28A28 28 0 1 1 0-28Z'}
          fill="none"
          stroke={GOLD}
          strokeWidth="1.4"
          strokeDasharray="2 4"
        />
      )}
    </g>
  )
}

export function SkillTree({ selection, onSelect }: Props) {
  const layout = useMemo(() => computeLayout(), [])
  const [view, setView] = useState({ cx: 0, cy: 0, k: 1 })
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const w = (2 * TREE_EXTENT_X) / view.k
  const h = (2 * TREE_EXTENT_Y) / view.k
  const viewBox = `${view.cx - w / 2} ${view.cy - h / 2} ${w} ${h}`

  const clampView = (cx: number, cy: number, k: number) => {
    const lx = TREE_EXTENT_X * (1 - 1 / k)
    const ly = TREE_EXTENT_Y * (1 - 1 / k)
    return { k, cx: Math.max(-lx, Math.min(lx, cx)), cy: Math.max(-ly, Math.min(ly, cy)) }
  }
  const zoomBy = (factor: number) =>
    setView((v) => clampView(v.cx, v.cy, Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, v.k * factor))))

  const activeSkill = selection?.kind === 'skill' ? skills.find((s) => s.id === selection.id) : undefined
  const activeBranch = selection?.kind === 'branch' ? selection.id : activeSkill?.branch
  const related = activeSkill ? new Set(relatedSkillIds(activeSkill.id)) : new Set<string>()
  const hasSelection = selection !== null

  const skillState = (id: string, branch: string): NodeState => {
    if (!hasSelection) return 'idle'
    if (activeSkill?.id === id) return 'selected'
    if (related.has(id)) return 'related'
    if (selection?.kind === 'branch' && branch === selection.id) return 'related'
    return 'dim'
  }

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.target as Element).getAttribute('data-bg') === null) return
    drag.current = { x: e.clientX, y: e.clientY, cx: view.cx, cy: view.cy }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current || !svgRef.current) return
    const unit = w / svgRef.current.getBoundingClientRect().width
    const d = drag.current
    setView((v) => clampView(d.cx - (e.clientX - d.x) * unit, d.cy - (e.clientY - d.y) * unit, v.k))
  }
  const endDrag = () => {
    drag.current = null
  }
  const keyActivate = (e: React.KeyboardEvent, s: Selection) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(s)
    }
  }

  return (
    <div className="hud-panel p-2 sm:p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-2">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-silver" aria-label="Legenda">
          <li className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="-12 -12 24 24" aria-hidden="true">
              <circle r="9" fill="none" stroke={BRONZE} strokeWidth="2" />
              <path d="M0-3 3 0 0 3-3 0Z" fill={BRONZE} />
            </svg>
            Tecnologia usada
          </li>
          <li className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="-12 -12 24 24" aria-hidden="true">
              <circle r="9" fill="none" stroke={BRONZE} strokeWidth="2" />
              <path d="M0-3 3 0 0 3-3 0Z" fill="none" stroke={BRONZE} />
            </svg>
            Estudo ou base
          </li>
          <li className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="-12 -12 24 24" aria-hidden="true">
              <path d="M0-10 9 0 0 10-9 0Z" fill="none" stroke={BRONZE} strokeWidth="2" />
            </svg>
            Conceito ou habilidade
          </li>
        </ul>
        <div className="flex gap-1" role="group" aria-label="Controles de zoom">
          <button type="button" className="btn !min-h-9 !p-2" onClick={() => zoomBy(1.25)} aria-label="Aproximar">
            <Plus size={16} />
          </button>
          <button type="button" className="btn !min-h-9 !p-2" onClick={() => zoomBy(0.8)} aria-label="Afastar">
            <Minus size={16} />
          </button>
          <button
            type="button"
            className="btn !min-h-9 !p-2"
            onClick={() => setView({ cx: 0, cy: 0, k: 1 })}
            aria-label="Restaurar visualização"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={viewBox}
        role="group"
        aria-label="Árvore de habilidades interativa. Use Tab para navegar entre os nós e Enter para selecionar."
        className="w-full touch-none select-none"
        style={{ aspectRatio: `${TREE_EXTENT_X} / ${TREE_EXTENT_Y}`, cursor: drag.current ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <rect
          data-bg
          x={-TREE_EXTENT_X * 2}
          y={-TREE_EXTENT_Y * 2}
          width={TREE_EXTENT_X * 4}
          height={TREE_EXTENT_Y * 4}
          fill="transparent"
          onClick={() => onSelect(null)}
        />
        {[190, 340, 480].map((r) => (
          <ellipse key={r} rx={r * 1.2} ry={r} fill="none" stroke="#2a3238" strokeDasharray="2 9" opacity={0.6} />
        ))}
        <circle r={150} fill="url(#emb-glow)" opacity={0.7} />

        {/* Conexões em bronze envelhecido; iluminadas quando relacionadas à seleção */}
        <g fill="none" strokeLinecap="round">
          {branches.map((b) => {
            const p = layout.branches[b.id]
            const on = activeBranch === b.id
            return (
              <g key={b.id} opacity={hasSelection && !on ? 0.25 : 1}>
                <line x1={0} y1={0} x2={p.x} y2={p.y} stroke="#07080a" strokeWidth={6} />
                {on && <line x1={0} y1={0} x2={p.x} y2={p.y} stroke={GOLD} strokeOpacity={0.22} strokeWidth={11} />}
                <line x1={0} y1={0} x2={p.x} y2={p.y} stroke={on ? GOLD : BRONZE} strokeWidth={on ? 3.4 : 2.8} />
              </g>
            )
          })}
          {skills.map((s) => {
            const from = layout.branches[s.branch]
            const to = layout.skills[s.id]
            const st = skillState(s.id, s.branch)
            const lit = st === 'selected' || st === 'related'
            return (
              <g key={s.id} opacity={hasSelection ? (lit ? 1 : 0.14) : 1}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#07080a" strokeWidth={4.6} />
                {lit && <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={GOLD} strokeOpacity={0.22} strokeWidth={9} />}
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={lit ? GOLD : BRONZE} strokeWidth={lit ? 3 : 2} strokeOpacity={lit ? 1 : 0.8} />
              </g>
            )
          })}
          {skills.flatMap((s) =>
            (s.related ?? []).map((rid) => {
              const a = layout.skills[s.id]
              const b = layout.skills[rid]
              const lit = activeSkill && (activeSkill.id === s.id || activeSkill.id === rid)
              return (
                <line key={`${s.id}-${rid}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#9a86b6" strokeDasharray="6 6" strokeWidth={lit ? 2.6 : 1.4}
                  opacity={hasSelection ? (lit ? 0.95 : 0.06) : 0.4} />
              )
            }),
          )}
        </g>

        {/* Núcleo */}
        <g transform="scale(1.3)">
          <EmblemArt kind="nucleo" active={!hasSelection} />
        </g>
        <text y={98} textAnchor="middle" fontSize={20} fontWeight={800} fill="#f0ede6" fontFamily="Manrope, sans-serif"
          stroke="#0b0d0f" strokeWidth={5} paintOrder="stroke">
          Desenvolvimento
        </text>
        <text y={120} textAnchor="middle" fontSize={20} fontWeight={800} fill="#f0ede6" fontFamily="Manrope, sans-serif"
          stroke="#0b0d0f" strokeWidth={5} paintOrder="stroke">
          de Software
        </text>

        {/* Especializações (ramos) */}
        {branches.map((b) => {
          const p = layout.branches[b.id]
          const on = activeBranch === b.id
          const sel = selection?.kind === 'branch' && selection.id === b.id
          return (
            <g
              key={b.id}
              className="skill-node emb-hover"
              role="button"
              tabIndex={0}
              aria-pressed={sel}
              aria-label={`Ramo ${b.label}`}
              onClick={() => onSelect({ kind: 'branch', id: b.id })}
              onKeyDown={(e) => keyActivate(e, { kind: 'branch', id: b.id })}
              transform={`translate(${p.x} ${p.y})`}
              opacity={hasSelection && !on ? 0.5 : 1}
              style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
            >
              <title>{`${b.label} — ${b.description}`}</title>
              <circle r={46} fill="transparent" />
              <g transform="scale(.8)">
                <EmblemArt kind={branchEmblem[b.id]} active={on} />
              </g>
              <circle className="node-ring" r={52} fill="none" stroke="transparent" strokeWidth={3} strokeDasharray="4 4" />
              <text y={72} textAnchor="middle" fontSize={20} fontWeight={800} fill={on ? '#e6d29c' : '#f0ede6'}
                fontFamily="Manrope, sans-serif" stroke="#0b0d0f" strokeWidth={5} paintOrder="stroke">
                {b.short}
              </text>
            </g>
          )
        })}

        {/* Tecnologias, habilidades e conceitos */}
        {skills.map((s) => {
          const p = layout.skills[s.id]
          const st = skillState(s.id, s.branch)
          const isSel = st === 'selected'
          const used = s.context === 'projetos' || s.context === 'profissional'
          return (
            <g
              key={s.id}
              className="skill-node emb-hover"
              role="button"
              tabIndex={0}
              aria-pressed={isSel}
              aria-label={`${s.label}. ${s.summary}`}
              onClick={() => onSelect({ kind: 'skill', id: s.id })}
              onKeyDown={(e) => keyActivate(e, { kind: 'skill', id: s.id })}
              transform={`translate(${p.x} ${p.y})`}
              opacity={st === 'dim' ? 0.38 : 1}
              style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
            >
              <title>{`${s.label} — ${s.summary}`}</title>
              <circle r={30} fill="transparent" />
              <Medallion concept={s.kind === 'conceito'} used={used} state={st} />
              <circle className="node-ring" r={33} fill="none" stroke="transparent" strokeWidth={3} strokeDasharray="4 4" />
              <text y={48} textAnchor="middle" fontSize={18} fill={isSel ? '#e6d29c' : '#f0ede6'} fontWeight={isSel ? 700 : 500}
                fontFamily="Inter, sans-serif" stroke="#0b0d0f" strokeWidth={5} paintOrder="stroke">
                {s.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
