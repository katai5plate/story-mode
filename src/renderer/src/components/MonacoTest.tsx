import React, { useRef, useEffect } from 'react'
import * as monaco from 'monaco-editor'

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

  return <div ref={editorRef} style={{ width: '100%', height: '500px' }} />
}
