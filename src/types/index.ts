export type ProjectCategory = 'desktop' | 'web' | 'ia' | 'academico'

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  status: string
  summary: string
  /** Imagem autêntica em /public/projects; ausente => placeholder identificado. */
  image?: string
  imageAlt?: string
  tech: string[]
  problem: string
  solution: string
  features: string[]
  challenges: string[]
  demo?: ProjectLink
  repo?: ProjectLink
}

export type BranchId = 'backend' | 'frontend' | 'ia' | 'desktop' | 'dados' | 'ferramentas'

export type SkillContext = 'profissional' | 'projetos' | 'estudos' | 'basico'

export interface Branch {
  id: BranchId
  label: string
  /** Rótulo curto usado dentro da árvore. */
  short: string
  description: string
}

export interface Skill {
  id: string
  label: string
  branch: BranchId
  summary: string
  usage: string
  context: SkillContext
  /** 'conceito' = habilidade ou conceito; ausente = tecnologia/ferramenta. */
  kind?: 'conceito'
  projects: string[]
  /** Relações conceituais adicionais (não são dependências técnicas). */
  related?: string[]
}

export interface Milestone {
  id: string
  period: string
  title: string
  description: string
  projectId?: string
}

export type Selection = { kind: 'skill' | 'branch'; id: string }
