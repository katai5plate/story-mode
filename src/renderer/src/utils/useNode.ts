import { useStore } from '@renderer/store/useStore'
import { SMNode } from '@renderer/types/SMNode'
import { useMemo } from 'react'
import { useParams } from 'react-router'

export const useNode = () => {
  const store = useStore()
  const params = useParams()
  return useMemo(() => store.getNode(params.nodeId), [params]) as SMNode | undefined
}
