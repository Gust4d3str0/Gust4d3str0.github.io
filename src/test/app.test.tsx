import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { projects } from '../data/projects'
import { skills, branches } from '../data/skills'
import { computeLayout, relatedSkillIds } from '../utils/skillTree'

describe('dados', () => {
  it('toda habilidade referencia ramo, projetos e relações existentes', () => {
    const skillIds = new Set(skills.map((s) => s.id))
    for (const s of skills) {
      expect(branches.some((b) => b.id === s.branch)).toBe(true)
      s.projects.forEach((p) => expect(projects.some((x) => x.id === p)).toBe(true))
      s.related?.forEach((r) => expect(skillIds.has(r)).toBe(true))
    }
    expect(skillIds.size).toBe(skills.length)
  })

  it('layout posiciona todas as habilidades sem sobreposição de nós', () => {
    const layout = computeLayout()
    const pts = skills.map((s) => layout.skills[s.id])
    expect(pts.every(Boolean)).toBe(true)
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++)
        expect(Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)).toBeGreaterThan(60)
  })

  it('relações são simétricas', () => {
    expect(relatedSkillIds('supabase')).toContain('postgresql')
    expect(relatedSkillIds('postgresql')).toContain('supabase')
  })
})

describe('App', () => {
  it('exibe nome, formação e links de contato reais', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /Gustavo Henrique Femiano/ })).toBeInTheDocument()
    const github = screen.getAllByRole('link', { name: /GitHub/ })
    expect(github[0]).toHaveAttribute('href', 'https://github.com/Gust4d3str0')
    expect(github[0]).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(screen.getByRole('link', { name: /henriquefemiano@outlook.com/ })).toHaveAttribute(
      'href',
      'mailto:henriquefemiano@outlook.com',
    )
  })

  it('currículo fica desabilitado enquanto não houver PDF', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /Currículo/ })).toHaveAttribute('aria-disabled', 'true')
  })

  it('filtra projetos por categoria', async () => {
    const user = userEvent.setup()
    render(<App />)
    const section = screen.getByRole('region', { name: /Projetos e artefatos/ })
    expect(within(section).getAllByRole('article')).toHaveLength(projects.length)
    await user.click(within(section).getByRole('button', { name: 'IA' }))
    const cards = within(section).getAllByRole('article')
    expect(cards).toHaveLength(1)
    expect(within(cards[0]).getByRole('heading', { name: /Chatbot Adaptativo/ })).toBeInTheDocument()
  })

  it('abre e fecha o painel do projeto com Esc', async () => {
    const user = userEvent.setup()
    render(<App />)
    const section = screen.getByRole('region', { name: /Projetos e artefatos/ })
    await user.click(within(section).getAllByRole('button', { name: /Ver detalhes/ })[0])
    const dialog = await screen.findByRole('dialog', { name: 'Pre-Live' })
    expect(within(dialog).getByRole('link', { name: /Site oficial/ })).toHaveAttribute(
      'href',
      'https://gust4d3str0.github.io/pre-live/',
    )
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})

describe('árvore de habilidades', () => {
  it('seleciona um nó por teclado e abre o projeto relacionado', async () => {
    const user = userEvent.setup()
    render(<App />)
    const node = screen.getAllByRole('button', { name: /^Tauri\./ })[0]
    node.focus()
    await user.keyboard('{Enter}')
    expect(node).toHaveAttribute('aria-pressed', 'true')
    const detail = screen.getByRole('complementary', { name: /Detalhes da habilidade/ })
    expect(within(detail).getByText('Tauri 2 no Pre-Live.')).toBeInTheDocument()
    await user.click(within(detail).getByRole('button', { name: /Pre-Live/ }))
    expect(await screen.findByRole('dialog', { name: 'Pre-Live' })).toBeInTheDocument()
  })

  it('a lista alternativa seleciona habilidades', async () => {
    const user = userEvent.setup()
    render(<App />)
    const list = screen.getByRole('region', { name: /Árvore de habilidades/ })
    await user.click(within(list).getByRole('button', { name: 'Supabase', pressed: false }))
    const detail = screen.getByRole('complementary', { name: /Detalhes da habilidade/ })
    expect(within(detail).getByRole('heading', { name: 'Supabase' })).toBeInTheDocument()
  })
})

describe('Santuário', () => {
  it('navega entre especializações por teclado e mostra projetos reais', async () => {
    const user = userEvent.setup()
    render(<App />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(4)
    tabs[0].focus()
    await user.keyboard('{ArrowRight}')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{End}')
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true')
    const panel = await screen.findByRole('tabpanel', { name: /O Forjador/ })
    await user.click(within(panel).getByRole('button', { name: 'Pre-Live' }))
    expect(await screen.findByRole('dialog', { name: 'Pre-Live' })).toBeInTheDocument()
  })
})

describe('layout da árvore', () => {
  it('rótulos e medalhões não se sobrepõem e cabem na área visível', async () => {
    const { TREE_EXTENT_X, TREE_EXTENT_Y } = await import('../utils/skillTree')
    const layout = computeLayout()
    type Box = { id: string; x0: number; y0: number; x1: number; y1: number }
    const boxes: Box[] = []
    for (const s of skills) {
      const p = layout.skills[s.id]
      const lw = s.label.length * 9.6
      boxes.push({ id: s.id, x0: p.x - Math.max(lw / 2, 24), y0: p.y - 24, x1: p.x + Math.max(lw / 2, 24), y1: p.y + 58 })
    }
    for (const b of branches) {
      const p = layout.branches[b.id]
      boxes.push({ id: b.id, x0: p.x - 44, y0: p.y - 42, x1: p.x + 44, y1: p.y + 84 })
    }
    boxes.push({ id: 'core', x0: -90, y0: -84, x1: 90, y1: 130 })
    const hit: string[] = []
    for (let i = 0; i < boxes.length; i++) {
      const a = boxes[i]
      if (a.x0 < -TREE_EXTENT_X || a.x1 > TREE_EXTENT_X || a.y0 < -TREE_EXTENT_Y || a.y1 > TREE_EXTENT_Y) hit.push(`${a.id} fora`)
      for (let j = i + 1; j < boxes.length; j++) {
        const b = boxes[j]
        if (a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1) hit.push(`${a.id}~${b.id}`)
      }
    }
    expect(hit).toEqual([])
  })
})

describe('privacidade', () => {
  it('não expõe o endereço do Ascenção RPG nos dados', () => {
    expect(JSON.stringify(projects)).not.toContain('vercel.app')
    expect(projects.find((p) => p.id === 'ascencao-rpg')?.demo).toBeUndefined()
  })
})
