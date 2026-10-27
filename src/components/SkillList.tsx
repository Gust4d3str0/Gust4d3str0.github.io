import { branches, contextLabels, skills } from '../data/skills'
import type { Selection } from '../types'
import { ClassSymbol } from './ClassSymbol'
import { branchEmblem } from './emblems'

interface Props {
  selection: Selection | null
  onSelect: (s: Selection) => void
}

/** Alternativa em lista da árvore: mobile, leitores de tela e navegação linear. */
export function SkillList({ selection, onSelect }: Props) {
  return (
    <div className="space-y-4">
      {branches.map((b) => (
        <section key={b.id} aria-labelledby={`lista-${b.id}`} className="hud-panel p-4">
          <div className="mb-3 flex items-center gap-3">
            <ClassSymbol id={branchEmblem[b.id]} active={false} className="w-11 shrink-0" />
            <div>
              <h3 id={`lista-${b.id}`} className="text-base font-bold text-gold-soft">{b.label}</h3>
              <p className="text-xs text-silver">{b.description}</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2">
            {skills.filter((s) => s.branch === b.id).map((s) => {
              const on = selection?.kind === 'skill' && selection.id === s.id
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => onSelect({ kind: 'skill', id: s.id })}
                    title={contextLabels[s.context]}
                    className={`min-h-11 border px-3 text-sm transition-colors ${
                      on ? 'border-gold bg-gold/15 text-gold-soft' : 'border-line bg-coal text-ivory hover:border-gold/60'
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
