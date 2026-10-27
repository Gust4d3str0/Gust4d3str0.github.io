import type { Project } from '../types'

export const categoryLabels = {
  desktop: 'Desktop',
  web: 'Web',
  ia: 'IA',
  academico: 'Acadêmico',
} as const

export const projects: Project[] = [
  {
    id: 'pre-live',
    name: 'Pre-Live',
    category: 'desktop',
    status: 'Publicado',
    summary:
      'Aplicativo desktop para Windows voltado ao compartilhamento de tela em tempo real, com salas privadas e diferentes modos de transmissão.',
    image: '/projects/pre-live.png',
    imageAlt: 'Interface do Pre-Live: lista de participantes à esquerda e painel de captura à direita',
    tech: ['TypeScript', 'Tauri 2', 'Rust', 'Node.js', 'WebRTC'],
    problem:
      'Compartilhar a tela com outras pessoas em tempo real normalmente depende de ferramentas de videochamada genéricas. O projeto busca uma experiência dedicada ao compartilhamento, com controle sobre quem entra e o que é transmitido.',
    solution:
      'Um aplicativo desktop construído com Tauri 2 e Rust, interface em TypeScript e transmissão por WebRTC, organizado em salas privadas acessadas por convite.',
    features: [
      'Salas privadas',
      'Convites',
      'Gerenciamento de participantes',
      'Compartilhamento de monitores e janelas',
      'Diferentes modos de transmissão',
    ],
    challenges: [
      'Comunicação em tempo real entre pares com WebRTC',
      'Integração entre a interface web e o núcleo nativo em Rust (Tauri)',
      'Captura de monitores e janelas no Windows',
    ],
    demo: { label: 'Site oficial', href: 'https://gust4d3str0.github.io/pre-live/' },
  },
  {
    id: 'ascencao-rpg',
    name: 'Ascenção RPG',
    category: 'web',
    status: 'Projeto pessoal',
    summary:
      'Aplicação web para gerenciamento de fichas de personagens de RPG, com autenticação, painel do mestre e permissões.',
    image: '/projects/ascencao-rpg.webp',
    imageAlt: 'Tela inicial do Ascenção RPG com a lista de personagens do usuário',
    tech: ['JavaScript', 'Vite', 'Supabase', 'PostgreSQL'],
    problem:
      'Mesas de RPG costumam controlar fichas em papel ou planilhas soltas, o que dificulta a consulta, a atualização e o acompanhamento pelo mestre.',
    solution:
      'Uma aplicação web com contas de usuário, fichas persistidas em banco de dados e um painel para o mestre, com regras de acesso por permissão.',
    features: [
      'Autenticação',
      'Gerenciamento de fichas',
      'Painel do mestre',
      'Permissões',
      'Persistência de dados',
    ],
    challenges: [
      'Modelagem dos dados das fichas em PostgreSQL',
      'Controle de permissões entre jogadores e mestre',
      'Autenticação e persistência com Supabase',
    ],
  },
  {
    id: 'chatbot-emocional',
    name: 'Chatbot Adaptativo com Reconhecimento Emocional',
    category: 'ia',
    status: 'Em evolução',
    summary:
      'Trabalho de Conclusão de Curso de Engenharia da Computação: suporte emocional não clínico com análise de áudio e respostas contextualizadas por IA.',
    image: '/projects/chatbot-emocional.png',
    imageAlt: 'Tela inicial do chatbot com pergunta de acolhimento, sugestões de conversa e campo de mensagem',
    tech: ['Inteligência Artificial', 'Processamento de áudio', 'Reconhecimento de emoções na fala'],
    problem:
      'Conversas automatizadas costumam ignorar o tom emocional de quem fala. O TCC investiga como considerar a emoção na fala para adaptar as respostas, sempre como apoio não clínico.',
    solution:
      'Um chatbot que processa áudio, reconhece emoções na fala e gera respostas contextualizadas com auxílio de Inteligência Artificial.',
    features: [
      'Processamento de áudio',
      'Reconhecimento de emoções na fala',
      'Respostas contextualizadas com IA',
      'Foco em suporte emocional não clínico',
      'Exercícios de pausa guiada (respiração e grounding)',
      'Aviso de protótipo acadêmico com orientação para buscar ajuda humana em risco imediato',
    ],
    challenges: [
      'Extrair informação emocional confiável da fala',
      'Adaptar a resposta ao contexto da conversa',
      'Delimitar o escopo como apoio não clínico, sem substituir profissionais',
    ],
  },
  {
    id: 'hydropulse-ai',
    name: 'HydroPulseAI',
    category: 'academico',
    status: 'Projeto acadêmico',
    summary:
      'Projeto acadêmico que usa pressão, vazão e temperatura para identificar e classificar defeitos em bombas hidráulicas por meio de Machine Learning.',
    image: '/projects/hydropulse-ai.png',
    imageAlt: 'Página de detalhes de um componente no sistema de monitoramento hidráulico, com gráficos de pressão, vazão e temperatura',
    tech: ['Machine Learning', 'Análise de dados'],
    problem:
      'Defeitos em bombas hidráulicas costumam ser percebidos só depois que o problema se agrava. O projeto investiga como pressão, vazão e temperatura podem apoiar a identificação antecipada de falhas.',
    solution:
      'Um sistema que analisa leituras de pressão, vazão e temperatura e classifica o tipo de defeito da bomba com um modelo de Machine Learning, exibindo gráficos, avaliação do modelo e relatórios.',
    features: [
      'Login de usuários e painel administrativo',
      'Cadastro e consulta de componentes (bomba, válvula, tubulação)',
      'Gráficos de pressão, vazão e temperatura',
      'Registros com tipo de falha, probabilidade, diagnóstico e sugestão',
      'Avaliação do modelo com matriz de confusão',
      'Simulador de leituras e geração de relatório em PDF',
    ],
    challenges: [
      'Classificar defeitos a partir de apenas três variáveis (pressão, vazão e temperatura)',
      'Avaliar o modelo, com a matriz de confusão, diante de classes com poucos exemplos',
    ],
  },
]
