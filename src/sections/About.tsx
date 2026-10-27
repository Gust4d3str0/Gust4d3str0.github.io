import { Briefcase, GraduationCap } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { characterSheet, profile } from '../data/profile'

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading index="01" eyebrow="Sobre" title="Sobre mim" id="sobre-title" />
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-8">
          <p className="text-lg text-ivory/90">
            Sou estudante de Engenharia da Computação na UNIARA, em fase final, e trabalho com TI desde 2018.
            Essa vivência com suporte e sistemas me deu o hábito de resolver problemas reais; agora
            direciono esse repertório para o desenvolvimento de software.
          </p>
          <p className="text-silver">
            Meu objetivo é {profile.objective.toLowerCase()} Tenho interesse em back-end, front-end,
            full stack, Inteligência Artificial, desenvolvimento desktop e engenharia de software.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
                <Briefcase size={18} className="text-gold" aria-hidden="true" /> ARATEMPER LR Vidros · desde 2018
              </h3>
              <ul className="space-y-1.5 text-sm text-silver">
                {profile.itWork.map((w) => (
                  <li key={w} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
                <GraduationCap size={18} className="text-gold" aria-hidden="true" /> Formação
              </h3>
              <ul className="space-y-3 text-sm">
                {profile.education.map((e) => (
                  <li key={e.title}>
                    <p className="font-semibold text-ivory">{e.title}</p>
                    <p className="text-silver">{e.org}</p>
                    <p className="text-xs text-silver/80">{e.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <blockquote className="border-l-2 border-gold pl-4 font-display text-ivory">
            “{profile.quote}”
            <footer className="mt-1 text-sm text-silver">— {profile.quoteAuthor}</footer>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="hud-panel p-5 lg:sticky lg:top-24" aria-label="Ficha resumida">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Ficha</p>
            <dl className="divide-y divide-line text-sm">
              {characterSheet.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-silver">{row.label}</dt>
                  <dd className="text-right font-semibold text-ivory">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
