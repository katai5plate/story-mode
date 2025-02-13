import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes, useParams } from 'react-router'
import { MonacoTest } from './pages/MonacoTest'
import { MainTemplate } from './Templates/MainTemplate'

const darkmode = createTheme({ palette: { mode: 'dark' } })

const Temp = () => {
  const q = useParams()
  return <pre>{JSON.stringify(q, null, 2)}</pre>
}

const App = () => (
  <ThemeProvider theme={darkmode}>
    <BrowserRouter>
      <MainTemplate title="title">
        <Routes>
          <Route path="/" element={<MonacoTest />} />
          <Route path="/config/:configId/:methodId" element={<Temp />} />
          <Route path="/bookmark/:bookmarkId" element={<Temp />} />
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

export default App
