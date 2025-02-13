import { useStore } from '@renderer/store/useStore'
import { useLocation, useParams } from 'react-router'
import { useRouteNode } from './routeNode'
import { useEffect } from 'react'

export const useCommon = () => {
  const store = useStore()
  const location = useLocation()
  const node = useRouteNode(location.pathname, useParams())
  useEffect(() => {
    node && store.setTitle([node.prefix, node.name].join(' '))
  }, [node])
  return { node, store }
}
