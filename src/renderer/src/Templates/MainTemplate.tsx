import { Divider, Drawer } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Sidebar } from '@renderer/components/Sidebar'
import { SIDEBAR_WIDTH } from '@renderer/constants/system'
import { useStore } from '@renderer/store/useStore'
import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

export const MainTemplate = (p: { children: ReactNode }) => {
  const location = useLocation()
  const store = useStore()
  const params = useParams()
  const node = store.getNode(params)
  const navigate = useNavigate()

  useEffect(() => {
    if (!node) navigate('/')
  }, [node])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: SIDEBAR_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: SIDEBAR_WIDTH,
              overflowY: 'scroll'
            }
          }}
          open
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              STORY-MODE
            </Typography>
          </Toolbar>
          <Divider />
          <Sidebar nodes={store.nodes} />
        </Drawer>
      </Box>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          ml: { sm: `${SIDEBAR_WIDTH}px` }
        }}
      >
        <Toolbar>
          <Box>
            <Box>
              <Typography variant="h6" noWrap component="div">
                {[node?.prefix, node?.name].filter(Boolean).join(' ')}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" noWrap component="div">
                {location.pathname}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` }
        }}
      >
        <Toolbar />
        {p.children}
      </Box>
    </Box>
  )
}
