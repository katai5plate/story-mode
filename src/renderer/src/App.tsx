import { CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router'
import { useApi } from './api/useApi'
import { routeNodes } from './constants/routes'
import { useStore } from './store/useStore'
import { MainTemplate } from './Templates/MainTemplate'
import { actorTemplateToFlatNodes, scenarioTemplateToFlatNodes } from './utils/helpers'
import { AskProvider } from './utils/useAsk'
import { Routing } from './pages/Routing'

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
    if (!store.template) return
    store.setNodes([
      ...routeNodes,
      ...actorTemplateToFlatNodes(store.template.actor.preset),
      ...scenarioTemplateToFlatNodes(store.template.scenario)
    ])
    console.log(store.nodes)
  }, [!!store.template])

  if (!store.template) return <CircularProgress />
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
