import { RouteNode } from '@renderer/components/RouteMap'
import { SETTING_ROUTES } from '@renderer/constants/routes'
import { useStore } from '@renderer/store/useStore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { findNestedRouteNode } from './routeNode'

export const useSyncCurrent = () => {
  const navigate = useNavigate()
  const store = useStore()
  const process = useCallback((pathname: string, node: RouteNode, redirect: boolean) => {
    store.setCurrentRoute(node)
    redirect && navigate(pathname)
  }, [])
  return useCallback(
    (pathname: string, redirect?: boolean) => {
      const [parent, ...segments] = pathname.replace(/^\//, '').split('/')
      switch (parent) {
        case 'character': {
          const [path] = segments
          process(
            pathname,
            store.characterRoutes.find((x) => x.path === path),
            redirect
          )
          break
        }
        case 'scenario': {
          process(pathname, findNestedRouteNode(segments, store.scenarioRoutes), redirect)
          break
        }
        default: {
          process(
            pathname,
            findNestedRouteNode([parent, ...segments].filter(Boolean), SETTING_ROUTES),
            redirect
          )
          break
        }
      }
    },
    [store, process]
  )
}
