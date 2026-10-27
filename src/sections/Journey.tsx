import { SectionHeading } from '../components/SectionHeading'
import { Timeline } from '../components/Timeline'

export function Journey({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="jornada" aria-labelledby="jornada-title" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading index="05" eyebrow="Jornada" title="Jornada profissional" id="jornada-title">
        Os principais marcos da minha trajetória, da experiência em TI até os projetos atuais.
      </SectionHeading>
      <Timeline onOpenProject={onOpenProject} />
    </section>
  )
}
