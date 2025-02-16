import { CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useApi } from './api/useApi'
import { CharacterEdit } from './pages/CharacterEdit'
import { useStore } from './store/useStore'
import { MainTemplate } from './Templates/MainTemplate'
import { genCharacterTree, genScenarioTree } from './utils/routeNode'
import { AskProvider } from './utils/useAsk'

const darkmode = createTheme({ palette: { mode: 'dark' } })

const Temp = () => {
  const store = useStore()
  return <pre>{JSON.stringify(store.currentRoute, null, 2)}</pre>
}

const Main = () => {
  const store = useStore()
  const api = useApi()

  useEffect(() => void api.setTemplateToStore(), [])
  useEffect(() => {
    if (!store.template) return
    const characters = genCharacterTree(store.template.character.preset)
    const scenario = genScenarioTree(store.template.scenario)
    store.setCharacterRoutes(characters)
    store.setScenarioRoutes(scenario)
    console.log({ characters, scenario })
  }, [store.template])

  if (!store.template) return <CircularProgress />
  return (
    <MainTemplate
      title={
        store.currentRoute ? [store.currentRoute.prefix, store.currentRoute.name].join(' ') : '--'
      }
    >
      <Routes>
        <Route path="/" element={<Temp />} />
        <Route path="/config/:configId/:methodId" element={<Temp />} />
        <Route path="/bookmark/:bookmarkId" element={<Temp />} />
        <Route path="/character" element={<Temp />} />
        <Route path="/character/:characterId" element={<CharacterEdit />} />
        <Route path="/scenario/:episodeId" element={<Temp />} />
        <Route path="/scenario/:episodeId/:chapterId" element={<Temp />} />
        <Route path="/scenario/:episodeId/:chapterId/:phaseId" element={<Temp />} />
        <Route path="/scenario/:episodeId/:chapterId/:phaseId/:beatId" element={<Temp />} />
        <Route
          path="/scenario/:episodeId/:chapterId/:phaseId/:beatId/:scriptId"
          element={<Temp />}
        />
      </Routes>
    </MainTemplate>
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
