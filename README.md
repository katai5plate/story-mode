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
