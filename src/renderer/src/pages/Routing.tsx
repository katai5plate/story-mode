import { MainTemplate } from '@renderer/Templates/MainTemplate'
import { useNode } from '@renderer/utils/useNode'
import { ActorEdit } from './ActorEdit'
import { useEffect, useMemo } from 'react'
import { useStore } from '@renderer/store/useStore'
import { useNavigate } from 'react-router'
import { ScenarioEdit } from './ScenarioEdit'
import { MonacoTest } from './examples/MonacoTest'
import { CustomIdEdit } from './CustomIdEdit'

const Favorite = () => {
  const store = useStore()
  const node = useNode()
  const navigate = useNavigate()
  const to = store.getNode(node.favorite)
  useEffect(() => {
    if (!to) return
    navigate(`/${to.uid}`)
  }, [])
  if (!to) return <>ノードが見つかりませんでした</>
  return <></>
}

export const Routing = () => {
  const node = useNode()
  const render = useMemo(() => {
    if (node) {
      if (node.side === 'call') {
        if (node.uid === 'df-config-scenario-actor') return <>アクター設定</>
        if (node.uid === 'df-config-scenario-episode') return <>エピソード設定</>
        if (node.uid === 'df-config-scenario-chapter') return <>チャプター設定</>
        if (node.uid === 'df-config-scenario-phase') return <>フェーズ設定</>
        if (node.uid === 'df-config-scenario-beat') return <>ビート設定</>
        if (node.uid === 'df-config-scenario-script') return <>スクリプト設定</>
        if (node.uid === 'df-config-tag-main') return <>タグ管理</>
        if (node.uid === 'df-config-tag-search') return <>タグ検索</>
      }
      if (node.side === 'favorite') return <Favorite />
      if (node.side === 'actor') return <ActorEdit />
      if (node.side === 'condir' && node.uid === 'df-actor')
        return (
          <>
            アクター編集
            <ul>
              <li>子要素の名前設定、追加、削除</li>
            </ul>
          </>
        )
      if (
        node.side === 'episode' ||
        node.side === 'chapter' ||
        node.side === 'phase' ||
        node.side === 'beat'
      )
        return <ScenarioEdit />
      if (node.side === 'script') return <MonacoTest />
      if (node.side === 'customId') return <CustomIdEdit />
    }
    return <pre>{JSON.stringify(node, null, 2)}</pre>
  }, [node])
  return <MainTemplate>{render}</MainTemplate>
}
