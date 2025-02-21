import { Box, Button, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { DisableInput } from '@renderer/components/DisableInput'
import { Group } from '@renderer/components/Group'
import { ListForm } from '@renderer/components/ListForm'
import { TextInput } from '@renderer/components/TextInput'
import { useStore } from '@renderer/store/useStore'
import { initPlotForm, initScenarioForm, ScenarioForm } from '@renderer/types/ScenarioForm'
import { copy, detectEmptyItem, equal, toTextArea, toTitle } from '@renderer/utils/helpers'
import { useAsk } from '@renderer/utils/useAsk'
import { useEditForm } from '@renderer/utils/useEditForm'
import { useNode } from '@renderer/utils/useNode'
import { useSave } from '@renderer/utils/useSave'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'

export const ScenarioEdit = () => {
  const store = useStore()
  const node = useNode()
  const { form, getForm, setAllField, updateForm } = useEditForm<ScenarioForm>(
    node.scenario || initScenarioForm
  )
  const save = useSave()
  const ask = useAsk()
  const location = useLocation()

  useEffect(() => {
    if (!store.nodes.length || !node.scenario) return
    setAllField(node.scenario)
  }, [location.pathname])

  useEffect(() => {
    save(() => {
      store.updateNode(node.uid, (p) => ({ ...p, scenario: getForm() }))
      ask.popup('保存しました！', node.name)
    })
  }, [save, form])

  useEffect(() => {
    if (!store.isEditing && !equal(node.scenario, form)) {
      store.setEditing(true)
    } else if (store.isEditing) {
      store.setEditing(false)
    }
  }, [node, form])

  const parents = useMemo(() => {
    if (!node) return
    return store.getParentNodes(node.uid).filter((n) => n.scenario)
  }, [node])

  return (
    <Box style={{ width: '70vw' }}>
      <DisableInput
        label="名前"
        value={toTitle(node, true)}
        onChange={(alias) => store.updateNode(node.uid, () => ({ alias }))}
        node={node}
        ask={ask}
      />
      <TextInput
        label="概要"
        value={form.summary}
        onChange={(text) => updateForm((r) => r.summary, text)}
      />
      <Group float accord accordFill title="※ 親要素の確認事項">
        <Table>
          <TableBody>
            {[...parents, { ...node, scenario: form }].map((n, key) => (
              <TableRow key={key}>
                <TableCell padding="none">
                  <Box component="strong">{toTitle(n)}</Box>
                </TableCell>
                <TableCell padding="none" sx={{ fontSize: '0.8rem' }}>
                  {n.scenario.checklist.map((rule, key2) => (
                    <Box component="p" key={key2}>
                      {rule}
                    </Box>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ verticalAlign: 'bottom' }}
                    variant="outlined"
                    fullWidth
                    onClick={() => copy([`${toTitle(n)}：`, ...n.scenario.checklist].join('\n'))}
                  >
                    クリップボードにコピー
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Group>
      <TextInput
        label="確認事項"
        textarea
        value={form.checklist}
        onChange={(text) => updateForm((r) => r.checklist, toTextArea(text))}
      />
      <TextInput
        label="詳細"
        textarea
        value={form.detail}
        onChange={(text) => updateForm((r) => r.detail, toTextArea(text))}
      />
      <ListForm
        accord
        itemAccord
        title="プロット"
        itemTitle={(item) => item.name || null}
        initItem={initPlotForm}
        onAddItem={(name) => ({ name })}
        updateForm={updateForm}
        list={form.plots}
        selector={(r: typeof form) => r.plots}
        accordItemAutoClose={(item) => detectEmptyItem(item, 'name')}
        render={(item, i) => (
          <>
            <TextInput
              label="プロット名"
              value={item.name}
              onChange={(text) => updateForm((r) => r.plots[i].name, text)}
            />
            <TextInput
              label="内容"
              textarea
              value={item.content}
              onChange={(text) => updateForm((r) => r.plots[i].content, toTextArea(text))}
            />
          </>
        )}
      />
      <Group accord accordEmpty={() => 'NOEMPTY'} title="デバッグ情報">
        <Box component="pre">{JSON.stringify({ form, parents }, null, 2)}</Box>
      </Group>
    </Box>
  )
}
