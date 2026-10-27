import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { EmblemDefs } from './components/emblems'
import { Header } from './components/Header'
import { ProjectDialog } from './components/ProjectDialog'
import { projects } from './data/projects'
import { profile } from './data/profile'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Projects } from './sections/Projects'
import { Sanctuary } from './sections/Sanctuary'
import { Skills } from './sections/Skills'

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])
  const project = projects.find((p) => p.id === openId)

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Pular para o conteúdo
      </a>
      <EmblemDefs />
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Projects onOpenProject={setOpenId} />
        <Skills onOpenProject={setOpenId} />
        <Sanctuary onOpenProject={setOpenId} />
        <Journey onOpenProject={setOpenId} />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-silver">
        <p>© {new Date().getFullYear()} {profile.name} · Gustavo.dev</p>
      </footer>
      <AnimatePresence>
        {project && <ProjectDialog key={project.id} project={project} onClose={close} />}
      </AnimatePresence>
    </MotionConfig>
  )
}
