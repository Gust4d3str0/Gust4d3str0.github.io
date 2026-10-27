import type { Milestone } from '../types'

// Somente datas confirmadas. Demais marcos usam rótulos de fase até haver datas reais.
export const milestones: Milestone[] = [
  {
    id: 'aratemper',
    period: '2018',
    title: 'Início na ARATEMPER LR Vidros',
    description: 'Suporte técnico de TI, manutenção de computadores, apoio a sistemas e pequenas automações.',
  },
  {
    id: 'graduacao',
    period: '2022 – jan. 2027 (previsão)',
    title: 'Engenharia da Computação na UNIARA',
    description: 'Bacharelado em fase final (10º semestre), com base em programação, sistemas e engenharia de software.',
  },
  {
    id: 'alura',
    period: 'Out. 2026',
    title: 'Back-End Python na Alura',
    description: 'Nível 1: Estruturando Aplicações Web — 15 cursos e checkpoints, 158 horas estimadas.',
  },
  {
    id: 'academicos',
    period: 'Projetos acadêmicos',
    title: 'Primeiros projetos aplicados',
    description: 'Desenvolvimento de projetos acadêmicos, entre eles o HydroPulseAI.',
    projectId: 'hydropulse-ai',
  },
  {
    id: 'pre-live',
    period: 'Projeto pessoal',
    title: 'Pre-Live publicado',
    description: 'Aplicativo desktop de compartilhamento de tela com site oficial no ar.',
    projectId: 'pre-live',
  },
  {
    id: 'ascencao',
    period: 'Projeto pessoal',
    title: 'Ascenção RPG',
    description: 'Aplicação web para fichas de RPG com autenticação e banco de dados no Supabase.',
    projectId: 'ascencao-rpg',
  },
  {
    id: 'tcc',
    period: 'Em andamento',
    title: 'TCC com Inteligência Artificial',
    description: 'Chatbot adaptativo com reconhecimento emocional na fala, em evolução.',
    projectId: 'chatbot-emocional',
  },
]
