import { CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useApi } from './api/useApi'
import { routeNodes } from './constants/routes'
import { Routing } from './pages/Routing'
import { useStore } from './store/useStore'
import { MainTemplate } from './Templates/MainTemplate'
import {
  actorTemplateToFlatNodes,
  customIdTemplateToFlatNodes,
  scenarioTemplateToFlatNodes
} from './utils/helpers'
import { AskProvider } from './utils/useAsk'

const darkmode = createTheme({ palette: { mode: 'dark' } })

const Temp = () => {
  const store = useStore()
  return (
    <MainTemplate>
      <pre>{JSON.stringify(store.nodes, null, 2)}</pre>
    </MainTemplate>
  )
}

const Main = () => {
  const store = useStore()
  const api = useApi()

  useEffect(() => void api.setTemplateToStore(), [])
  useEffect(() => {
    if (!store.templateJSON) return
    store.setNodes([
      ...routeNodes,
      ...actorTemplateToFlatNodes(store.templateJSON.actor.preset),
      ...scenarioTemplateToFlatNodes(store.templateJSON.scenario),
      ...customIdTemplateToFlatNodes(store.templateJSON.command.customId)
    ])
    console.log(store.nodes)
  }, [!!store.templateJSON])

  if (!store.templateJSON) return <CircularProgress />
  return (
    <Routes>
      <Route path="/" element={<Temp />} />
      <Route path="/:nodeId" element={<Routing />} />
    </Routes>
  )
}

const App = () => {
  return (
    <ThemeProvider theme={darkmode}>
      <AskProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </AskProvider>
    </ThemeProvider>
  )
}

export default App
