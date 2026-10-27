import type { BranchId } from '../types'

export interface SanctuaryClass {
  id: string
  title: string
  area: string
  short: string
  branch: BranchId
  description: string
  focus: string[]
}

// Tecnologias e projetos são derivados de data/skills.ts a partir do ramo,
// evitando duplicar conteúdo.
export const sanctuaryClasses: SanctuaryClass[] = [
  {
    id: 'arquiteto',
    title: 'O Arquiteto',
    area: 'Desenvolvimento Back-end',
    short: 'Back-end',
    branch: 'backend',
    description:
      'Lógica, dados e segurança por trás da interface. Fiz a formação Back-End Python na Alura e uso Python com Django no HydroPulseAI e FastAPI no chatbot do TCC. Também apliquei autenticação, permissões e persistência com Supabase e PostgreSQL no Ascenção RPG e Node.js no Pre-Live. Flask vem da formação.',
    focus: ['APIs e autenticação', 'Persistência de dados', 'Python aplicado a dados e ML'],
  },
  {
    id: 'artifice',
    title: 'O Artífice',
    area: 'Desenvolvimento Front-end',
    short: 'Front-end',
    branch: 'frontend',
    description:
      'Interfaces que priorizam clareza, responsividade e acessibilidade. Uso JavaScript e TypeScript, e este portfólio é um exemplo prático com React, Vite e componentes tipados. O Ascenção RPG é outra aplicação web que desenvolvi.',
    focus: ['Interfaces responsivas', 'Componentes tipados', 'Acessibilidade'],
  },
  {
    id: 'alquimista',
    title: 'O Alquimista',
    area: 'Inteligência Artificial',
    short: 'Inteligência Artificial',
    branch: 'ia',
    description:
      'Aplicação de Inteligência Artificial em projetos, com base em estudos de fundamentos (conteúdo relacionado ao Azure AI-900). No TCC, trabalho com áudio e reconhecimento de emoções na fala, ainda em evolução; no HydroPulseAI, com Scikit-learn para classificar defeitos em bombas hidráulicas a partir de pressão, vazão e temperatura.',
    focus: ['Processamento de áudio', 'Reconhecimento de emoções', 'Machine Learning aplicado'],
  },
  {
    id: 'forjador',
    title: 'O Forjador',
    area: 'Aplicações Desktop',
    short: 'Desktop',
    branch: 'desktop',
    description:
      'Aplicações desktop e comunicação em tempo real. O Pre-Live, meu projeto principal nessa área, usa Tauri 2, Rust, TypeScript e WebRTC. A graduação trouxe a base em linguagens como C, C++ e Java.',
    focus: ['Tauri e Rust', 'Comunicação em tempo real', 'Base em C, C++ e Java'],
  },
]
