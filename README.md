# story-mode

ゲームシナリオライティング特化型内部 DSL

## memo

- JSON から送られる想定のメッセージ一覧
  - Character
    - id
    - emotionId
    - cartoonId
  - Screen
    - screenPositionId
    - tweenId
    - fadeId
    - tintId
    - flashId
    - shakeId
    - screenAreaId
    - transitionId
    - modalId
  - Animation
    - speedId
    - animationId
    - particleId
  - Message
    - voiceId
    - fontId
  - Sprite
    - backgroundImageId
    - layerId
    - illustId
  - Audio
    - bgmId
    - bgsId
    - soundId
    - volumeId
    - panpotId
  - Interactive
    - id
    - action
  - Game
    - triggerId
    - variableId
    - itemId
    - equipId
    - useId
  - Script
    - id
    - beatId
  - Custom
    - id

```
// 画面制御関連
playingAnimationId // Script内制御
playingParticleId // Script内制御
isWait // Script内制御
resultVariableId // Engine内部変数でいいのでは？

// 条件分岐関連
localTriggerId // Script内制御
localVariableId // Script内制御
```

```js
new Script(($) =>
  $.Head({ name: "デモコード" })
    .Mes({
      chara: $.REF.Character.Alex,
      mes: [
        "ああああああああああああ",
        "いいいいいいいいいいいい",
        "うううううううううううう",
      ],
    })
    .Mes({
      chara: $.REF.Character.Alex,
      mes: [
        "はっ！", //
      ],
    })
    .Do("Message", "Show", {
      chara: $.REF.Character.Alex,
      mes: [
        `aaaaaaa${tag.b("123")}bbbbbbbb`,
        `aaaaaaa${tag.b("123")}bbbbbbbb`,
        `aaaaaaa${tag.b("123")}bbbbbbbb`,
      ],
    })
    .Do("Audio", "Play", { media: null as MusicAsset })
    .Do("Audio", "Play", { media: null as SoundAsset })
    .Do("Debug", "Any", { json: "aaaa" })
);
```

```ts
export const No1_Intro: Book<typeof Chapter, ChapterPlot>['No1_Intro'] = {
  name: '',
  summary: ''
}
```

```ts
import { CharacterTemplate } from '../../types/characters'
import { custom, CustomRef } from '../../types/custom'
import { dialogExamples } from '../../utils'
import { Duty } from '../grid/character/duty'

export const Character = custom({
  Alex: {
    name: 'アレックス',
    duty: Duty.Hero,
    basic: {
      gender: '男',
      age: 20,
      height: 170,
      weight: 75,
      body: '標準体型'
    },
    experience: {
      workAndHoby: {
        detail: '勇者',
        dailyLife: '普段は街の見回り',
        skills: '剣術に長けている',
        socialRelationships: '王直属の騎士として有名'
      },
      histories: [
        {
          name: '現在',
          appearance: '勇者っぽい恰好',
          personality: {
            basic: '完璧主義者',
            different: 'サボるための行動だけ徹底する',
            reason: 'バレたときひどいことになった'
          },
          weakness: '童貞',
          desire: {
            detail: '隣国の勇者みたいにモテモテになる',
            motivation: '隣国の勇者への憧れとリビドー',
            likesAndDislikes: 'ピーマンが嫌い'
          }
        }
      ],
      dialogExamples: dialogExamples({
        Money: {
          answer: '「よっしゃあうほほい大金だ～」'
        },
        Midnight: {
          answer: '顔色が変わり、無言になり、姿勢を低くする'
        },
        Bank: {
          answer: ['「あっ！」と大声を出して気を逸らそうとし、', '相手が油断した瞬間に攻撃に入る']
        },
        Island: {
          answer: '「とりあえず、寝るかぁ～」'
        }
      })
    }
  }
} as const satisfies CustomRef<CharacterTemplate>)
```

```
キャラごとのフォントや文字効果音などはエンジン側でやるものなので廃止
```

```ts
type ScenarioNodes = [
  {
    id: 'uuid'
    parentId: 'uuid' | null
    name: string
    type: 'episode' | 'chapter' | 'phase' | 'beat'
    forms: {
      summary: string
      plot: string[]
    } & CustomForms
  }
]
```

```ts
interface MindMapNode {
  type: string
  name: string
  children?: MindMapNode[]
}

const genTree = (order: string[], template: { [key: string]: { id: string }[] }): MindMapNode[] => {
  const buildNodes = (level: number): MindMapNode[] => {
    const currentKey = order[level]
    if (!currentKey || !template[currentKey]) return []
    return template[currentKey].map((entry) => {
      const node: MindMapNode = {
        type: currentKey,
        name: entry.id
      }
      const children = buildNodes(level + 1)
      if (children.length > 0) node.children = children
      return node
    })
  }
  return buildNodes(0)
}

console.log(
  genTree(['episode', 'chapter', 'phase', 'beat', 'script'], {
    episode: [{ id: 'main' }, { id: 'sub' }],
    chapter: [{ id: 'intro' }, { id: 'chain' }, { id: 'barrier' }, { id: 'climax' }],
    phase: [{ id: 'init' }, { id: 'hurdle' }, { id: 'agony' }, { id: 'resolve' }],
    beat: [{ id: 'request' }, { id: 'response' }, { id: 'next' }],
    script: [{ id: 'main' }]
  })
)
```

