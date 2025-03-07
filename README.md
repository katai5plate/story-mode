# story-mode

ゲームシナリオライティング特化型内部 DSL

## memo

- 案
  - コマンドもフラットノード管理とする
  - メッセージコマンド、選択肢コマンドはアプリ固有とする
  - ID もサイドバーから管理出来るようにし、コマンドで Select できるようにする
  - フロー制御は一旦アプリ側かカスタムコマンドとし、階層構造にはしない
    - ラベル系
    - ハッシュのラベルを生成する `cc-`
      - 選択肢
      - 条件式
    - ちょっと考える必要がある
      - ゲーム変数演算
      - ローカル変数演算

```ts
type ExportedJSON = {
  methodId: string
  req: JSONValue[]
  opt: Record<string, JSONValue>
  labels?: string[]
}[]
```

```cobol
/// IF
IF a == 1 : *SKIP
MES "true"
*SKIP

/// IF_ELSE
IF a == 1 : *FALSE, *SKIP
MES "true"
GOTO *SKIP
*FALSE
MES "false"
*SKIP

/// SWITCH (CHOICE)
SWITCH a, 1, 2, 3 : *CASE2, *CASE3, *DEFAULT, *SKIP
MES "1"
GOTO *SKIP
*CASE2
MES "2"
GOTO *SKIP
*CASE3
MES "3"
GOTO *SKIP
*DEFAULT
MES "else"
*SKIP

/// WHILE
*LOOP
IF a == 1 : *SKIP
MES "loop"
// GOTO *SKIP
GOTO *LOOP
*SKIP

/// DO_WHILE
*LOOP
MES "loop"
// GOTO *SKIP
IF a == 1 : *LOOP
*SKIP
```

- IF, LABEL, GOTO があればチューリング完全は保障される
  - だが煩雑性回避のために SWITCH を用意する必要がある
- インタプリタは IF, SWITCH, GOTO, LABEL の実装が必須
  - method にはその他にも、任意の命令を登録可能
  - 処理内容の責任は完全にインタプリタ側にあり、コード側は命令文を出力するだけの責務を負う
  - IF, IF_ELSE, WHILE, DO_WHILE を IF, GOTO, LABEL に置き換えるのは責任を持つ
- 決める
  - カスタムさせない
    - LABEL
    - GOTO
  - デフォルト装備
    - REPEAT -> LABEL
    - LOOP -> GOTO
    - BREAK -> GOTO

```
ShowChoice ["0","1"] {"case2":"2","case3":"3","cancel":true}
LABEL case0
...
GOTO next
LABEL case1
...
GOTO next
LABEL case2
...
GOTO next
LABEL case3
...
GOTO next
LABEL cancel
...
GOTO next
LABEL next
```

```ts
interface CodeNode {
  parent: string | null
  uid: string // {method.name}-{hash}
  parentLabel: string
  index: number
  method: CommandMethodMember
  req: JSONData[]
  opt: Record<string, JSONData>
}
```

```
⚙ メッセージを表示
  アクター=アレックス
  メッセージ=
  あいうえおかきくけこさしすせそたちつてと
  あいうえおかきくけこさしすせそたちつてと
  あいうえおかきくけこさしすせそたちつてと
  表情差分= 漫画吹出差分= カスタム名= 文字スピード= ボイス ID=
⚙ 選択肢の表示
  0, 1, 2 キャンセル=する 時間制限（秒）=30
  ⚙ ケース 0
  ⚙ ケース 1
  ⚙ ケース 2
  ⚙ ケース キャンセル
  ⚙ ケース 時間制限（秒）
```

- 指針
  - まずは普通のコマンドを並べるところまで作る
  - フロー系はその後考える
- それか・・・
  - そもそもGOTOも条件式も作らない仕様にしてしまう？
    - 「フラグ」という概念もしくはカスタムIDを親に作り、その中身を書く。
    - 条件式自体はゲーム側責務とし、台詞を「再生」するのみ
    - その場合・・・
      - ランダム文字列を作りたいときは？その量が多くて細かい場合は？
      - 好感度によって変わる文字列を作りたいときは？

```
スクリプト「ON_TEST_DIALOGUE」 を編集 [[▽]]

[[ 削除 ]]
会話コード: [ON_TEST_DIALOGUE]
[[ コマンドパレットを開く ]]
エディタ:
-------------------------------------------
@フロー.変数演算: 左辺ローカル変数="A" 演算子="＝" 右辺値=0
@フロー.ラベル: 名前="ループ"
@メッセージ.設定: アクター="Alex" 表情差分="錯乱" ボイスID="テスト123"
あいうえおかきくけこさしすせそ
あいうえおかきくけこさしすせそ
あいうえおかきくけこさしすせそ
##
あいうえおかきくけこさしすせそ
あいうえおかきくけこさしすせそ
あいうえおかきくけこさしすせそ{！|？}
@フロー.変数演算: 左辺ローカル変数="A" 演算子="＋" 右辺値=1
@フロー.条件分岐: 左辺ローカル変数="A" 演算子="＝" 右辺値=100 ラベル="ループ"
@フロー.飛ぶ: ラベル="ループ"
@メッセージ.設定: 表情差分="沈黙"
#
@メッセージ.選択肢を表示 1="はい" 2="いいえ"
@メッセージ.ラベル 1
はい！
@メッセージ.ラベル 2
いいえ！
@メッセージ.選択肢ここまで
-------------------------------------------
[[ 構文チェック ]]
```

