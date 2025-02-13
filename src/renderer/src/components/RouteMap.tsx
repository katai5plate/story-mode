import { Button } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router'

export type RouteNode = {
  type: string
  path: string
  name: string
  icon?: ReactNode
  isOpen?: boolean
  prefix?: string
  isDir?: boolean
  isButton?: boolean
  children?: RouteNode[]
  _index?: number
}

const RouteItem: React.FC<{
  node: RouteNode
  depth: number
  path: (string | number)[]
}> = ({ node, depth, path }) => {
  const defaultOpen = node.isOpen ?? false
  const [open, setOpen] = useState(defaultOpen)
  const hasChildren = !!node.children?.length
  const currentPath = [...path, node.path]
  const navigate = useNavigate()
  return (
    <>
      <ListItemButton
        sx={{ pt: 0, pb: 0 }}
        onClick={() =>
          hasChildren
            ? setOpen(!open)
            : node.isButton
              ? alert(currentPath)
              : navigate(`/${currentPath.join('/')}`)
        }
      >
        <div style={{ color: 'transparent' }}>{'..'.repeat(depth)}</div>
        {node.icon ? node.icon : hasChildren ? (open ? '📂' : '📁') : '📄'}
        <div style={{ color: 'transparent' }}>{'.'}</div>
        {node.prefix ?? ''}
        <div style={{ color: 'transparent' }}>{'.'}</div>
        <ListItemText primary={node.name} />
        {hasChildren && !node.isDir && (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/${currentPath.join('/')}`)
            }}
          >
            ⚙️
          </Button>
        )}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children!.map((child, index) => (
              <RouteItem key={index} node={child} depth={depth + 1} path={currentPath} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export const RouteMap: React.FC<{ content: RouteNode[] }> = ({ content }) => (
  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {content.map((node) => (
      <RouteItem key={node.name} node={node} depth={0} path={[]} />
    ))}
  </List>
)
