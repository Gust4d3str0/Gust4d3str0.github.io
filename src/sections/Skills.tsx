import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { SkillDetail } from '../components/SkillDetail'
import { SkillList } from '../components/SkillList'
import { SkillTree } from '../components/SkillTree'
import type { Selection } from '../types'

export function Skills({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [selection, setSelection] = useState<Selection | null>(null)
  const [view, setView] = useState<'tree' | 'list'>('tree')

  return (
    <section id="habilidades" aria-labelledby="habilidades-title" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading index="03" eyebrow="Habilidades" title="Árvore de habilidades" id="habilidades-title">
        Um mapa das tecnologias que estudei e usei. As ligações mostram relações de uso nos projetos,
        não dependências técnicas nem níveis de domínio.
      </SectionHeading>

      <div className="mb-4 hidden gap-2 md:flex" role="group" aria-label="Modo de visualização">
        {(['tree', 'list'] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={`min-h-11 border px-4 text-sm font-semibold ${
              view === v ? 'border-gold bg-gold/15 text-gold-soft' : 'border-line text-silver hover:border-gold/60'
            }`}
          >
            {v === 'tree' ? 'Árvore' : 'Lista'}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className={view === 'tree' ? 'hidden md:block' : 'hidden'}>
            <SkillTree selection={selection} onSelect={setSelection} />
          </div>
          <div className={view === 'list' ? 'block' : 'block md:hidden'}>
            <SkillList selection={selection} onSelect={setSelection} />
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SkillDetail selection={selection} onSelect={setSelection} onOpenProject={onOpenProject} />
        </div>
      </div>
    </section>
  )
}
