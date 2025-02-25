import { Button, Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { Indent } from './Spacer'
import { useNavigate } from 'react-router'
import { useStore } from '@renderer/store/useStore'
import { useAsk } from '@renderer/utils/useAsk'
import { useNode } from '@renderer/utils/useNode'
import { SMNode } from '@renderer/types/SMNode'

export const Sidebar = (p: { nodes: SMNode[] }) => {
  const store = useStore()
  const navigate = useNavigate()
  const currentNode = useNode()
  const ask = useAsk()

  // ルートノードだけを抽出
  const rootNodes = p.nodes.filter((n) => n.parent === null).sort((a, b) => a.index - b.index)

  return (
    <List disablePadding>
      {rootNodes.map((node) => (
        <SidebarItem
          key={node.uid}
          node={node}
          allNodes={p.nodes}
          depth={0}
          onSelectNode={async (uid) => {
            if (currentNode?.uid === uid) return
            if (
              store.isEditing &&
              !(await ask.confirm(
                '編集中に別のページに移動すると編集中のデータが失われます',
                undefined,
                { yes: '消えてもOK', no: 'キャンセル' }
              ))
            )
              return
            store.setEditing(false)
            navigate(`/${uid}`)
          }}
        />
      ))}
    </List>
  )
}

const SidebarItem = (p: {
  node: SMNode
  allNodes: SMNode[]
  depth: number
  onSelectNode?: (uid: string) => void
}) => {
  const store = useStore()
  const children = p.allNodes
    .filter((n) => n.parent === p.node.uid)
    .sort((a, b) => a.index - b.index)
  const isDirLike = ['dir', 'condir', 'episode', 'chapter', 'phase', 'beat'].includes(p.node.side)
  const hasChildren = children.length > 0
  const isOpen = !!store.openNodes[p.node.uid]
  const defaultIcon: string | undefined =
    (
      {
        favorite: '⭐',
        actor: '🎭',
        episode: '📺',
        chapter: '💿',
        phase: '🎞️',
        beat: '🎥',
        script: '📝',
        customId: '🗃️',
        command: '💻'
      } as Record<SMNode['side'], string>
    )[p.node.side] ??
    (isDirLike && hasChildren
      ? isOpen
        ? '📂'
        : '📁'
      : p.node.side === 'call'
        ? undefined
        : '🗀') ??
    undefined

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} disablePadding>
      <ListItemButton
        sx={{ pt: 0, pb: 0 }}
        onClick={() => {
          if (isDirLike && hasChildren) store.toggleOpen(p.node.uid)
          else p.onSelectNode?.(p.node.uid)
        }}
      >
        <Indent space={2 * p.depth} />
        {defaultIcon && (
          <>
            {defaultIcon}
            <Indent space={1} />
          </>
        )}
        {p.node.prefix && (
          <>
            {p.node.prefix}
            <Indent space={1} />
          </>
        )}
        <ListItemText primary={p.node.alias ?? p.node.name} />
        {isDirLike && p.node.side !== 'dir' && (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              p.onSelectNode?.(p.node.uid)
            }}
          >
            ⚙️
          </Button>
        )}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child) => (
              <SidebarItem
                key={child.uid}
                node={child}
                allNodes={p.allNodes}
                depth={p.depth + 1}
                onSelectNode={p.onSelectNode}
              />
            ))}
          </List>
        </Collapse>
      )}
    </List>
  )
}
