import { RouteNode } from '@renderer/components/RouteMap'
import { SETTING_ROUTES } from '@renderer/constants/routes'
import { useStore } from '@renderer/store/useStore'
import { CharacterJSON, ScenarioJSON } from '@renderer/types/TemplateJSON'
import { useMemo } from 'react'
import { Params } from 'react-router'

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

export const findNestedRouteNode = (
  pathSegments: string[],
  routeNodes: RouteNode[]
): RouteNode | null => {
  if (!pathSegments.length) return null
  for (const routeNode of routeNodes) {
    if (routeNode.path === pathSegments[0]) {
      if (pathSegments.length === 1) return routeNode
      const foundChild = findNestedRouteNode(pathSegments.slice(1), routeNode.children)
      if (foundChild) return foundChild
    }
  }
  return null
}

export const useRouteNode = (pathname: string, params: Readonly<Params<string>>): RouteNode => {
  const store = useStore()
  const node = useMemo(() => {
    const [parent, ...segments] = pathname.replace(/^\//, '').split('/')
    if (parent === 'scenario') {
      const node = findNestedRouteNode(
        [params.episodeId, params.chapterId, params.phaseId, params.beatId, params.scriptId].filter(
          Boolean
        ),
        store.scenarioRoutes
      )
      return node
    }
    if (parent === 'character') {
      const [id] = segments
      const node = store.characterRoutes.find((r) => r.path === id)
      return node
    }
    if (parent === 'config' || parent === 'bookmark') {
      const node = findNestedRouteNode([parent, ...segments].filter(Boolean), SETTING_ROUTES)
      return node
    }
    return null
  }, [store.scenarioRoutes, store.characterRoutes])
  return node
}
