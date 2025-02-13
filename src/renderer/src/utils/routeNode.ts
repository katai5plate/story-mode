import { RouteNode } from '@renderer/components/RouteMap'
import { CharacterJSON, ScenarioJSON } from '@renderer/types/TemplateJSON'

export const genScenarioTree = (scenario: ScenarioJSON) => {
  const orders = [
    { type: 'episode', icon: '📺', prefix: 'EP' },
    { type: 'chapter', icon: '💿', prefix: 'CH' },
    { type: 'phase', icon: '🎞️', prefix: 'PH' },
    { type: 'beat', icon: '🎥', prefix: 'BE' },
    { type: 'script', icon: '📝', prefix: 'SC' }
  ]
  const buildNodes = (level: number): RouteNode[] => {
    const order = orders[level]
    if (!order) return []
    const { type } = order
    if (!type || !scenario[type]) return []
    return scenario[type].map((entry, _index) => {
      const node: RouteNode = { ...order, ...entry, _index }
      const children = buildNodes(level + 1)
      if (children.length > 0) node.children = children
      return node
    })
  }
  return buildNodes(0) as RouteNode[]
}

export const genCharacterTree = (preset: CharacterJSON['preset']) =>
  preset.map(
    (p, _index) =>
      ({
        type: 'character',
        path: p.id,
        name: p.name,
        icon: '🎭',
        _index
      }) as RouteNode
  ) as RouteNode[]

export const findScenarioRouteNode = (
  pathSegments: string[],
  routeNodes: RouteNode[]
): RouteNode | null => {
  if (!pathSegments.length) return null
  for (const routeNode of routeNodes) {
    if (routeNode.path.includes(pathSegments[0])) {
      if (pathSegments.length === 1) return routeNode
      const foundChild = findScenarioRouteNode(pathSegments.slice(1), routeNode.children)
      if (foundChild) return foundChild
    }
  }
  return null
}
