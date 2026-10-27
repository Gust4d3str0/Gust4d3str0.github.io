import { ArrowUpRight } from 'lucide-react'
import { categoryLabels } from '../data/projects'
import type { Project } from '../types'
import { ProjectImage } from './ProjectImage'

interface Props {
  project: Project
  onOpen: (id: string) => void
}

export function ProjectCard({ project, onOpen }: Props) {
  return (
    <article className="hud-panel hud-glow flex h-full flex-col">
      <div className="aspect-[16/9] border-b border-line">
        <ProjectImage project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-widest">
          <span className="text-gold">{categoryLabels[project.category]}</span>
          <span className="text-silver">{project.status}</span>
        </div>
        <h3 className="text-xl font-bold text-ivory">{project.name}</h3>
        <p className="text-sm text-silver">{project.summary}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label={`Tecnologias de ${project.name}`}>
          {project.tech.map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-gold-soft hover:text-ivory"
          aria-haspopup="dialog"
        >
          Ver detalhes <span className="sr-only">de {project.name}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
