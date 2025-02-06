/** Unity TMP 専用タグを追加する */
export const tag = {
  /** ハイパーリンクを定義します。href 属性を使ってハイパーリンクの URL を定義します */
  a: (href: string, text: string) => `<a href="${href}">${text}</a>`,
  /** テキストの水平整列を変更します。同じ行に複数の整列タグを配置すると、最後のタグが他のタグをオーバーライドします */
  align: (
    pos: "left" | "center" | "right" | "justified" | "flush",
    text: string
  ) => `<align="${pos}">${text}</align>`,
  /** テキストを大文字に変換します */
  allcaps: (text: string) => `<allcaps>${text}</allcaps>`,
  /** 	テキストの不透明度を変更します。16 進数を使います */
  alpha: (code: `#${string}`, text: string) =>
    `<alpha="${code}">${text}</alpha>`,
  /** 太字でテキストを描画します */
  b: (text: string) => `<b>${text}</b>`,
  /** テキストを強制的に改行します */
  br: () => `<br/>`,
  /** テキストの色、または色と不透明度を変更します。色名と 16 進値に対応しています。同じテキストに連続してタグを適用すると、別のタグを追加するか、終了タグを使用して現在の色の範囲を終了するまで、最後のタグが他のタグよりも優先されます */
  color: (code: string, text: string) => `<color="${code}">${text}</color>`,
  /** 文字間の間隔を、元のフォントアセットに対して絶対的または相対的に変更します。ピクセルまたはフォント単位を使用します。プラスに調整すると文字が離れ、マイナスに調整すると文字が寄ります */
  cspace: (size: `${number}${"px" | "em"}`, text: string) =>
    `<cspace="${size}">${text}</cspace>`,
  /** テキストのフォントを変更します */
  font: (face: string, text: string) => `<font="${face}">${text}</font>`,
  /** テキストのフォントウェイトを、フォントアセット で定義されているウェイトのいずれかに変更します。フォントのウェイトを定義していない場合でも、普通では400、太字では 700 を使用します */
  fontWeight: (weight: number, text: string) =>
    `<font-weight="${weight}">${text}</font>`,
  /** テキストに カラーグラデーション を適用します */
  gradient: (code: string, text: string) =>
    `<gradient="${code}">${text}</gradient>`,
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
  margin: (size: `${number}${"px" | "em" | "%"}`) => `<margin="${size}">`,
  /** テキストの左マージンを設定します。余白はピクセル、フォント単位、パーセントで指定します。マイナスの値は効果がありません */
  marginLeft: (size: `${number}${"px" | "em" | "%"}`) =>
    `<margin-left="${size}">`,
  /** テキストの右マージンを設定します。余白はピクセル、フォント単位、パーセントで指定します。マイナスの値は効果がありません */
  marginRight: (size: `${number}${"px" | "em" | "%"}`) =>
    `<margin-right="${size}">`,
  /** 色のついたオーバーレイでテキストをハイライトします。テキストが透けて見えるようにするには、オーバーレイは半透明 (アルファ値が 1 未満) でなければなりません */
  mark: (color: string, text: string) => `<mark="${color}">${text}</mark>`,
  /** フォントの文字間隔をオーバーライドし、等幅フォントにします */
  mspace: (size: `${number}${"px" | "em"}`) => `<margin="${size}">`,
  /** テキストのセグメントをまとめます */
  nobr: (text: string) => `<nobr>${text}</nobr>`,
  /** リッチテキストタグの解析を防ぎます */
  noparse: (text: string) => `<noparse>${text}</noparse>`,
  /** 現在の行の水平方向のキャレット位置を設定します。水平位置をピクセル、フォント単位、パーセンテージで指定します */
  pos: (size: `${number}${"px" | "em" | "%"}`) => `<pos="${size}">`,
  /** 各文字をその中心に対して回転させます。回転量を度単位で指定します。正の値は文字を反時計回りに回転させます。負の値は時計回りに回転させます。回転は文字の間隔に影響し、場合によっては文字が重なることがあります。必要に応じて cspace タグで文字間隔を修正してください */
  rotate: (angle: number, text: string) =>
    `<rotate="${angle}">${text}</rotate>`,
  /** テキストに打消し線を引きます */
  s: (text: string) => `<s>${text}</s>`,
  /** フォントサイズを調整します。新しいサイズをピクセル、フォント単位、またはパーセントで指定します。ピクセルの調整には、絶対 (5px など) と相対 (+1 や -1 など) があります。相対サイズは元のフォントサイズを基準とします。つまり、累積ではありません */
  size: (value: `${number}${"px" | "em" | "%"}`) => `<size="${value}">`,
  /** テキストを小文字に変換します */
  smallcaps: (text: string) => `<smallcaps>${text}</smallcaps>`,
  /** それ自身と残りのテキストとの間に水平オフセットを加えます。オフセットをピクセルまたはフォント単位で指定します */
  space: (value: `${number}${"px" | "em" | "%"}`) => `<space="${value}">`,
  /** スプライトアセットから スプライト をテキストに加えます。tint: 1 を追加すると、スプライトに Vertext Color が適用されます */
  sprite: (
    name: string,
    opt?: { index?: number; vertextColor?: boolean; color?: string }
  ) =>
    `<sprite="${name}"${opt.index ? ` index="${opt.index}"` : ""}${
      opt.vertextColor ? ` tint=1` : ""
    }${opt.color ? ` color="${opt.color}"` : ""}>`,
  /** ベースラインより少し上に線を引き、テキストを打ち消します */
  strikethrough: () => `<strikethrough>`,
  /** テキストに カスタムスタイル を適用します */
  style: (
    type:
      | "Normal"
      | "H1"
      | "Quote"
      | "Link"
      | "Title"
      | "H2"
      | "H3"
      | `C${number}`,
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
  voffset: (value: `${number}${"px" | "em"}`, text: string) =>
    `<voffset="${value}">${text}</voffset>`,
  /** テキストエリアの水平サイズを変更します */
  width: (value: `${number}${"px" | "%"}`) => `<width="${value}">`,
  /** TextMeshProRuby でテキストにルビを振ります */
  r: (ruby: string, text: string) => `<r="${ruby}">${text}</r>`,
};

/** Unity TMP 専用タグが適用されていない文章の状態をシミュレートする */
export const removeTags = (text: string) => {
  const a = `＜${Math.random().toString(36)}＞`;
  const b = `＜${Math.random().toString(36)}＞`;
  return text
    .replace(new RegExp(tag.noparse("(.*?)"), "g"), (_, t) =>
      t.replace(/</g, a).replace(/>/g, b)
    )
    .replace(/<.*?>/g, "")
    .replace(new RegExp(a, "g"), "<")
    .replace(new RegExp(b, "g"), ">");
};
