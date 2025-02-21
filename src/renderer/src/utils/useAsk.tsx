import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Spacer } from '@renderer/components/Spacer'
import { TextInput, TextInputProps } from '@renderer/components/TextInput'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type AskContextType = {
  alert: (message: string, title?: string, buttonLabel?: string) => Promise<void>
  confirm: (
    message: string,
    title?: string,
    buttonLabels?: { yes: string; no: string }
  ) => Promise<boolean>
  prompt: (
    message: string,
    defaultValue?: string,
    title?: string,
    buttonLabels?: { yes: string; no: string },
    props?: Partial<TextInputProps>
  ) => Promise<string | null>
  popup: (message: string, title?: string) => Promise<string | null>
}

const AskContext = createContext<AskContextType | null>(null)

export const AskProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<keyof AskContextType>('alert')
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [input, setInput] = useState('')
  const [labels, setLabels] = useState({ yes: 'OK', no: 'キャンセル' })
  const [resolveFn, setResolveFn] = useState<(value: any) => void>()
  const [props, setProps] = useState<Partial<TextInputProps>>({})
  const [alertLabel, setAlertLabel] = useState('OK')
  const ask = {
    alert: (msg: string, title?: string, buttonLabel = 'OK') =>
      new Promise<void>((resolve) => {
        setTitle(title)
        setMessage(msg)
        setAlertLabel(buttonLabel)
        setType('alert')
        setResolveFn(() => resolve)
        setOpen(true)
      }),
    confirm: (msg: string, title?: string, buttonLabels = { yes: 'OK', no: 'キャンセル' }) =>
      new Promise<boolean>((resolve) => {
        setTitle(title)
        setMessage(msg)
        setLabels(buttonLabels)
        setType('confirm')
        setResolveFn(() => resolve)
        setOpen(true)
      }),
    prompt: (
      msg: string,
      defaultValue = '',
      title?: string,
      buttonLabels = { yes: 'OK', no: 'キャンセル' },
      props?: Partial<TextInputProps>
    ) =>
      new Promise<string | null>((resolve) => {
        setTitle(title)
        setMessage(msg)
        setInput(defaultValue)
        setLabels(buttonLabels)
        setType('prompt')
        setResolveFn(() => resolve)
        setOpen(true)
        setProps(props || {})
      }),
    popup: (msg: string, title?: string) =>
      new Promise<string | null>((resolve) => {
        setTitle(title)
        setMessage(msg)
        setType('popup')
        setResolveFn(() => resolve)
        setOpen(true)
        setProps(props || {})
        setTimeout(() => {
          onClose()
        }, 1000)
      })
  }
  const onClose = (result?: any) => {
    setOpen(false)
    resolveFn?.(result)
  }
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (type === 'popup') return
      if (e.key === 'Enter') {
        e.preventDefault()
        if (type === 'alert') onClose()
        if (type === 'confirm') onClose(true)
        if (type === 'prompt') onClose(input)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        if (type === 'confirm') onClose(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, type, input])

  return (
    <AskContext.Provider value={ask}>
      {children}
      <Dialog open={open} onClose={() => onClose(type === 'confirm' ? false : null)}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <p>{message}</p>
          {type === 'prompt' && (
            <>
              <Spacer />
              <TextInput
                label="入力"
                value={input}
                onChange={(text) => setInput(text)}
                focus
                {...props}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {type === 'alert' && <Button onClick={() => onClose()}>{alertLabel}</Button>}
          {type === 'confirm' && (
            <>
              <Button variant="outlined" color="secondary" onClick={() => onClose(false)}>
                {labels.no}
              </Button>
              <Button variant="outlined" color="primary" onClick={() => onClose(true)}>
                {labels.yes}
              </Button>
            </>
          )}
          {type === 'prompt' && (
            <>
              <Button variant="outlined" color="secondary" onClick={() => onClose(null)}>
                {labels.no}
              </Button>
              <Button variant="outlined" color="primary" onClick={() => onClose(input)}>
                {labels.yes}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </AskContext.Provider>
  )
}

export const useAsk = () => {
  const context = useContext(AskContext)
  if (!context) throw new Error('useAsk は AskProvider の中でのみ使用可能')
  return context
}
