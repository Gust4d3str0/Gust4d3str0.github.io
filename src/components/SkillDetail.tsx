import { branches, contextLabels, skills } from '../data/skills'
import { projects } from '../data/projects'
import type { Selection } from '../types'
import { sharedProjectSkillIds } from '../utils/skillTree'
import { ClassSymbol } from './ClassSymbol'
import { branchEmblem } from './emblems'
import { ProjectImage } from './ProjectImage'

interface Props {
  selection: Selection | null
  onSelect: (s: Selection) => void
  onOpenProject: (id: string) => void
}

function Ornament() {
  return (
    <div className="my-4 flex items-center gap-2 text-gold/70" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
      <svg width="12" height="12" viewBox="-6 -6 12 12">
        <path d="M0-5 5 0 0 5-5 0Z" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-silver">{children}</h4>
}

export function SkillDetail({ selection, onSelect, onOpenProject }: Props) {
  let content: React.ReactNode

  if (!selection) {
    content = (
      <>
        <p className="font-mono text-xs uppercase tracking-widest text-gold">Códice</p>
        <h3 className="mt-1 text-lg font-bold">Selecione uma habilidade</h3>
        <Ornament />
        <p className="text-sm text-silver">
          Escolha um nó da árvore ou um item da lista para ver onde a tecnologia foi usada e quais
          projetos se relacionam com ela. As conexões indicam relações de uso, não níveis de domínio.
        </p>
      </>
    )
  } else if (selection.kind === 'branch') {
    const branch = branches.find((b) => b.id === selection.id)!
    const items = skills.filter((s) => s.branch === branch.id)
    content = (
      <>
        <div className="flex items-center gap-4">
          <ClassSymbol id={branchEmblem[branch.id]} active className="w-16 shrink-0" />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Ramo</p>
            <h3 className="text-xl font-bold">{branch.label}</h3>
          </div>
        </div>
        <Ornament />
        <p className="text-sm text-silver">{branch.description}</p>
        <div className="mt-4">
          <Label>Habilidades do ramo</Label>
          <ul className="flex flex-wrap gap-2">
            {items.map((s) => (
              <li key={s.id}>
                <button type="button" className="chip min-h-8 hover:border-gold hover:text-gold-soft"
                  onClick={() => onSelect({ kind: 'skill', id: s.id })}>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  } else {
    const skill = skills.find((s) => s.id === selection.id)!
    const branch = branches.find((b) => b.id === skill.branch)!
    const relatedProjects = projects.filter((p) => skill.projects.includes(p.id))
    const relatedIds = new Set([
      ...(skill.related ?? []),
      ...skills.filter((s) => s.related?.includes(skill.id)).map((s) => s.id),
      ...sharedProjectSkillIds(skill.id),
    ])
    const relatedSkills = skills.filter((s) => relatedIds.has(s.id))
    content = (
      <>
        <div className="flex items-center gap-4">
          <ClassSymbol id={branchEmblem[branch.id]} active className="w-16 shrink-0" />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {branch.label} · {skill.kind === 'conceito' ? 'Conceito' : 'Tecnologia'}
            </p>
            <h3 className="text-xl font-bold">{skill.label}</h3>
          </div>
        </div>
        <Ornament />
        <p className="text-sm text-silver">{skill.summary}</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-silver">Contexto</dt>
            <dd className="text-ivory">{contextLabels[skill.context]}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-silver">Onde usei</dt>
            <dd className="text-ivory">{skill.usage}</dd>
          </div>
        </dl>

        {relatedSkills.length > 0 && (
          <>
            <Ornament />
            <Label>Relacionadas</Label>
            <ul className="flex flex-wrap gap-1.5">
              {relatedSkills.map((s) => (
                <li key={s.id}>
                  <button type="button" className="chip min-h-8 hover:border-gold hover:text-gold-soft"
                    onClick={() => onSelect({ kind: 'skill', id: s.id })}>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <Ornament />
        <Label>Projetos</Label>
        {relatedProjects.length === 0 ? (
          <p className="text-sm text-silver">Nenhum projeto vinculado diretamente.</p>
        ) : (
          <ul className="space-y-2">
            {relatedProjects.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => onOpenProject(p.id)}
                  className="group flex w-full items-center gap-3 border border-line bg-obsidian/60 p-2 text-left transition-colors hover:border-gold/60"
                >
                  <span aria-hidden="true" className="block aspect-video w-16 shrink-0 overflow-hidden border border-line">
                    <ProjectImage project={p} />
                  </span>
                  <span className="min-w-0 text-sm font-semibold text-ivory group-hover:text-gold-soft">{p.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  return (
    <aside className="codex p-5 sm:p-6" aria-live="polite" aria-label="Detalhes da habilidade selecionada">
      {content}
    </aside>
  )
}
