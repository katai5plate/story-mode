type CharacterSelector = { name: string }

interface ScriptMetadata {
  name: string
}
class Script {
  // readonly Character
  constructor() {}
  Head(meta: Partial<ScriptMetadata>): Script {
    return this
  }
  Mes(args: Commands['Message']['Show']): Script {
    return this
  }
  Do<A extends keyof Commands, B extends keyof Commands[A]>(
    category: A,
    method: B,
    args: Commands[A][B]
  ): Script {
    return this
  }
}
type ScriptCallback = Script['Do']

type JsonValue = string | number | boolean | null | JsonObject | Jsonrray
interface JsonObject {
  [key: string | number]: JsonValue
}
interface Jsonrray extends Array<JsonValue> {}
type JsonData = JsonValue | JsonObject | Jsonrray

//--SCRIPT_START--//

export const TEMPLATE_NAME = 'Default Template'

// ==============================================
// サウンド関連
// ==============================================

type AmbientName = string
type MusicName = string
type SoundName = string
type VoiceName = string

type VolumeSelector =
  | 'Max'
  | 'Music'
  | 'Ambient'
  | 'Sound'
  | 'HalfMusic'
  | 'HalfAmbient'
  | 'HalfSound'
  | 'Quiet'
  | 'Mute'
type PanpotSelector = 'Left' | 'HalfLeft' | 'Center' | 'HalfRight' | 'Right'
type SoundEffectSelector = 'echo' | 'amp' | 'mystic' | 'delay' | 'phaser'

type AudioBackType = 'Music' | 'Ambient'
type AudioType = AudioBackType | 'Sound'
type AudioTypeWithAll = AudioType | 'All'
type AudioStopType = 'Stop' | 'Pause'

// ==============================================
// 画像・描画関連
// ==============================================

type BackgroundName = string
type IllustName = string
type ParticleName = string

type CartoonSelector =
  | 'Clear'
  | 'Smile'
  | 'Anger'
  | 'Sadness'
  | 'Smile'
  | 'Surprise'
  | 'Fear'
  | 'Anticipation'
  | 'Disgust'
  | 'Ecstasy'
  | 'Worry'
  | 'Rage'
  | 'Agitation'
  | 'Anxiety'
  | 'Sleepy'
  | 'Sleep'
  | 'Kissing'
  | 'X'
  | 'Foggy'
type EmotionSelector =
  | 'Surprise'
  | 'Question'
  | 'Music'
  | 'Love'
  | 'Anger'
  | 'Sweat'
  | 'Confuse'
  | 'Silence'
  | 'Inspiration'
  | 'Sleep'
type LayerSelector = 'Back' | 'Center' | 'Front'

// ==============================================
// 画面関連
// ==============================================

type TintSelector = 'Normal' | 'Evening' | 'Night' | 'Neon' | 'Gray' | 'Sepia'
type FlashSelector = 'White' | 'Red' | 'Fire' | 'Water' | 'Wind'
type ShakeSelector = 'Small' | 'Medium' | 'Big' | 'Hyper'
type ScreenAreaSelector = 'StatusArea' | 'GameArea' | 'All'
type ScreenPositionSelector = 'Center' | CharacterSelector

type FadeType = 'In' | 'Out'

// ==============================================
// ゲーム関連
// ==============================================

type GameItemName = string

type GameOperatorSelector = '==' | '<' | '<=' | '>' | '>=' | '!=' | 'RemainderIsZeroBy'
type GameTriggerSelector = `${'status' | 'game' | 'item' | 'story'}.${string}`
type GameVariableSelector = `${'status' | 'game' | 'item' | 'story'}.${string}`
type GameModalSelector = 'TextInput' | 'NumberInput' | 'Inventory'
type GameInputSelector =
  | 'Okey'
  | 'Cancel'
  | 'Up'
  | 'Down'
  | 'Left'
  | 'Right'
  | 'SideLeft'
  | 'SideRight'
  | 'Start'
  | 'Select'
  | 'A'
  | 'B'
  | 'X'
  | 'Y'
