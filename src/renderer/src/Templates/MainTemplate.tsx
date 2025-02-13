import { Divider, Drawer } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useApi } from '@renderer/api/useApi'
import { RouteMap, RouteNode } from '@renderer/components/RouteMap'
import { ROUTES } from '@renderer/constants/routes'
import { TemplateJSON } from '@renderer/types/TemplateJSON'
import { ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

interface SidebarProps {
  width: number
  tree?: RouteNode[]
}

const Sidebar = (p: SidebarProps) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: p.width }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: p.width,
            overflowY: 'scroll',
            scrollbarColor: 'rgba(255,255,255,0.5) transparent'
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
        <RouteMap content={p.tree} />
      </Drawer>
    </Box>
  )
}

const genTree = (template: TemplateJSON['scenario']): RouteNode[] => {
  const orders = [
    { type: 'episode', icon: '📺', prefix: 'EP' },
    { type: 'chapter', icon: '💿', prefix: 'CH' },
    { type: 'phase', icon: '🎞️', prefix: 'PH' },
    { type: 'beat', icon: '🎥', prefix: 'BE' },
    { type: 'script', icon: '📝', prefix: 'SC' }
  ]
  const buildNodes = (level: number): RouteNode[] => {
    const order = orders[level]
    if (!order) return []
    const { type } = order
    if (!type || !template[type]) return []
    return template[type].map((entry) => {
      const node: RouteNode = { ...order, ...entry }
      const children = buildNodes(level + 1)
      if (children.length > 0) node.children = children
      return node
    })
  }
  return buildNodes(0)
}

const SIDEBAR_CONTENT: SidebarProps = {
  width: 300,
  tree: ROUTES
}
export const MainTemplate = (p: { title: string; children: ReactNode }) => {
  const location = useLocation()
  const api = useApi()
  const [scenario, setScenario] = useState<RouteNode[]>([])
  useEffect(() => {
    api.getTemplate().then((x) => {
      const tree = genTree(x.scenario as any)
      setScenario(tree)
      console.log(tree)
    })
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        width={SIDEBAR_CONTENT.width}
        tree={[
          ...SIDEBAR_CONTENT.tree,
          {
            type: 'folder',
            path: 'scenario',
            name: 'シナリオ',
            isDir: true,
            children: scenario
          }
        ]}
      />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${SIDEBAR_CONTENT.width}px)` },
          ml: { sm: `${SIDEBAR_CONTENT.width}px` }
        }}
      >
        <Toolbar>
          <Box>
            <Box>
              <Typography variant="h6" noWrap component="div">
                {p.title}
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${SIDEBAR_CONTENT.width}px)` } }}
      >
        <Toolbar />
        {p.children}
      </Box>
    </Box>
  )
}
