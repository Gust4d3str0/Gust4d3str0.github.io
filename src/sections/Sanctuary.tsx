import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ClassSymbol } from '../components/ClassSymbol'
import { Diamond } from '../components/Icons'
import { ProjectImage } from '../components/ProjectImage'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'
import { sanctuaryClasses } from '../data/sanctuary'
import { contextLabels, skills } from '../data/skills'
import type { SkillContext } from '../types'

const contextOrder: SkillContext[] = ['profissional', 'projetos', 'estudos', 'basico']

export function Sanctuary({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [activeId, setActiveId] = useState(sanctuaryClasses[0].id)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const active = sanctuaryClasses.find((c) => c.id === activeId)!

  const techs = skills.filter((s) => s.branch === active.branch)
  const groups = contextOrder
    .map((ctx) => ({ ctx, items: techs.filter((s) => s.context === ctx) }))
    .filter((g) => g.items.length > 0)
  const related = projects.filter((p) => techs.some((s) => s.projects.includes(p.id)))

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = sanctuaryClasses.length - 1
    let next = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setActiveId(sanctuaryClasses[next].id)
    tabs.current[next]?.focus()
  }

  return (
    <section id="santuario" aria-labelledby="santuario-title" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading index="04" eyebrow="Santuário" title="Santuário do Desenvolvedor" id="santuario-title">
        Enquanto a árvore mostra como as tecnologias se conectam, o Santuário reúne as quatro áreas em
        que atuo. É só uma forma de explorar o portfólio: não indica níveis de domínio.
      </SectionHeading>

      <div role="tablist" aria-label="Especializações" className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {sanctuaryClasses.map((c, i) => {
          const on = c.id === activeId
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={on}
              aria-controls="santuario-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActiveId(c.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="banner group relative flex flex-col items-center gap-2 px-2 pb-4 pt-5 text-center sm:px-3"
            >
              <ClassSymbol id={c.id} active={on} className="w-24 sm:w-28" />
              <span
                className={`font-display text-sm font-bold transition-colors sm:text-base ${
                  on ? 'text-gold-soft' : 'text-ivory group-hover:text-gold-soft'
                }`}
              >
                {c.title}
              </span>
              <span className="text-[0.7rem] leading-tight text-silver sm:text-xs">{c.short}</span>
              {on && (
                <span
                  className="absolute -bottom-[7px] left-1/2 hidden h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-gold/75 bg-graphite md:block"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      <div id="santuario-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} tabIndex={0} className="mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="hud-panel relative grid gap-8 overflow-hidden p-6 sm:p-8 lg:min-h-[22rem] lg:grid-cols-[1.1fr_1fr]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24 }}
          >
            <ClassSymbol
              id={active.id}
              active={false}
              className="pointer-events-none absolute -bottom-16 -right-16 w-72 opacity-[0.06] sm:w-96"
            />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">{active.area}</p>
              <h3 className="mt-1 text-2xl font-extrabold sm:text-3xl">{active.title}</h3>
              <p className="mt-4 text-silver">{active.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-ivory">
                {active.focus.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Diamond size={9} className="shrink-0 text-gold" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative space-y-6">
              <div>
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-silver">Tecnologias</h4>
                <div className="space-y-3">
                  {groups.map((g) => (
                    <div key={g.ctx}>
                      <p className="mb-1.5 text-xs text-silver/80">{contextLabels[g.ctx]}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {g.items.map((s) => (
                          <li
                            key={s.id}
                            className={`chip ${g.ctx === 'projetos' || g.ctx === 'profissional' ? '!border-gold/40 !text-ivory' : ''}`}
                          >
                            {s.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-silver">
                  Projetos relacionados
                </h4>
                {related.length === 0 ? (
                  <p className="text-sm text-silver">Nenhum projeto vinculado diretamente.</p>
                ) : (
                  <ul className="space-y-2">
                    {related.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={() => onOpenProject(p.id)}
                          className="group flex w-full items-center gap-3 border border-line bg-obsidian/60 p-2 text-left transition-colors hover:border-gold/60"
                        >
                          <span aria-hidden="true" className="block aspect-video w-20 shrink-0 overflow-hidden border border-line">
                            <ProjectImage project={p} />
                          </span>
                          <span className="min-w-0 text-sm font-semibold text-ivory group-hover:text-gold-soft">
                            {p.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