type GameInputActionSelector = 'Down' | 'DownToUp' | 'Released' | 'Keep' | 'LongKeep'
type GameTweenSelector = 'SineIn' | 'SineOut' | 'SineInOut'
type GameSpeedSelector = 'Moment' | 'High' | 'Quick' | 'Normal' | 'Slow' | 'Low'

type GameItemOwnType = 'Get' | 'Remove'
type GameItemUseType = 'Apply' | 'Equip'

// ==============================================
// 制御関連
// ==============================================

type GotoType = 'Top' | 'End'
type VariableType = 'Trig' | 'Var'

// ==============================================
// コマンド
// ==============================================

export interface Commands {
  Message: {
    Show: {
      chara: CharacterSelector
      mes: string[]
      voice?: VoiceName
    }
    Update: {
      speed?: GameSpeedSelector | null
      window?: boolean
    }
  }
  Character: {
    Show: {
      chara: CharacterSelector
      emote: EmotionSelector
      cartoon: CartoonSelector
      pos: ScreenPositionSelector
      tween: GameTweenSelector
    }
    Update: {
      show?: boolean
      move?: {
        pos: ScreenPositionSelector
        tween: GameTweenSelector
      }
      name?: string
    }
  }
  Sprite: {
    Show: {
      image: BackgroundName | IllustName
      layer: LayerSelector
      fade: {
        tween: GameTweenSelector
        wait: boolean
      }
    }
    Update: {
      show?: boolean
      fade?: {
        tween: GameTweenSelector
        wait: boolean
      }
    }
  }
  Audio: {
    Play: {
      media: MusicName | AmbientName | SoundName
      volume?: VolumeSelector
      panpot?: PanpotSelector
      effect?: SoundEffectSelector
      fade?: {
        tween: GameTweenSelector
        wait: boolean
      }
    }
    Stop: {
      media: AudioType
      type: AudioStopType
      fade?: {
        tween: GameTweenSelector
        wait: boolean
      }
    }
    Restore: {
      media: AudioType
      fade?: {
        tween: GameTweenSelector
        wait: boolean
      }
    }
    Update: {
      media: AudioBackType
      volume?: VolumeSelector
      panpot?: PanpotSelector
      effect?: SoundEffectSelector
      fade?: {
        tween: GameTweenSelector
        wait: boolean
        cross?: MusicName | AmbientName
      }
    }
    ForceStop: {
      media: AudioTypeWithAll
    }
  }
  Screen: {
    Play: {
      id: string
      media: Animation | ParticleName
      layer: LayerSelector
      pos: ScreenPositionSelector
      wait: boolean
    }
    Stop: {
      id: string
    }
    Effect: {
      tint?: {
        media: TintSelector
        fade?: {
          tween: GameTweenSelector
          wait: boolean
        }
      }
      flash?: { media: FlashSelector; wait: boolean }
      shake?: { media: ShakeSelector; wait: boolean }
      black?: {
        to: FadeType
        area: ScreenAreaSelector
        fade?: {
          tween: GameTweenSelector
          wait: boolean
        }
      }
    }
    Modal: { media: GameModalSelector; active: boolean }
  }
  Flow: {
    Label: { name: string }
    Go: { to: GotoType }
    Call: { script: Script; comeback?: boolean }
    Wait: {
      sec: number
      input: {
        type: GameInputSelector
        action: GameInputActionSelector
      }
    }
    Trig: {
      name: GameTriggerSelector | string
      value: boolean
    }
    Var: {
      name: GameVariableSelector | string
      value: JsonData
    }
    ClearLocal: { type: VariableType }
    IfTrig: {
      name: GameTriggerSelector | string
      op: GameOperatorSelector
      value: boolean
      then: ScriptCallback
      else?: ScriptCallback
    }
    IfVar: {
      name: GameVariableSelector | string
      op: GameOperatorSelector
      value: JsonData
      then: ScriptCallback
      else?: ScriptCallback
    }
  }
  Game: {
    Item: {
      target: GameItemName
      own?: { op: GameItemOwnType; count: number }
      use?: GameItemUseType
    }
  }
  Debug: {
    Log: { json: JsonData }
    Error: {
      message: string
      content?: JsonData
    }
    Any: { json: JsonData }
  }
}

// ==============================================
// ユーティリティ
// ==============================================

