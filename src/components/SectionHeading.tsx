import { Diamond } from './Icons'

interface Props {
  index: string
  eyebrow: string
  title: string
  id: string
  children?: React.ReactNode
}

export function SectionHeading({ index, eyebrow, title, id, children }: Props) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
        <Diamond size={9} />
        <span>{index}</span>
        <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="text-3xl font-extrabold text-ivory sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-silver">{children}</p>}
    </header>
  )
}