```ts
interface Command {
  name: string
  id: string
  // goto なし
  arg: {
    name: string
    id: string
    type: string[]
    labeling?: boolean // id を名前空間内のラベルにする
  }
  // 自動追加する終端コマンド
  end?: {
    id: string
    arg?: Record<string, string | number | boolean | null>
    when?: string // arg.id が入力されている場合に生成
  }[]
}
interface Label {
  name: string
  id: string
}
```

- 方針転換
  - メッセージの追加とメッセージ設定を同じコマンドとしていたが、直書きでそのままセリフを書けるように
  - 命令は@を最初につけるルールにする
  - 文字タグは完全にインタプリタ側の責務とする
  - インタプリタ側で会話コードを選んで再生するというイメージにする
  - 条件分岐はラベルへ飛ぶかどうかのみ問う形にする
  - ウィンドウを出したいが何も文字を表示したく無い場合、#空欄 と書く。JSON出力時に""に変換される
- 技術スタック
  - CodeMirror6
    - 動的補完が無理だった場合、色つきハイライトとコマンドパレットでいいやと思った。
- やること
  - コマンドリストをそれ用に最適化
    - メッセージの追加を「メッセージ設定」に変更
    - req/opt の概念をなくし、全部 opt にする
  - まずはCM6で叩き台を作る
  - 結合
  - 補完が物理的に無理だと発覚した場合はコマンドパレットモーダルを作る

```
@メッセージ.選択肢開始 選択１="はい" 選択２="いいえ"
@メッセージ.選択肢分岐 選択="選択１"
はい！
@メッセージ.選択肢分岐 選択="選択２"
いいえ！
@メッセージ.選択肢終了

@変数.ローカル変数 A="IntA" 演算="＝" B=100
@変数.ローカル条件開始 正しい="１００" 間違い="エラー"
@変数.ローカル条件分岐 結果="１００"
１００だ！
@変数.ローカル条件分岐 結果="エラー"
違うぞ！
@変数.ローカル条件終了
```

自作言語の書き方

```
@メッセージ.設定 表示=O

@メッセージ.選択肢開始 選択１="はい" 選択２="いいえ"
@メッセージ.選択肢分岐 選択="選択１"
はい！
@メッセージ.選択肢分岐 選択="選択２"
いいえ！
@メッセージ.選択肢終了

@変数.ローカル変数 A="IntA" 演算="＝" B=100

@変数.ローカル条件開始 正しい="１００" 間違い="エラー"
@変数.ローカル条件分岐 結果="１００"
１００だ！
@変数.ローカル条件分岐 結果="エラー"
違うぞ！
@変数.ローカル条件終了
```

要件

- `@名前空間.命令名 引数=値 引数=値 引数=値 ...`
- 直接文字入力は「メッセージ」として処理される
  - `#` と入力すると、空行扱いになる
  - `##` と入力すると、改ページ扱いになる
- 名前空間、命令名、引数、値それぞれ、補完を効かせたい。

値の型

- 文字列 `"abc"`
  - 自由入力型
  - カスタムID型 (並行作動しているアプリで定義されたIDが候補に出てくるので、それを入力)
  - JSON文字列型 (インタプリタが判断するので今回は自由入力型と同じように考えて良い)
  - ラベル型 (後述の"label", "goto")
- 数値 `123`
- 真偽 `X` `O` (それぞれ false, true)

定義ファイル

```
interface CommandJSON {
  // 命令定義
  method: {
    name: string // 入力する名前空間名
    id: string // 名前空間 ID
    // 命令
    members: {
      name: string // 入力する命令名
      id: string // 命令 ID
      summary: string // 命令の説明
      arg: {
        name: string // 入力する引数名
        id: string // 引数ID
        type:
          | 'label' // テキスト入力後、名前空間内命令でgoto型で参照可
          | 'goto' // 名前空間ラベルのセレクトボックス
          | 'json' // JSON文字列
          | 'num' // 数値型
          | 'text' // 文字列型
          | 'toggle' // 真偽型
          | 'value' // number | string | boolean | null
          | 'vec' // "x, y" or "x, y, z"
          | 'actor' // アクター
          // id 指定（どのカスタムIDを参照するか）
          | `id.${string}`
        // name, id をラベル化するか
        labeling?: boolean
      }[]
      // 自動追加する終端コマンド
      end?: {
        // 挿入する命令 ID
        mid: string
        // 挿入する命令の引数
        arg?: Record<
          string, // 引数 ID
          // 通常値
          | string
          | number
          | boolean
          | null
          // 指定された引数 ID の値を参照する
          | [string]
        >
        // 特定の引数 ID に値が入っている場合に自動追加する
        when?: string[]
      }[]
    }[]
  }[]
  customId: {
    // GUI用のフォルダーラベル
    name: string
    // カスタムIDリスト
    members: {
      name: string // カスタム ID 名
      id: string // カスタム ID の ID
      // カスタム ID の選択肢
      options: {
        name: string // 表示・入力名
        value: JsonData // トランスパイル時に置き換えられる値
      }[]
    }[]
  }[]
}
```

