import { MainTemplate } from '@renderer/Templates/MainTemplate'
import { useNode } from '@renderer/utils/useNode'
import { CharacterEdit } from './CharacterEdit'

export const NodePage = () => {
  const node = useNode()
  return (
    <MainTemplate>
      {node?.side === 'actor' ? <CharacterEdit /> : <pre>{JSON.stringify(node, null, 2)}</pre>}
    </MainTemplate>
  )
}
