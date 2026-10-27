import { motion } from 'motion/react'
import { milestones } from '../data/journey'
import { projects } from '../data/projects'
import { Diamond } from './Icons'

export function Timeline({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <ol className="relative ml-3 space-y-10 md:ml-0">
      {/* Linha de progressão */}
      <span className="absolute bottom-2 left-0 top-2 w-px bg-line md:left-1/2" aria-hidden="true" />
      <motion.span
        className="absolute left-0 top-2 w-px origin-top bg-gradient-to-b from-gold to-violet md:left-1/2"
        style={{ bottom: '0.5rem' }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        aria-hidden="true"
      />
      {milestones.map((m, i) => {
        const project = projects.find((p) => p.id === m.projectId)
        const left = i % 2 === 0
        return (
          <motion.li
            key={m.id}
            className="relative pl-8 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="absolute left-0 top-1.5 -translate-x-1/2 bg-obsidian text-gold md:left-1/2"
              aria-hidden="true"
            >
              <Diamond size={16} />
            </span>
            <div className={left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}>
              <p className="font-mono text-xs uppercase tracking-widest text-gold">{m.period}</p>
              <h3 className="mt-1 text-lg font-bold text-ivory">{m.title}</h3>
              <p className="mt-1 text-sm text-silver">{m.description}</p>
              {project && (
                <button
                  type="button"
                  onClick={() => onOpenProject(project.id)}
                  aria-haspopup="dialog"
                  className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-gold-soft hover:text-ivory"
                >
                  Ver projeto {project.name}
                </button>
              )}
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}
