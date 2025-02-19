import React, { useRef, useEffect } from 'react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { Box, Container } from '@mui/material'
import MonacoEditor from 'react-monaco-editor'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

export const MonacoTest: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: `console.log("Hello, Monaco!");`,
        language: 'typescript',
        theme: 'vs-dark',
        automaticLayout: true
      })

      return () => {
        editor.dispose()
      }
    }
  }, [])

  return (
    <MonacoEditor
      width="1000"
      height="700"
      language="javascript"
      theme="vs-dark"
      value="new Script(($) => $.head());"
      // options={options}
      // onChange={::this.onChange}
      // editorDidMount={::this.editorDidMount}
    />
  )
}
