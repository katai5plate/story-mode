import { StreamLanguage } from '@codemirror/language'
import { Completion, CompletionContext } from '@codemirror/autocomplete'
import { linter, Diagnostic } from '@codemirror/lint'
import { useCodeMirror } from '@uiw/react-codemirror'
import { autocompletion } from '@codemirror/autocomplete'
import { keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { searchKeymap } from '@codemirror/search'
import { lintKeymap } from '@codemirror/lint'

// ========================
// 1. 命令/引数定義
// ========================

type CommandArgType = 'string' | 'number' | 'bool' | 'vector' | 'json'

type CommandDefinition = {
  args: Record<string, CommandArgType>
}

type CommandNamespace = Record<string, CommandDefinition>

const commands: Record<string, CommandNamespace> = {
  フロー: {
    変数演算: { args: { 左辺ローカル変数: 'string', 演算子: 'string', 右辺値: 'number' } },
    条件分岐: {
      args: { 左辺ローカル変数: 'string', 演算子: 'string', 右辺値: 'number', ラベル: 'string' }
    },
    飛ぶ: { args: { ラベル: 'string' } }
  },
  メッセージ: {
    設定: { args: { アクター: 'string', 表情差分: 'string', ボイスID: 'string' } },
    選択肢: { args: { ケース1: 'string', ケース2: 'string', ケース3: 'string' } }
  }
}

// ========================
// 2. シンタックスハイライト設定
// ========================

export const scriptLanguage = StreamLanguage.define({
  startState: () => ({}),
  token: (stream) => {
    if (stream.match(/^\/\/.*/)) return 'comment'
    if (stream.match(/^#\w+/)) return 'meta'
    if (stream.match(/^@/)) {
      stream.eatWhile(/[a-zA-Z0-9ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠ー_.]/)
      return 'keyword'
    }
    if (stream.match(/\w+=/)) return 'propertyName'
    if (stream.match(/"(?:[^"\\]|\\.)*"/)) return 'string'
    if (stream.match(/\b\d+\b/)) return 'number'
    if (stream.match(/\b(true|false)\b/)) return 'bool'
    if (stream.match(/\((?:\d+,?\s*){2,3}\)/)) return 'bracket'
    if (stream.match(/{[^}]+}/)) return 'literal' // JSON
    stream.next()
    return null
  }
})

// ========================
// 3. 補完ロジック
// ========================

/**
 * 「@」単体で打ち始めていて、まだ「.」や「:」がない場合に
 * 名前空間を候補として返す
 */
function getNamespaceCompletions(prefix: string): Completion[] {
  return Object.keys(commands)
    .filter((ns) => ns.startsWith(prefix)) // prefixがあればフィルタリング
    .map((ns) => ({ label: ns, type: 'keyword' }))
}

/**
 * 「@名前空間.」と打っている場合に、
 * その名前空間の命令を候補として返す
 */
function getCommandCompletions(namespace: string, partialCmd: string): Completion[] {
  const commandNamespace = commands[namespace]
  if (!commandNamespace) return []
  return Object.keys(commandNamespace)
    .filter((cmd) => cmd.startsWith(partialCmd))
    .map((cmd) => ({ label: cmd, type: 'keyword' }))
}

/**
 * 「@名前空間.命令:」と打っている場合に、
 * その命令の引数を候補として返す
 */
function getArgCompletions(namespace: string, commandName: string): Completion[] {
  console.log(namespace, commandName, commands)
  const commandDef = commands[namespace]?.[commandName]
  if (!commandDef) return []
  return Object.keys(commandDef.args).map((arg) => ({
    label: arg,
    type: 'property'
  }))
}

/**
 * 実際の補完エントリーポイント
 */
const scriptCompletion = (context: CompletionContext) => {
  const word = context.matchBefore(/\w*/)
  if (!word) return null

  const line = context.state.doc.lineAt(context.pos).text

  // 1) 「@」～ ：まだ「.」「:」が無ければ「名前空間」を候補に
  if (line.startsWith('@') && !line.includes('.') && !line.includes(':')) {
    const prefix = line.slice(1)
    return {
      from: word.from,
      options: getNamespaceCompletions(prefix)
    }
  }

  // 2) 「@名前空間.部分的コマンド」：まだ「:」がなければ「コマンド」を候補に
  const namespaceAndCmd = line.match(/^@([^.:]+)\.?([^:]*)/)
  if (namespaceAndCmd) {
    const [, namespace, partialCmd] = namespaceAndCmd
    if (!line.includes(':')) {
      return {
        from: word.from,
        options: getCommandCompletions(namespace, partialCmd)
      }
    }
  }

  console.log(333, line)

  // 3) 「@名前空間.コマンド:」：引数を候補に
  const cmdMatch = line.match(/^@(.+)\.(.+):\s/)
  console.log(11111111, cmdMatch)
  if (cmdMatch) {
    const [, namespace, commandName] = cmdMatch
    return {
      from: word.from,
      options: getArgCompletions(namespace, commandName)
    }
  }

  return null
}

// ========================
// 4. Lint (文法チェック)
// ========================

const typeValidators: Record<CommandArgType, (value: string) => boolean> = {
  string: (v: string) => /^".*"$/.test(v),
  number: (v: string) => /^\d+$/.test(v),
  bool: (v: string) => /^(true|false)$/.test(v),
  vector: (v: string) => /^\((\d+,?\s*){1,2}\d\)$/.test(v),
  json: (v: string) => {
    try {
      JSON.parse(v)
      return true
    } catch {
      return false
    }
  }
}

/**
 * コード全体を行ごとにチェックし、引数の型や未定義キーなどを診断する
 */
export const simpleLinter = linter((view) => {
  const diagnostics: Diagnostic[] = []

  // 全行を走査
  for (let i = 0; i < view.state.doc.lines; i++) {
    const lineText = view.state.doc.line(i + 1).text
    const commandMatch = lineText.match(/^@([\w.]+):?(.*)/)
    if (!commandMatch) continue

    const [, fullCommand, argsStr] = commandMatch
    const [namespace, commandName] = fullCommand.split('.')
    const commandDef = commands[namespace]?.[commandName]
    if (!commandDef) continue

    // 引数形式:  key="..." / key=number / key=true/false / key=(...) / key={...}
    const argPattern = /(\w+)=("[^"]*"|\d+|true|false|\([^)]+\)|{[^}]+})/g
    const matchedArgs = argsStr.match(argPattern) || []

    matchedArgs.forEach((argString) => {
      // argString は "key=値" なので、key と 値 を分離する
      const [key, value] = argString.split('=')
      const expectedType = commandDef.args[key]
      const fromIndex = lineText.indexOf(value)
      const toIndex = fromIndex + value.length

      // 未定義の引数
      if (!expectedType) {
        const keyIndex = lineText.indexOf(key)
        diagnostics.push({
          from: keyIndex,
          to: keyIndex + key.length,
          message: `未定義の引数: ${key}`,
          severity: 'warning'
        })
        return
      }

      // 型チェック
      const validator = typeValidators[expectedType]
      if (!validator(value)) {
        diagnostics.push({
          from: fromIndex,
          to: toIndex,
          message: `${key} は ${expectedType} 型が必要です`,
          severity: 'error'
        })
      }
    })
  }

  return diagnostics
})

// ========================
// 5. エディタ本体
// ========================

const editorExtensions = [
  keymap.of([...defaultKeymap, ...searchKeymap, ...lintKeymap]),
  scriptLanguage,
  autocompletion({ override: [scriptCompletion] }),
  simpleLinter
]

export const ScriptEditor: React.FC = () => {
  const { setContainer } = useCodeMirror({
    extensions: editorExtensions,
    theme: 'dark'
  })

  return (
    <div>
      <h2>スクリプトエディタ</h2>
      <div ref={setContainer} style={{ height: '500px', border: '1px solid #ddd' }} />
    </div>
  )
}
