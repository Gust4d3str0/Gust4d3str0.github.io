import { motion } from 'motion/react'
import { ArrowDown, FileText, MapPin } from 'lucide-react'
import { GithubIcon } from '../components/Icons'
import { profile } from '../data/profile'

function Sigil() {
  return (
    <svg viewBox="-200 -200 400 400" className="mx-auto w-full max-w-sm" role="img"
      aria-label="Ornamento geométrico decorativo em losangos concêntricos">
      <defs>
        <radialGradient id="sigil-glow">
          <stop offset="0" stopColor="#58476d" stopOpacity="0.5" />
          <stop offset="1" stopColor="#58476d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r={190} fill="url(#sigil-glow)" />
      <g className="sigil-spin" fill="none" stroke="#b99a5b" strokeOpacity="0.55">
        <circle r={170} strokeDasharray="1 9" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-170} x2={0} y2={-182} transform={`rotate(${i * 30})`} />
        ))}
      </g>
      <g className="sigil-spin-rev" fill="none" stroke="#8b78a6" strokeOpacity="0.6">
        <path d="M0 -140 140 0 0 140 -140 0Z" />
        <path d="M-99 -99 99 -99 99 99 -99 99Z" strokeDasharray="4 6" />
      </g>
      <g fill="none" stroke="#d8c28a" strokeWidth={1.5}>
        <path d="M0 -92 92 0 0 92 -92 0Z" />
        <path d="M0 -60 60 0 0 60 -60 0Z" stroke="#b99a5b" />
        <path d="M0 -92V92M-92 0H92" strokeOpacity="0.35" strokeWidth={1} />
      </g>
      <path d="M0 -14 14 0 0 14 -14 0Z" fill="#d8c28a" />
    </svg>
  )
}

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative flex min-h-screen items-center pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 inline-flex items-center gap-2 border border-line bg-graphite/80 px-3 py-1.5 font-mono text-xs text-silver">
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Aberto a oportunidades de estágio e início de carreira
          </p>
          <h1 id="hero-title" className="text-4xl font-extrabold text-ivory sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-lg font-semibold text-gold-soft sm:text-xl">{profile.headline}</p>
          <p className="mt-5 max-w-xl text-silver">
            Estudante em fase final de Engenharia da Computação na UNIARA, com experiência em TI desde 2018.
            Desenvolvo aplicações web, desktop e projetos com Inteligência Artificial, buscando uma
            primeira posição em desenvolvimento de software.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-silver">
            <MapPin size={16} className="text-gold" aria-hidden="true" /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projetos" className="btn btn-primary">
              Explorar Projetos <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#sobre" className="btn">Sobre Mim</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">
              <GithubIcon /> GitHub <span className="sr-only">(abre em nova aba)</span>
            </a>
            {profile.resumeAvailable ? (
              <a href={profile.resumeUrl} className="btn" download>
                <FileText size={16} aria-hidden="true" /> Currículo
              </a>
            ) : (
              <button type="button" className="btn" aria-disabled="true" title="O PDF do currículo ainda será adicionado">
                <FileText size={16} aria-hidden="true" /> Currículo
                <span className="font-mono text-[0.65rem] text-silver">(em breve)</span>
              </button>
            )}
          </div>
        </motion.div>

        <motion.div className="hidden lg:block" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}>
          <Sigil />
        </motion.div>
      </div>
    </section>
  )
}
