import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ExternalLink, X } from 'lucide-react'
import { categoryLabels } from '../data/projects'
import type { Project } from '../types'
import { GithubIcon } from './Icons'
import { ProjectImage } from './ProjectImage'

interface Props {
  project: Project
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <section>
      <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-gold">{title}</h3>
      <ul className="space-y-1.5 text-sm text-silver">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.querySelector<HTMLElement>('[data-close]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-obsidian/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="hud-panel max-h-[92vh] w-full max-w-3xl overflow-y-auto"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative aspect-[16/7] border-b border-line">
          <ProjectImage project={project} />
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label="Fechar detalhes do projeto"
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center border border-line bg-obsidian/90 text-ivory hover:border-gold"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div>
            <p className="mb-2 flex gap-3 font-mono text-xs uppercase tracking-widest">
              <span className="text-gold">{categoryLabels[project.category]}</span>
              <span className="text-silver">{project.status}</span>
            </p>
            <h2 id="project-dialog-title" className="text-2xl font-extrabold sm:text-3xl">
              {project.name}
            </h2>
            <p className="mt-3 text-silver">{project.summary}</p>
          </div>

          <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {project.tech.map((t) => (
              <li key={t} className="chip">{t}</li>
            ))}
          </ul>

          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-gold">Problema</h3>
              <p className="text-sm text-silver">{project.problem}</p>
            </section>
            <section>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-gold">Solução</h3>
              <p className="text-sm text-silver">{project.solution}</p>
            </section>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <DetailList title="Funcionalidades" items={project.features} />
            <DetailList title="Desafios técnicos" items={project.challenges} />
          </div>

          <div className="flex flex-wrap gap-3">
            {project.demo && (
              <a className="btn btn-primary" href={project.demo.href} target="_blank" rel="noopener noreferrer">
                {project.demo.label} <ExternalLink size={16} aria-hidden="true" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            )}
            {project.repo && (
              <a className="btn" href={project.repo.href} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> {project.repo.label}
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            )}
            {!project.demo && !project.repo && (
              <p className="font-mono text-xs text-silver">
                Sem demonstração ou repositório público no momento.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
