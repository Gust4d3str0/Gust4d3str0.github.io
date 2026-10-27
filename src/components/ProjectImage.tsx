import type { Project } from '../types'

/** Mostra a imagem real do projeto ou um placeholder claramente identificado. */
export function ProjectImage({ project, className = '' }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? `Captura de tela do projeto ${project.name}`}
        loading="lazy"
        className={`h-full w-full object-cover object-top ${className}`}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder: imagem de ${project.name} ainda não adicionada`}
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-obsidian ${className}`}
    >
      <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={`grid-${project.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" fill="none" stroke="#2a3238" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="100" fill={`url(#grid-${project.id})`} />
        <path d="M100 12 150 50 100 88 50 50Z" fill="none" stroke="#b99a5b" strokeOpacity="0.45" />
        <path d="M100 28 128 50 100 72 72 50Z" fill="none" stroke="#58476d" strokeOpacity="0.8" />
      </svg>
      <span className="relative font-mono text-[0.7rem] uppercase tracking-widest text-silver">
        Imagem pendente
      </span>
      <span className="relative font-display text-sm font-semibold text-gold-soft">{project.name}</span>
    </div>
  )
}