```
export type RouteNode = {
  DELETE_type: string
  path: string
  MIX_NAME_name: string
  MIX_NAME_icon?: string
  isOpen?: boolean
  MIX_NAME_prefix?: string
  MIX_MODE_isDir?: boolean
  MIX_MODE_isButton?: boolean
  children?: RouteNode[]
  _index?: number
  _alias?: string
}
```

```ts
interface FlatNode {
  parent: null | string
  uid: string
  index: number
  name: string
  side:
    | 'dir' // 通常フォルダ
    | 'condir' // 設定つきフォルダ
    | 'call' // 関数実行
    | 'favorite' // お気に入り + favorite
    | 'actor' // アクター + actor
    | 'episode' // エピソード（condir）+ plot
    | 'chapter' // チャプター（condir）+ plot
    | 'phase' // フェーズ（condir）+ plot
    | 'beat' // ビート（condir）+ plot
    | 'script' // スクリプト + script
  favorite?: string
  actor?: ActorForm
  plot?: PlotForm
  script?: ScriptForm
}
const sidebarNodes: FlatNode[] = [
  { parent: null, uid: 'df-config', index: 0, name: '設定', side: 'dir' },
  { parent: null, uid: 'df-favorite', index: 1, name: 'お気に入り', side: 'dir' },
  { parent: null, uid: 'df-actor', index: 2, name: 'アクター', side: 'condir' },
  { parent: null, uid: 'df-scenario', index: 3, name: 'シナリオ', side: 'dir' },
  { parent: null, uid: 'df-common', index: 3, name: '共通スクリプト', side: 'dir' },

  // 設定
  { parent: 'df-config', uid: 'df-file', index: 0, name: 'ファイル', side: 'dir' },
  { parent: 'df-config', uid: 'df-tag', index: 1, name: 'シナリオ', side: 'dir' },
  { parent: 'df-config', uid: 'df-tag', index: 2, name: 'タグ', side: 'dir' },

  // 設定 -> ファイル
  { parent: 'df-file', uid: 'df-new', index: 0, name: '✨ 新規', side: 'call' },
  { parent: 'df-file', uid: 'df-open', index: 1, name: '📥 開く', side: 'call' },
  { parent: 'df-file', uid: 'df-save', index: 2, name: '💾 保存', side: 'call' },
  { parent: 'df-file', uid: 'df-export', index: 3, name: '🖨️ エクスポート', side: 'call' },

  // 設定 -> シナリオ
  { parent: 'df-scenario', uid: 'df-actor', index: 0, name: '🎭 アクター', side: 'call' },
  { parent: 'df-scenario', uid: 'df-episode', index: 1, name: '📺 エピソード', side: 'call' },
  { parent: 'df-scenario', uid: 'df-chapter', index: 2, name: '💿 チャプター', side: 'call' },
  { parent: 'df-scenario', uid: 'df-phase', index: 3, name: '🎞️ フェーズ', side: 'call' },
  { parent: 'df-scenario', uid: 'df-beat', index: 4, name: '🎥 ビート', side: 'call' },
  { parent: 'df-scenario', uid: 'df-script', index: 5, name: '📝 スクリプト', side: 'call' },

  // 設定 -> タグ
  { parent: 'df-tag', uid: 'df-tagconfig', index: 0, name: '🏷️ 管理', side: 'call' },
  { parent: 'df-tag', uid: 'df-tagsearch', index: 1, name: '🔎 検索', side: 'call' },

  // お気に入り
  {
    parent: 'df-favorite',
    uid: 'fa-df-ac-001',
    index: 0,
    name: '⭐ 主人公',
    side: 'favorite',
    favorite: 'ac-001'
  },

  // アクター
  {
    parent: 'df-actor',
    uid: 'ac-001',
    index: 0,
    name: '勇者アレックス',
    side: 'actor',
    actor: {}
  },
  {
    parent: 'df-actor',
    uid: 'ac-002',
    index: 0,
    name: '魔王デモン',
    side: 'actor',
    actor: {}
  },

  // シナリオ
  {
    parent: 'df-scenario',
    uid: 'ep-main',
    index: 0,
    name: '本編',
    side: 'episode',
    plot: {}
  },
  {
    parent: 'ep-main',
    uid: 'ch-main-intro',
    index: 0,
    name: '始動',
    side: 'chapter',
    plot: {}
  },
  {
    parent: 'ch-main-intro',
    uid: 'ph-main-intro-init',
    index: 0,
    name: '発意',
    side: 'phase',
    plot: {}
  },
  {
    parent: 'ph-main-intro-init',
    uid: 'be-main-intro-init-request',
    index: 0,
    name: '因果',
    side: 'beat',
    plot: {}
  },
  {
    parent: 'be-main-intro-init-request',
    uid: 'sc-main-intro-init-request-default',
    index: 0,
    name: 'default',
    side: 'script',
    script: {}
  },

  // 共通スクリプト
  {
    parent: 'df-common',
    uid: 'cm-sample',
    index: 0,
    name: 'サンプル',
    side: 'script',
    script: {}
  }
]
```