開発

```
import { StreamLanguage } from '@codemirror/language'
import { Completion, CompletionContext } from '@codemirror/autocomplete'
import { linter, Diagnostic } from '@codemirror/lint'
import { useCodeMirror } from '@uiw/react-codemirror'
import { autocompletion } from '@codemirror/autocomplete'
import { keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { searchKeymap } from '@codemirror/search'
import { lintKeymap } from '@codemirror/lint'
```

- 難しく考えすぎていないか？一旦考えよう。
  - そもそも、シナリオライティングの過程でコマンドを書けるメリットってなんだ？
  - シナリオライターが「これが出来ると便利」だと思うものはなんだ？
- 再考
  - 条件式、やっぱいらなくね？
    - ワードリストを作って、ゲーム側で選定してもらう感じにできないか？
    - 実装者は、ワードリストに適切なフラグを入力すればよくなるみたいな
  - それまで考えないようにしていたが、やっぱ顔グラフィックはあるべきでは？
    - ツクールみたいに、横に顔グラフィックの差分があれば、気分は盛り上がる
  - そもそもコマンドをシナリオライターに書かせるべきか？
    - 開発者はカスタムIDを設定し、シナリオライターがそこから選ぶのを想定していた
    - だが、複雑な処理こそシナリオライターの責務ではない気がする
  - シナリオライターが必要とするようなメソッド以外は実装を控えるべきでは？
    - シナリオライターが触らない可能性の高いコマンド：
      - 細かい調整が必要なもの
        - どこに何を置くかの責任を取りたくない
        - 書いたところで想像ができない
      - 複雑なトランジションやエフェクト
        - どんな演出がどれだけあるのかを覚えきれない
        - ざっくりとした表現でないと頭がついていけない
      - 条件分岐や計算命令
        - その地点でもう難しそう
        - 変に触ったらバグりそう
        - 選択肢、台詞内疑問演算子とかで十分
      - ファイルを跨ぐラベルジャンプやサブルーチン
        - 普通のラベルジャンプだけで十分だと思っている
      - サウンド調整
        - ぶっちゃけ、どんな音楽を鳴らすか止めるかで十分
      - ボイス関連
        - シナリオライターの仕事ではない
      - タイマーや待機系
        - 文章の表示タイミングは自動でよしなにやってほしい
        - そもそもタイマーの概念がよくわからない
      - フラグ関連
        - そもそもフラグはゲームシステムの責務
        - 進行不能バグの責任を取りたくない
      - レイヤー関連
        - そもそもレイヤーって何？
      - 画面エフェクト関連
        - ざっくり指定したいのに、数値で言われてもわからない
    - シナリオライターが触る可能性の高いコマンド
      - 台詞
      - コメント
      - 誰が喋っているか
      - どんな表情をしているか
      - テキストウィンドウの文章を消す
      - ページ送り
      - 立ち絵の表示、非表示、差し替え
      - 音楽と効果音の再生、停止
      - どうしても効果音的にボイスを入れたい時
      - 選択肢
      - ファイル内ラベルジャンプ
      - フェード
      - 場所（背景）変更
      - 簡単な待機
  - シナリオライターが求めるコマンドとは「ざっくりした指示」では？
- 新仕様再考
  - セリフとコマンドはフォーム単位で完全に分離する
    - 台詞は純粋なテキストエリア、コマンドはフォーム
  - コマンドはカスタムIDを使用するもの以外は基本的に削除
    - 開発者向けオプションとしてカスタムコマンド機能を入れる
  - 条件式、ラベル機能を撤廃し、代わりに実装者が扱いやすい形式にする
    - セリフ＋コマンドのひとかたまりを「トーク」とする
    - トークにはカスタムIDで設定した「フラグ」を紐付け可能
      - フラグ「リナの好感度がMAX」とか
    - 開発者はフラグを適用したインタプリタでトークを再生する
    - コマンドから「別のトークへ飛ぶ」を選択可能にする
  - ワードリストフォームを追加
    - 文章内に`{アイテム}`のようなタグを入れた際に、それがフラグによってどのような文字列に変化するかを辞書化する機能
  - UI構造：
    - トークリスト (アコーディオン)
      - トーク[]
        - 名称
        - フラグID (セレクトボックス)
        - ＋コマンドを追加
          - コマンドパレット
            - コマンドフォーム
        - ＋台詞を追加
          - テキストエリア
        - 次のトーク名 (セレクトボックス)
    - ワードリスト (アコーディオン)
      - ワード[]
        - フラグID (セレクトボックス)
        - 文字列

```ts
type ExportedJSON = {
  scriptId: string
  talks: Talk[]
  words: Word[]
}[]
interface Talk {
  name: string
  flag: string
  commands: Command[] | string[][]
}
interface Command {
  method: string
  arg: Record<string, JSONValue>
}
interface Word {
  flag: string
  content: string
}
```
