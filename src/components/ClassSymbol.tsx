import { EmblemArt, type EmblemKind } from './emblems'

interface Props {
  id: EmblemKind | string
  active: boolean
  className?: string
}

/** Insígnia de especialização em <svg> próprio; o selo no topo indica seleção sem depender de cor. */
export function ClassSymbol({ id, active, className = '' }: Props) {
  return (
    <svg
      viewBox="-56 -68 112 124"
      className={`emb-host overflow-visible ${active ? 'emb-on' : ''} ${className}`}
      aria-hidden="true"
    >
      <EmblemArt kind={id as EmblemKind} active={active} />
      {active && (
        <path className="emb-seal" d="M0-66 6-60 0-54-6-60ZM-14-60H-9M9-60H14" fill="url(#g-gold)" stroke="url(#g-gold)" strokeWidth="1.4" />
      )}
    </svg>
  )
}
