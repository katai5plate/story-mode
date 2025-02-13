import { CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router'
import { useApi } from './api/useApi'
import { useStore } from './store/useStore'
import { MainTemplate } from './Templates/MainTemplate'
import { genCharacterTree, genScenarioTree } from './utils/routeNode'

const darkmode = createTheme({ palette: { mode: 'dark' } })

const Temp = () => {
  const q = useParams()
  return <pre>{JSON.stringify(q, null, 2)}</pre>
}

const App = () => {
  const api = useApi()
  const store = useStore()

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
    <ThemeProvider theme={darkmode}>
      <BrowserRouter>
        <MainTemplate title="title">
          <Routes>
            <Route path="/" element={<Temp />} />
            <Route path="/config/:configId/:methodId" element={<Temp />} />
            <Route path="/bookmark/:bookmarkId" element={<Temp />} />
            <Route path="/character" element={<Temp />} />
            <Route path="/character/:characterId" element={<Temp />} />
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
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
