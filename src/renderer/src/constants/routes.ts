import { RouteNode } from '@renderer/components/RouteMap'

// const SCRIPTS: RouteNode[] = [
//   { type: 'script', path: 'main', name: 'main', icon: '📝', prefix: 'SC' }
// ]
// const BEATES: RouteNode[] = [
//   {
//     type: 'beat',
//     path: 'request',
//     name: '因果',
//     icon: '🎥',
//     prefix: 'BE',
//     children: SCRIPTS
//   },
//   {
//     type: 'beat',
//     path: 'response',
//     name: '応報',
//     icon: '🎥',
//     prefix: 'BE',
//     children: SCRIPTS
//   },
//   {
//     type: 'beat',
//     path: 'next',
//     name: '接続',
//     icon: '🎥',
//     prefix: 'BE',
//     children: SCRIPTS
//   }
// ]
// const PHASES: RouteNode[] = [
//   {
//     type: 'phase',
//     path: 'init',
//     name: '発意',
//     icon: '🎞️',
//     prefix: 'PH',
//     children: BEATES
//   },
//   {
//     type: 'phase',
//     path: 'hurdle',
//     name: '障壁',
//     icon: '🎞️',
//     prefix: 'PH',
//     children: BEATES
//   },
//   {
//     type: 'phase',
//     path: 'agony',
//     name: '苦悩',
//     icon: '🎞️',
//     prefix: 'PH',
//     children: BEATES
//   },
//   {
//     type: 'phase',
//     path: 'resolve',
//     name: '決行',
//     icon: '🎞️',
//     prefix: 'PH',
//     children: BEATES
//   }
// ]
// const CHAPTERS: RouteNode[] = [
//   {
//     type: 'chapter',
//     path: 'intro',
//     name: '始動',
//     icon: '💿',
//     prefix: 'CP',
//     children: PHASES
//   },
//   {
//     type: 'chapter',
//     path: 'chain',
//     name: '連鎖',
//     icon: '💿',
//     prefix: 'CP',
//     children: PHASES
//   },
//   {
//     type: 'chapter',
//     path: 'barrier',
//     name: '難関',
//     icon: '💿',
//     prefix: 'CP',
//     children: PHASES
//   },
//   {
//     type: 'chapter',
//     path: 'climax',
//     name: '結末',
//     icon: '💿',
//     prefix: 'CP',
//     children: PHASES
//   }
// ]
// const EPISODES: RouteNode[] = [
//   {
//     type: 'episode',
//     name: '本編',
//     path: 'main',
//     icon: '📺',
//     prefix: 'EP',
//     children: CHAPTERS
//   }
// ]
// const SCENARIO: RouteNode[] = [
//   {
//     type: 'folder',
//     path: 'scenario',
//     name: 'シナリオ',
//     isDir: true,
//     children: EPISODES
//   }
// ]

const CHARACTERS: RouteNode[] = [
  {
    type: 'folder',
    path: 'character',
    name: 'キャラクター',
    isDir: true,
    children: [
      { type: 'character', path: 'alex', name: 'アレックス', icon: '🎭' },
      { type: 'character', path: 'brian', name: 'ブライアン', icon: '🎭' },
      { type: 'character', path: 'carol', name: 'キャロル', icon: '🎭' },
      { type: 'character', path: 'dasy', name: 'デイジー', icon: '🎭' }
    ]
  }
]

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
          { type: 'config', path: 'chara', name: 'キャラクター', icon: '🎭' },
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

export const ROUTES: RouteNode[] = [...SETTINGS, ...CHARACTERS]
