import React from 'react'
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material'

export const MUITest: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Electron + React + MUI + Monaco</Typography>
        </Toolbar>
      </AppBar>
    </Container>
  )
}