/** Unity TMP 専用タグを追加する */
export const tag = {
  /** ハイパーリンクを定義します。href 属性を使ってハイパーリンクの URL を定義します */
  a: (href: string, text: string) => `<a href="${href}">${text}</a>`,
  /** テキストの水平整列を変更します。同じ行に複数の整列タグを配置すると、最後のタグが他のタグをオーバーライドします */
  align: (pos: 'left' | 'center' | 'right' | 'justified' | 'flush', text: string) =>
    `<align="${pos}">${text}</align>`,
  /** テキストを大文字に変換します */
  allcaps: (text: string) => `<allcaps>${text}</allcaps>`,
  /** 	テキストの不透明度を変更します。16 進数を使います */
  alpha: (code: `#${string}`, text: string) => `<alpha="${code}">${text}</alpha>`,
  /** 太字でテキストを描画します */
  b: (text: string) => `<b>${text}</b>`,
  /** テキストを強制的に改行します */
  br: () => `<br/>`,
  /** テキストの色、または色と不透明度を変更します。色名と 16 進値に対応しています。同じテキストに連続してタグを適用すると、別のタグを追加するか、終了タグを使用して現在の色の範囲を終了するまで、最後のタグが他のタグよりも優先されます */
  color: (code: string, text: string) => `<color="${code}">${text}</color>`,
  /** 文字間の間隔を、元のフォントアセットに対して絶対的または相対的に変更します。ピクセルまたはフォント単位を使用します。プラスに調整すると文字が離れ、マイナスに調整すると文字が寄ります */
  cspace: (size: `${number}${'px' | 'em'}`, text: string) => `<cspace="${size}">${text}</cspace>`,
  /** テキストのフォントを変更します */
  font: (face: string, text: string) => `<font="${face}">${text}</font>`,
  /** テキストのフォントウェイトを、フォントアセット で定義されているウェイトのいずれかに変更します。フォントのウェイトを定義していない場合でも、普通では400、太字では 700 を使用します */
  fontWeight: (weight: number, text: string) => `<font-weight="${weight}">${text}</font>`,
  /** テキストに カラーグラデーション を適用します */
  gradient: (code: string, text: string) => `<gradient="${code}">${text}</gradient>`,
  /** 斜体でテキストを描画します */
  i: (text: string) => `<i>${text}</i>`,
  /** タグと次の改行の間のテキストをすべてインデントします。このタグを使用して、箇条書きのような、単語の折り返しと連動するテキストパターンを作成します。インデントをピクセル、フォント単位、パーセントで指定します */
  indent: (per: `${number}%`) => `<indent="${per}">`,
  /** 行の高さを、フォントアセットで指定されているデフォルトの行の高さに対して相対的に変更します。行の高さをピクセル、フォント単位、またはパーセントで指定します */
  lineHeight: (per: `${number}%`) => `<line-height="${per}">`,
  /** 改行するたびに最初の行をインデントします。単語の折り返しによって作成された新しい行はインデントされません */
  lineIndent: (per: `${number}%`) => `<line-indent="${per}">`,
  /** テキストを小文字に変換します */
  lowcase: (text: string) => `<lowcase>${text}</lowcase>`,
  /** テキストの水平マージンを設定します。余白はピクセル、フォント単位、パーセントで指定します。マイナスの値は効果がありません */
  margin: (size: `${number}${'px' | 'em' | '%'}`) => `<margin="${size}">`,
  /** テキストの左マージンを設定します。余白はピクセル、フォント単位、パーセントで指定します。マイナスの値は効果がありません */
  marginLeft: (size: `${number}${'px' | 'em' | '%'}`) => `<margin-left="${size}">`,
  /** テキストの右マージンを設定します。余白はピクセル、フォント単位、パーセントで指定します。マイナスの値は効果がありません */
  marginRight: (size: `${number}${'px' | 'em' | '%'}`) => `<margin-right="${size}">`,
  /** 色のついたオーバーレイでテキストをハイライトします。テキストが透けて見えるようにするには、オーバーレイは半透明 (アルファ値が 1 未満) でなければなりません */
  mark: (color: string, text: string) => `<mark="${color}">${text}</mark>`,
  /** フォントの文字間隔をオーバーライドし、等幅フォントにします */
  mspace: (size: `${number}${'px' | 'em'}`) => `<margin="${size}">`,
  /** テキストのセグメントをまとめます */
  nobr: (text: string) => `<nobr>${text}</nobr>`,
  /** リッチテキストタグの解析を防ぎます */
  noparse: (text: string) => `<noparse>${text}</noparse>`,
  /** 現在の行の水平方向のキャレット位置を設定します。水平位置をピクセル、フォント単位、パーセンテージで指定します */
  pos: (size: `${number}${'px' | 'em' | '%'}`) => `<pos="${size}">`,
  /** 各文字をその中心に対して回転させます。回転量を度単位で指定します。正の値は文字を反時計回りに回転させます。負の値は時計回りに回転させます。回転は文字の間隔に影響し、場合によっては文字が重なることがあります。必要に応じて cspace タグで文字間隔を修正してください */
  rotate: (angle: number, text: string) => `<rotate="${angle}">${text}</rotate>`,
  /** テキストに打消し線を引きます */
  s: (text: string) => `<s>${text}</s>`,
  /** フォントサイズを調整します。新しいサイズをピクセル、フォント単位、またはパーセントで指定します。ピクセルの調整には、絶対 (5px など) と相対 (+1 や -1 など) があります。相対サイズは元のフォントサイズを基準とします。つまり、累積ではありません */
  size: (value: `${number}${'px' | 'em' | '%'}`) => `<size="${value}">`,
  /** テキストを小文字に変換します */
  smallcaps: (text: string) => `<smallcaps>${text}</smallcaps>`,
  /** それ自身と残りのテキストとの間に水平オフセットを加えます。オフセットをピクセルまたはフォント単位で指定します */
  space: (value: `${number}${'px' | 'em' | '%'}`) => `<space="${value}">`,
  /** スプライトアセットから スプライト をテキストに加えます。tint: 1 を追加すると、スプライトに Vertext Color が適用されます */
  sprite: (name: string, opt?: { index?: number; vertextColor?: boolean; color?: string }) =>
    `<sprite="${name}"${opt?.index ? ` index="${opt.index}"` : ''}${
      opt?.vertextColor ? ` tint=1` : ''
    }${opt?.color ? ` color="${opt.color}"` : ''}>`,
  /** ベースラインより少し上に線を引き、テキストを打ち消します */
  strikethrough: () => `<strikethrough>`,
  /** テキストに カスタムスタイル を適用します */
  style: (
    type: 'Normal' | 'H1' | 'Quote' | 'Link' | 'Title' | 'H2' | 'H3' | `C${number}`,
    text: string
  ) => `<style="${type}">${text}</style>`,
  /** テキストを下付き文字に変換します */
  sub: (text: string) => `<sub>${text}</sub>`,
  /** テキストを上付き文字に変換します */
  sup: (text: string) => `<sup>${text}</sup>`,
  /** テキストに下線を引きます */
  u: (text: string) => `<u>${text}</u>`,
  /** テキストを大文字に変換します */
  uppercase: (text: string) => `<uppercase>${text}</uppercase>`,
  /** ベースラインに垂直方向のオフセットを与える。オフセットをピクセルまたはフォント単位で指定します。オフセットは常に元のベースラインに対し相対的です */
  voffset: (value: `${number}${'px' | 'em'}`, text: string) =>
    `<voffset="${value}">${text}</voffset>`,
  /** テキストエリアの水平サイズを変更します */
  width: (value: `${number}${'px' | '%'}`) => `<width="${value}">`,
  /** TextMeshProRuby でテキストにルビを振ります */
  r: (ruby: string, text: string) => `<r="${ruby}">${text}</r>`
}

/** Unity TMP 専用タグが適用されていない文章の状態をシミュレートする */
export const removeTags = (text: string) => {
  const a = `＜${Math.random().toString(36)}＞`
  const b = `＜${Math.random().toString(36)}＞`
  return text
    .replace(new RegExp(tag.noparse('(.*?)'), 'g'), (_, t) => t.replace(/</g, a).replace(/>/g, b))
    .replace(/<.*?>/g, '')
    .replace(new RegExp(a, 'g'), '<')
    .replace(new RegExp(b, 'g'), '>')
}
