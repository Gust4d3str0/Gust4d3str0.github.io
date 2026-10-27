import type { Branch, Skill } from '../types'

export const branches: Branch[] = [
  { id: 'backend', short: 'Back-end', label: 'Back-end', description: 'Linguagens, frameworks e conceitos do lado do servidor.' },
  { id: 'frontend', short: 'Front-end', label: 'Front-end', description: 'Construção de interfaces e aplicações web.' },
  { id: 'ia', short: 'IA', label: 'Inteligência Artificial', description: 'Fundamentos e aplicações de IA, incluindo o TCC.' },
  { id: 'desktop', short: 'Desktop', label: 'Desktop e Sistemas', description: 'Aplicações desktop e linguagens de sistemas.' },
  { id: 'dados', short: 'Dados', label: 'Bancos de Dados', description: 'Armazenamento e persistência de dados.' },
  { id: 'ferramentas', short: 'Ferramentas', label: 'Ferramentas e Infraestrutura', description: 'Ferramentas de trabalho, entrega e suporte.' },
]

export const contextLabels = {
  profissional: 'Uso profissional',
  projetos: 'Usado em projetos',
  estudos: 'Estudos e formação',
  basico: 'Conhecimento básico',
} as const

export const skills: Skill[] = [
  // Back-end
  { id: 'python', label: 'Python', branch: 'backend', context: 'projetos', projects: ['hydropulse-ai'],
    summary: 'Linguagem central da minha formação complementar em back-end.',
    usage: 'Formação Alura Back-End Python (Nível 1) e aplicação no HydroPulseAI (análise de dados e Machine Learning).', related: ['ia-fundamentos', 'hydro'] },
  { id: 'django', label: 'Django', branch: 'backend', context: 'estudos', projects: [],
    summary: 'Framework web Python completo.', usage: 'Aprendido na formação Alura Back-End Python.' },
  { id: 'flask', label: 'Flask', branch: 'backend', context: 'estudos', projects: [],
    summary: 'Microframework web Python.', usage: 'Aprendido na formação Alura Back-End Python.' },
  { id: 'fastapi', label: 'FastAPI', branch: 'backend', context: 'estudos', projects: [],
    summary: 'Framework Python para APIs.', usage: 'Aprendido na formação Alura Back-End Python.' },
  { id: 'nodejs', label: 'Node.js', branch: 'backend', context: 'projetos', projects: ['pre-live'],
    summary: 'Ambiente de execução JavaScript no servidor.', usage: 'Parte da stack do Pre-Live.' },
  { id: 'rest', label: 'APIs REST', branch: 'backend', context: 'projetos', kind: 'conceito', projects: ['ascencao-rpg'],
    summary: 'Comunicação entre cliente e servidor via HTTP.', usage: 'Consumo de serviços no Ascenção RPG e estudos de back-end.' },
  { id: 'auth', label: 'Autenticação', branch: 'backend', context: 'projetos', kind: 'conceito', projects: ['ascencao-rpg'],
    summary: 'Contas de usuário e controle de acesso.', usage: 'Login e permissões no Ascenção RPG.', related: ['supabase'] },

  // Front-end
  { id: 'javascript', label: 'JavaScript', branch: 'frontend', context: 'projetos', projects: ['ascencao-rpg'],
    summary: 'Linguagem da web.', usage: 'Base do Ascenção RPG.' },
  { id: 'typescript', label: 'TypeScript', branch: 'frontend', context: 'projetos', projects: ['pre-live'],
    summary: 'JavaScript com tipagem estática.', usage: 'Interface e lógica do Pre-Live; também neste portfólio.', related: ['tauri'] },
  { id: 'react', label: 'React', branch: 'frontend', context: 'projetos', projects: [],
    summary: 'Biblioteca para interfaces baseadas em componentes.', usage: 'Utilizado neste portfólio.' },
  { id: 'vite', label: 'Vite', branch: 'frontend', context: 'projetos', projects: ['ascencao-rpg'],
    summary: 'Ferramenta de build e servidor de desenvolvimento.', usage: 'Build do Ascenção RPG e deste portfólio.' },

  // IA
  { id: 'ia-fundamentos', label: 'Fundamentos de IA', branch: 'ia', context: 'estudos', kind: 'conceito', projects: ['chatbot-emocional'],
    summary: 'Conceitos de Inteligência Artificial.', usage: 'Estudos relacionados ao Azure AI-900 e base do TCC.' },
  { id: 'audio', label: 'Processamento de áudio', branch: 'ia', context: 'projetos', kind: 'conceito', projects: ['chatbot-emocional'],
    summary: 'Tratamento e análise de sinais de áudio.', usage: 'Entrada de voz do chatbot do TCC.' },
  { id: 'emocoes', label: 'Reconhecimento de emoções', branch: 'ia', context: 'projetos', kind: 'conceito', projects: ['chatbot-emocional'],
    summary: 'Identificação de emoções a partir da fala.', usage: 'Núcleo do TCC (projeto em evolução).' },
  { id: 'hydro', label: 'Análise de dados', branch: 'ia', context: 'projetos', kind: 'conceito', projects: ['hydropulse-ai'],
    summary: 'Análise de pressão, vazão e temperatura com Machine Learning.', usage: 'Projeto acadêmico HydroPulseAI.' },

  // Desktop
  { id: 'tauri', label: 'Tauri', branch: 'desktop', context: 'projetos', projects: ['pre-live'],
    summary: 'Framework para aplicações desktop com interface web.', usage: 'Tauri 2 no Pre-Live.' },
  { id: 'rust', label: 'Rust', branch: 'desktop', context: 'projetos', projects: ['pre-live'],
    summary: 'Linguagem de sistemas.', usage: 'Núcleo nativo do Pre-Live via Tauri.' },
  { id: 'webrtc', label: 'WebRTC', branch: 'desktop', context: 'projetos', projects: ['pre-live'],
    summary: 'Comunicação em tempo real entre pares.', usage: 'Transmissão de tela no Pre-Live.' },
  { id: 'java', label: 'Java', branch: 'desktop', context: 'estudos', projects: [],
    summary: 'Linguagem orientada a objetos.', usage: 'Graduação em Engenharia da Computação.' },
  { id: 'c', label: 'C', branch: 'desktop', context: 'estudos', projects: [],
    summary: 'Linguagem de baixo nível.', usage: 'Graduação em Engenharia da Computação.' },
  { id: 'cpp', label: 'C++', branch: 'desktop', context: 'estudos', projects: [],
    summary: 'Linguagem de propósito geral com foco em desempenho.', usage: 'Graduação em Engenharia da Computação.' },
  { id: 'cobol', label: 'COBOL', branch: 'desktop', context: 'basico', projects: [],
    summary: 'Linguagem usada em sistemas legados.', usage: 'Conhecimentos básicos.' },

  // Dados
  { id: 'sql', label: 'SQL', branch: 'dados', context: 'projetos', projects: ['ascencao-rpg'],
    summary: 'Linguagem de consulta a bancos relacionais.', usage: 'Consultas e modelagem no Ascenção RPG.', related: ['postgresql', 'mysql'] },
  { id: 'postgresql', label: 'PostgreSQL', branch: 'dados', context: 'projetos', projects: ['ascencao-rpg'],
    summary: 'Banco de dados relacional.', usage: 'Persistência do Ascenção RPG.', related: ['supabase'] },
  { id: 'mysql', label: 'MySQL', branch: 'dados', context: 'estudos', projects: [],
    summary: 'Banco de dados relacional.', usage: 'Estudos e formação.' },
  { id: 'mongodb', label: 'MongoDB', branch: 'dados', context: 'estudos', projects: [],
    summary: 'Banco de dados orientado a documentos.', usage: 'Estudos e formação.' },
  { id: 'supabase', label: 'Supabase', branch: 'dados', context: 'projetos', projects: ['ascencao-rpg'],
    summary: 'Plataforma com banco PostgreSQL e autenticação.', usage: 'Back-end do Ascenção RPG.' },

  // Ferramentas
  { id: 'git', label: 'Git', branch: 'ferramentas', context: 'projetos', projects: ['pre-live', 'ascencao-rpg'],
    summary: 'Controle de versão.', usage: 'Todos os projetos.', related: ['github'] },
  { id: 'github', label: 'GitHub', branch: 'ferramentas', context: 'projetos', projects: ['pre-live'],
    summary: 'Hospedagem de código e GitHub Pages.', usage: 'Repositórios e site do Pre-Live.' },
  { id: 'vscode', label: 'VS Code', branch: 'ferramentas', context: 'projetos', projects: [],
    summary: 'Editor de código.', usage: 'Ambiente principal de desenvolvimento.' },
  { id: 'docker', label: 'Docker', branch: 'ferramentas', context: 'estudos', projects: [],
    summary: 'Contêineres para ambientes reproduzíveis.', usage: 'Estudos e formação.' },
  { id: 'vercel', label: 'Vercel', branch: 'ferramentas', context: 'projetos', projects: ['ascencao-rpg'],
    summary: 'Plataforma de hospedagem web.', usage: 'Publicação do Ascenção RPG.' },
  { id: 'automacao', label: 'Automação', branch: 'ferramentas', context: 'profissional', kind: 'conceito', projects: [],
    summary: 'Pequenas automações de rotina.', usage: 'Melhorias de processos na ARATEMPER LR Vidros.' },
  { id: 'suporte', label: 'Suporte de TI', branch: 'ferramentas', context: 'profissional', kind: 'conceito', projects: [],
    summary: 'Manutenção, configuração e suporte a sistemas.', usage: 'Atuação desde 2018 na ARATEMPER LR Vidros.' },
]
