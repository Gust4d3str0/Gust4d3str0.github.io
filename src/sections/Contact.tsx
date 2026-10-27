import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'

const linkClass = 'hud-panel hud-glow flex min-h-16 items-center gap-4 p-4'

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading index="06" eyebrow="Contato" title="Vamos conversar" id="contato-title">
        Estou em busca de estágio ou de uma primeira posição em desenvolvimento de software.
        Fale comigo por qualquer um dos canais abaixo.
      </SectionHeading>
      <Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <a className={linkClass} href={`mailto:${profile.email}`}>
              <Mail className="text-gold" aria-hidden="true" />
              <span><span className="block font-mono text-xs uppercase tracking-widest text-silver">E-mail</span>{profile.email}</span>
            </a>
          </li>
          <li>
            <a className={linkClass} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="text-gold" width={24} height={24} />
              <span><span className="block font-mono text-xs uppercase tracking-widest text-silver">LinkedIn</span>gustavo-femiano
                <span className="sr-only"> (abre em nova aba)</span></span>
            </a>
          </li>
          <li>
            <a className={linkClass} href={profile.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="text-gold" width={24} height={24} />
              <span><span className="block font-mono text-xs uppercase tracking-widest text-silver">GitHub</span>Gust4d3str0
                <span className="sr-only"> (abre em nova aba)</span></span>
            </a>
          </li>
          <li className={`${linkClass} cursor-default`}>
            <MapPin className="text-gold" aria-hidden="true" />
            <span><span className="block font-mono text-xs uppercase tracking-widest text-silver">Localização</span>{profile.location}</span>
          </li>
        </ul>
      </Reveal>
    </section>
  )
}
