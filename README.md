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
