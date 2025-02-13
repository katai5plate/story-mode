import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MonacoTest } from './pages/MonacoTest'
import { MainTemplate } from './Templates/MainTemplate'

const darkmode = createTheme({ palette: { mode: 'dark' } })

const App = () => (
  <ThemeProvider theme={darkmode}>
    <BrowserRouter>
      <MainTemplate title="title">
        <Routes>
          <Route path="/" element={<MonacoTest />} />
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
