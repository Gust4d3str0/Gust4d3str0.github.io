import { branches, skills } from '../data/skills'
import type { BranchId } from '../types'

export interface Point {
  x: number
  y: number
}

export interface TreeLayout {
  branches: Record<BranchId, Point>
  skills: Record<string, Point>
}

export const TREE_EXTENT_X = 710
export const TREE_EXTENT_Y = 575
const BRANCH_RADIUS = 215
const LEAF_RADII = [320, 410, 500]
const SCALE_X = 1.2
const WEDGE_BIAS = 3

const polar = (deg: number, r: number): Point => {
  const rad = (deg * Math.PI) / 180
  return { x: Math.cos(rad) * r * SCALE_X, y: Math.sin(rad) * r }
}

/** Cada ramo ocupa uma fatia proporcional ao número de nós, equilibrando o espaço. */
export function computeLayout(): TreeLayout {
  const layout: TreeLayout = { branches: {} as TreeLayout['branches'], skills: {} }
  const counts = branches.map((b) => skills.filter((s) => s.branch === b.id).length)
  const weights = counts.map((n) => n + WEDGE_BIAS)
  const total = weights.reduce((a, b) => a + b, 0)
  let start = -90 - (360 * weights[0]) / total / 2
  branches.forEach((branch, i) => {
    const width = (360 * weights[i]) / total
    const angle = start + width / 2
    start += width
    layout.branches[branch.id] = polar(angle, BRANCH_RADIUS)
    const leaves = skills.filter((s) => s.branch === branch.id)
    const spread = width * 0.36
    leaves.forEach((leaf, j) => {
      const offset = leaves.length === 1 ? 0 : -spread + (j * 2 * spread) / (leaves.length - 1)
      layout.skills[leaf.id] = polar(angle + offset, LEAF_RADII[(j + (i % 2)) % LEAF_RADII.length])
    })
  })
  return layout
}

/** Ids de habilidades relacionadas (nos dois sentidos) a uma habilidade. */
export function relatedSkillIds(id: string): string[] {
  const direct = skills.find((s) => s.id === id)?.related ?? []
  const reverse = skills.filter((s) => s.related?.includes(id)).map((s) => s.id)
  return [...new Set([...direct, ...reverse])]
}

/** Habilidades que compartilham ao menos um projeto com a habilidade dada. */
export function sharedProjectSkillIds(id: string): string[] {
  const own = skills.find((s) => s.id === id)?.projects ?? []
  if (own.length === 0) return []
  return skills
    .filter((s) => s.id !== id && s.projects.some((p) => own.includes(p)))
    .map((s) => s.id)
}
