import { Box, Button } from '@mui/material'
import { useStore } from '@renderer/store/useStore'
import { formatTS } from '@renderer/utils/helpers'
import { useMutableState } from '@renderer/utils/useMutableState'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import React, { useEffect, useRef } from 'react'

self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

export const MonacoTest: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  const store = useStore()
  const [getFormat, setFormat] = useMutableState<() => Promise<void> | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      const precode = store.templateTS
      const editor = monaco.editor.create(editorRef.current, {
        value: `${precode}\nnew Script($ => $.Head({name: "hello"}))`,
        language: 'typescript',
        theme: 'vs-dark',
        automaticLayout: true
      })
      const editorAny = editor as any
      const precodeLength = precode.split('\n').length
      editorAny.setHiddenAreas([{ startLineNumber: 1, endLineNumber: precodeLength }])
      editor.updateOptions({
        lineNumbers: (lineNumber) => `${lineNumber - precodeLength}`
      })
      setFormat(async () => {
        const code = editor.getValue()
        try {
          const formatted = await formatTS(code)
          const model = editor.getModel()
          const currentPosition = editor.getPosition()
          if (model && formatted !== code) {
            editor.executeEdits('', [
              {
                range: model.getFullModelRange(),
                text: formatted
              }
            ])
            if (currentPosition) editor.setPosition(currentPosition)
          }
        } catch (error) {
          console.error(error)
        }
      })

      return () => {
        editor.dispose()
      }
    }
  }, [])

  return (
    <Box>
      <Button
        onClick={async () => {
          if (!getFormat()) return
          await getFormat()?.()
        }}
      >
        フォーマット
      </Button>
      <div ref={editorRef} style={{ width: '1000px', height: '700px' }} />
    </Box>
  )
}
