import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

export const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'santuario', label: 'Santuário' },
  { id: 'jornada', label: 'Jornada' },
  { id: 'contato', label: 'Contato' },
]
const ids = navItems.map((n) => n.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-obsidian/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#inicio" className="font-display text-lg font-extrabold tracking-tight text-ivory">
          Gustavo<span className="text-gold">.dev</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.slice(1).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative px-3 py-2 text-sm transition-colors hover:text-gold-soft ${
                    active === item.id ? 'text-gold-soft' : 'text-silver'
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gold" aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-ivory md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Principal (mobile)" className="border-t border-line bg-graphite md:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-base ${active === item.id ? 'text-gold-soft' : 'text-silver'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
