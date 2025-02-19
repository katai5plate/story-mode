import { MainTemplate } from '@renderer/Templates/MainTemplate'
import { useNode } from '@renderer/utils/useNode'
import { CharacterEdit } from './CharacterEdit'
import { useMemo } from 'react'

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
      if (node.side === 'favorite') return <>お気に入り: {node.favorite}</>
      if (node.side === 'actor') return <CharacterEdit />
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
      ) {
        return (
          <>
            プロット編集: <pre>{JSON.stringify(node, null, 2)}</pre>
            <ul>
              <li>タグ設定</li>
              <li>一行説明欄</li>
              <li>詳細説明欄</li>
              <li>ここまでのチェックリスト確認</li>
              <li>子要素の名前設定、追加、削除</li>
              <li>プロット</li>
              <li>メモ</li>
            </ul>
          </>
        )
      }
      if (node.side === 'script') {
        return (
          <>
            スクリプト編集: <pre>{JSON.stringify(node, null, 2)}</pre>
          </>
        )
      }
    }
    return <pre>{JSON.stringify(node, null, 2)}</pre>
  }, [node])
  return <MainTemplate>{render}</MainTemplate>
}
