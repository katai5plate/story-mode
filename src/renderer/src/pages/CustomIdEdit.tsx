import { Box, Button, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { DisableInput } from '@renderer/components/DisableInput'
import { Group } from '@renderer/components/Group'
import { ListForm } from '@renderer/components/ListForm'
import { TextInput } from '@renderer/components/TextInput'
import { useStore } from '@renderer/store/useStore'
import { CustomIdForm, initCustomIdForm, initCustomIdOption } from '@renderer/types/CustomIdForm'
import { initPlotForm, initScenarioForm, ScenarioForm } from '@renderer/types/ScenarioForm'
import { SMNode } from '@renderer/types/SMNode'
import { copy, detectEmptyItem, equal, toTextArea, toTitle } from '@renderer/utils/helpers'
import { useAsk } from '@renderer/utils/useAsk'
import { useEditForm } from '@renderer/utils/useEditForm'
import { useNode } from '@renderer/utils/useNode'
import { useSave } from '@renderer/utils/useSave'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'

export const CustomIdEdit = () => {
  const store = useStore()
  const node = useNode()
  const { form, getForm, setAllField, updateForm } = useEditForm<CustomIdForm>(
    node.customId || initCustomIdForm
  )
  const save = useSave()
  const ask = useAsk()
  const location = useLocation()

  useEffect(() => {
    if (!store.nodes.length || !node.customId) return
    setAllField(node.customId)
  }, [location.pathname])

  useEffect(() => {
    save(() => {
      store.updateNode(node.uid, (p) => ({ ...p, customId: getForm() }))
      ask.popup('保存しました！', node.name)
    })
  }, [save, form])

  useEffect(() => {
    if (!store.isEditing && !equal(node.customId, form)) {
      store.setEditing(true)
    } else if (store.isEditing) {
      store.setEditing(false)
    }
  }, [node, form])

  return (
    <Box style={{ width: '70vw' }}>
      <TextInput label="ID" disable value={form.id} />
      <DisableInput
        label="名前"
        value={toTitle(node, true)}
        onChange={(alias) => store.updateNode(node.uid, () => ({ alias }))}
        node={node}
        ask={ask}
      />
      <ListForm
        accord
        itemAccord
        title="一覧"
        itemTitle={(item) => item.name || null}
        initItem={initCustomIdOption}
        onAddItem={(name) => ({ name })}
        updateForm={updateForm}
        list={form.options}
        selector={(r: typeof form) => r.options}
        accordItemAutoClose={(item) => detectEmptyItem(item, 'name')}
        render={(item, i) => (
          <>
            <TextInput
              label="表記"
              value={item.name}
              onChange={(text) => updateForm((r) => r.options[i].name, text)}
            />
            <DisableInput
              label="値（JSON）"
              value={JSON.stringify(item.value)}
              onChange={(value) => {
                let res: any = null
                try {
                  res = JSON.parse(value)
                } catch (error) {
                  return `パースエラー: ${error}`
                }
                store.updateNode(node.uid, () => ({ value: res }) as Partial<SMNode>)
              }}
              node={node}
              ask={ask}
            />
          </>
        )}
      />
      <Group accord accordEmpty={() => 'NOEMPTY'} title="デバッグ情報">
        <Box component="pre">{JSON.stringify({ form }, null, 2)}</Box>
      </Group>
    </Box>
  )
}
