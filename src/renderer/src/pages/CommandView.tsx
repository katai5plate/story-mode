import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Group } from '@renderer/components/Group'
import { useStore } from '@renderer/store/useStore'
import { CommandArgRequire } from '@renderer/types/TemplateJSON'
import { useNode } from '@renderer/utils/useNode'
import { useCallback } from 'react'
import { useLocation } from 'react-router'

export const CommandView = () => {
  const store = useStore()
  const node = useNode()
  const location = useLocation()

  const typeBook = {
    text: 'テキスト',
    textarea: 'テキストエリア',
    vec: '座標',
    num: '数値',
    json: 'JSON 文字列',
    value: 'JSON 値',
    '$.actor': 'アクター'
  }

  const typeView = useCallback(
    (ca: CommandArgRequire['type']) =>
      ca
        .map((c) => {
          const cid = store.nodes.find((n) => c.includes(`id.${n.customId?.id}`))?.name
          const tp = typeBook[c]
          const customId = cid && `${cid}ID`
          const typePage = tp && `${tp}型`
          return customId || typePage || c
        })
        .join(' | ') || '',
    [store.nodes]
  )

  if (!node.command) return <></>
  return (
    <Box style={{ width: '50vw' }}>
      <Group title="基本情報">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Box component="strong">コマンド名</Box>
              </TableCell>
              <TableCell>{node.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box component="strong">API</Box>
              </TableCell>
              <TableCell>{node.command.id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Group>
      <Group title="引数（必須）">
        {node.command.req.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box component="strong">引数名</Box>
                </TableCell>
                <TableCell>
                  <Box component="strong">対応型</Box>
                </TableCell>
                <TableCell>
                  <Box component="strong">ラベル</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {node.command.req.map((x, key) => (
                <TableRow key={key}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{typeView(x.type)}</TableCell>
                  <TableCell>{x.goto || 'なし'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          'なし'
        )}
      </Group>
      <Group title="引数（任意）">
        {node.command.opt.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box component="strong">引数名</Box>
                </TableCell>
                <TableCell>
                  <Box component="strong">パラメータ</Box>
                </TableCell>
                <TableCell>
                  <Box component="strong">対応型</Box>
                </TableCell>
                <TableCell>
                  <Box component="strong">ラベル</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {node.command.opt.map((x, key) => (
                <TableRow key={key}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.id}</TableCell>
                  <TableCell>{typeView(x.type)}</TableCell>
                  <TableCell>{x.goto || 'なし'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          'なし'
        )}
      </Group>
      <Group accord accordEmpty={() => 'NOEMPTY'} title="デバッグ情報">
        <Box component="pre">{JSON.stringify({ node }, null, 2)}</Box>
      </Group>
    </Box>
  )
}
