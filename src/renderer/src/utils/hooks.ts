import { RouteNode } from '@renderer/components/RouteMap'
import { SETTING_ROUTES } from '@renderer/constants/routes'
import { useStore } from '@renderer/store/useStore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { findNestedRouteNode } from './routeNode'

export const useRedirect = () => {
  const navigate = useNavigate()
  const store = useStore()
  const process = useCallback((pathname: string, node: RouteNode) => {
    store.setCurrentRoute(node)
    navigate(pathname)
  }, [])
  return useCallback(
    (pathname: string) => {
      const [parent, ...segments] = pathname.replace(/^\//, '').split('/')
      switch (parent) {
        case 'config': {
          process(
            pathname,
            findNestedRouteNode([parent, ...segments].filter(Boolean), SETTING_ROUTES)
          )
          break
        }
        case 'bookmark': {
          process(
            pathname,
            findNestedRouteNode([parent, ...segments].filter(Boolean), SETTING_ROUTES)
          )
          break
        }
        case 'character': {
          const [path] = segments
          process(
            pathname,
            store.characterRoutes.find((x) => x.path === path)
          )
          break
        }
        case 'scenario': {
          process(pathname, findNestedRouteNode(segments, store.scenarioRoutes))
          break
        }
      }
    },
    [store.characterRoutes, store.scenarioRoutes]
  )
}
