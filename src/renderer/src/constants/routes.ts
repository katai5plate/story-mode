import { RouteNode } from '@renderer/components/RouteMap'

const SETTINGS: RouteNode[] = [
  {
    type: 'folder',
    path: 'config',
    name: '設定',
    isDir: true,
    children: [
      {
        type: 'folder',
        path: 'file',
        name: 'ファイル',
        isDir: true,
        children: [
          { type: 'config', isButton: true, path: 'new', name: '新規', icon: '✨' },
          { type: 'config', isButton: true, path: 'open', name: '開く', icon: '📥' },
          { type: 'config', isButton: true, path: 'save', name: '保存', icon: '💾' },
          { type: 'config', isButton: true, path: 'export', name: 'エクスポート', icon: '🖨️' }
        ]
      },
      {
        type: 'folder',
        path: 'scenario',
        name: 'シナリオ',
        isDir: true,
        children: [
          { type: 'config', path: 'character', name: 'キャラクター', icon: '🎭' },
          { type: 'config', path: 'episode', name: 'エピソード', icon: '📺' },
          { type: 'config', path: 'chapter', name: 'チャプター', icon: '💿' },
          { type: 'config', path: 'phase', name: 'フェーズ', icon: '🎞️' },
          { type: 'config', path: 'beat', name: 'ビート', icon: '🎥' },
          { type: 'config', path: 'script', name: 'スクリプト', icon: '📝' }
        ]
      },
      {
        type: 'folder',
        path: 'tag',
        name: 'タグ',
        isDir: true,
        children: [
          { type: 'config', path: 'setting', name: '管理', icon: '🏷️' },
          { type: 'config', path: 'search', name: '検索', icon: '🔎' }
        ]
      }
    ]
  },
  {
    type: 'folder',
    path: 'bookmark',
    name: 'お気に入り',
    isDir: true,
    children: [{ type: 'bookmark', path: 'hero', name: '主人公', icon: '⭐' }]
  }
]

export const ROUTES: RouteNode[] = [...SETTINGS]
