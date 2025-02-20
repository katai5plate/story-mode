import { Button, Divider, Drawer } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Sidebar } from '@renderer/components/Sidebar'
import { SIDEBAR_WIDTH } from '@renderer/constants/system'
import { useStore } from '@renderer/store/useStore'
import { toTitle, unique } from '@renderer/utils/helpers'
import { useAsk } from '@renderer/utils/useAsk'
import { useNode } from '@renderer/utils/useNode'
import { ReactNode, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

export const MainTemplate = (p: { children: ReactNode }) => {
  const location = useLocation()
  const store = useStore()
  const node = useNode()
  const navigate = useNavigate()
  const ask = useAsk()

  useEffect(() => {
    if (!node) navigate('/')
  }, [node])

  const enableBookmark = useMemo(() => {
    if (!node) return
    return (
      node.side === 'actor' ||
      node.side === 'episode' ||
      node.side === 'chapter' ||
      node.side === 'phase' ||
      node.side === 'beat' ||
      node.side === 'script'
    )
  }, [node])
  const isBookmarked = useMemo(
    () => store.nodes.find((n) => n.favorite === node?.uid),
    [store, node]
  )

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
          <Box sx={{ flexGrow: 1 }}>
            <Box>
              <Typography variant="h6" noWrap component="div">
                {toTitle(node)}
                {store.isEditing ? '*' : ''}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" noWrap component="div">
                {location.pathname}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" noWrap component="div" textAlign="right">
              {enableBookmark && (
                <Button
                  onClick={async () => {
                    if (isBookmarked) return
                    const name = await ask.prompt(
                      'ブックマーク登録名を入力してください',
                      toTitle(node)
                    )
                    if (name) {
                      store.addNodes([
                        {
                          parent: 'df-bookmark',
                          uid: unique(
                            'bo',
                            store.nodes.filter((x) => x.side === 'favorite').map((x) => x.uid)
                          ),
                          index: 0,
                          name: name,
                          side: 'favorite',
                          favorite: node.uid
                        }
                      ])
                    }
                  }}
                >
                  {isBookmarked ? '🌟' : '⭐'}
                </Button>
              )}
            </Typography>
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
