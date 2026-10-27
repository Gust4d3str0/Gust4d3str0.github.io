import { motion } from 'motion/react'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

/** Revelação discreta ao entrar na viewport. Respeita prefers-reduced-motion via MotionConfig. */
export function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
