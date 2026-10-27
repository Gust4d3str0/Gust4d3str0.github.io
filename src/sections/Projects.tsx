import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'
import { categoryLabels, projects } from '../data/projects'
import type { ProjectCategory } from '../types'

type Filter = 'todos' | ProjectCategory

export function Projects({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>('todos')
  const filters: { id: Filter; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    ...(Object.keys(categoryLabels) as ProjectCategory[]).map((c) => ({ id: c, label: categoryLabels[c] })),
  ]
  const visible = projects.filter((p) => filter === 'todos' || p.category === filter)

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading index="02" eyebrow="Projetos" title="Projetos e artefatos" id="projetos-title">
        Aplicações que construí e projetos acadêmicos. Cada um tem um painel com problema, solução,
        funcionalidades e desafios.
      </SectionHeading>

      <div role="group" aria-label="Filtrar projetos por categoria" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-11 border px-4 text-sm font-semibold transition-colors ${
              filter === f.id ? 'border-gold bg-gold/15 text-gold-soft' : 'border-line text-silver hover:border-gold/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">{visible.length} projeto(s) exibido(s)</p>
      {visible.length === 0 ? (
        <p className="text-silver">Nenhum projeto nesta categoria.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {visible.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 0.06} className="h-full">
                <ProjectCard project={p} onOpen={onOpenProject} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
