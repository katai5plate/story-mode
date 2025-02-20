import { SMNode } from '@renderer/types/SMNode'

export const routeNodes: SMNode[] = [
  { parent: null, uid: 'df-config', index: 0, name: '設定', side: 'dir' },
  { parent: null, uid: 'df-bookmark', index: 1, name: 'ブックマーク', side: 'dir' },
  { parent: null, uid: 'df-actor', index: 2, name: 'アクター', side: 'condir' },
  { parent: null, uid: 'df-scenario', index: 3, name: 'シナリオ', side: 'dir' },
  { parent: null, uid: 'df-common', index: 3, name: '共通スクリプト', side: 'condir' },

  // 設定
  { parent: 'df-config', uid: 'df-config-file', index: 0, name: 'ファイル', side: 'dir' },
  { parent: 'df-config', uid: 'df-config-tag', index: 1, name: 'タグ', side: 'dir' },

  // 設定 -> ファイル
  { parent: 'df-config-file', uid: 'df-config-file-new', index: 0, name: '✨ 新規', side: 'call' },
  { parent: 'df-config-file', uid: 'df-config-file-open', index: 1, name: '📥 開く', side: 'call' },
  { parent: 'df-config-file', uid: 'df-config-file-save', index: 2, name: '💾 保存', side: 'call' },
  {
    parent: 'df-config-file',
    uid: 'df-config-file-export',
    index: 3,
    name: '🖨️ エクスポート',
    side: 'call'
  },

  // 設定 -> タグ
  { parent: 'df-config-tag', uid: 'df-config-tag-main', index: 0, name: '🏷️ 管理', side: 'call' },
  { parent: 'df-config-tag', uid: 'df-config-tag-search', index: 1, name: '🔎 検索', side: 'call' },

  // 共通スクリプト
  {
    parent: 'df-common',
    uid: 'cm-sample',
    index: 0,
    name: 'example',
    prefix: 'SC',
    side: 'script',
    script: {}
  }
]
