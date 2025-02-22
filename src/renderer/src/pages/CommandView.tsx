import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { DisableInput } from '@renderer/components/DisableInput'
import { Group } from '@renderer/components/Group'
import { ListForm } from '@renderer/components/ListForm'
import { TextInput } from '@renderer/components/TextInput'
import { useStore } from '@renderer/store/useStore'
import { CommandForm } from '@renderer/types/CommandForm'
import { CustomIdForm, initCustomIdForm, initCustomIdOption } from '@renderer/types/CustomIdForm'
import { initPlotForm, initScenarioForm, ScenarioForm } from '@renderer/types/ScenarioForm'
import { SMNode } from '@renderer/types/SMNode'
import { CommandArg } from '@renderer/types/TemplateJSON'
import { copy, detectEmptyItem, equal, toTextArea, toTitle } from '@renderer/utils/helpers'
import { useAsk } from '@renderer/utils/useAsk'
import { useEditForm } from '@renderer/utils/useEditForm'
import { useNode } from '@renderer/utils/useNode'
import { useSave } from '@renderer/utils/useSave'
import { useCallback, useEffect, useMemo } from 'react'
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
    (ca: CommandArg['type']) =>
      ca
        .map(
          (c) =>
            store.nodes.find((n) => c.includes(`id.${n.customId?.id}`))?.name || typeBook[c] || c
        )
        .join(' | '),
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
                  <Box component="strong">分岐</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {node.command.req.map((x, key) => (
                <TableRow key={key}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{typeView(x.type)}</TableCell>
                  <TableCell>{x.result || 'なし'}</TableCell>
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
                  <Box component="strong">対応型</Box>
                </TableCell>
                <TableCell>
                  <Box component="strong">分岐</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {node.command.opt.map((x, key) => (
                <TableRow key={key}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{typeView(x.type)}</TableCell>
                  <TableCell>{x.result || 'なし'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          'なし'
        )}
      </Group>
    </Box>
  )
}
