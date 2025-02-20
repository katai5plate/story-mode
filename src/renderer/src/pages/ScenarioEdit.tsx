import {
  Alert,
  Box,
  Button,
  Grid2,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'
import { Accord } from '@renderer/components/Accord'
import { Group } from '@renderer/components/Group'
import { ListForm } from '@renderer/components/ListForm'
import { SelectBox } from '@renderer/components/SelectBox'
import { Spacer } from '@renderer/components/Spacer'
import { TextInput } from '@renderer/components/TextInput'
import { useStore } from '@renderer/store/useStore'
import { initPlotForm, initScenarioForm, ScenarioForm } from '@renderer/types/ScenarioForm'
import { ActorForm, CharacterHistory } from '@renderer/types/TemplateJSON'
import {
  appendNote,
  copy,
  detectEmptyItem,
  detectEmptyItems,
  textareaIsEmpty,
  toCombo,
  toTextArea,
  toTitle
} from '@renderer/utils/helpers'
import { useAsk } from '@renderer/utils/useAsk'
import { useEditForm } from '@renderer/utils/useEditForm'
import { useNode } from '@renderer/utils/useNode'
import { useSave } from '@renderer/utils/useSave'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'

// const LIFE: Omit<ScenarioForm['experience']['life'][0], 'uid'> = {
//   name: '',
//   date: '',
//   daily: [''],
//   skills: [''],
//   socialRelationships: [''],
//   memo: ['']
// }
// const HISTORY: Omit<ActorForm['experience']['histories'][0], 'uid'> = {
//   name: '',
//   appearance: [''],
//   personality: {
//     ref: {
//       categoryId: '',
//       typeId: ''
//     },
//     basic: [''],
//     different: [''],
//     reason: ['']
//   },
//   weakness: {
//     combox: '',
//     content: ['']
//   },
//   desire: {
//     detail: [''],
//     motivation: {
//       combox: '',
//       content: ['']
//     },
//     sensitivity: {
//       combox: '',
//       content: ['']
//     },
//     likesAndDislikes: ['']
//   },
//   memo: ['']
// }
// const DIALOG: Omit<ActorForm['experience']['dialogExamples'][0], 'uid'> = {
//   question: '',
//   answer: [''],
//   hint: ['']
// }

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
    if (!store.isEditing && JSON.stringify(node.scenario) !== JSON.stringify(form)) {
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
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <TextInput label="名称" disable value={node.alias || node.name} />
        </Grid2>
        <Grid2 size="auto">
          <Button
            variant="outlined"
            onClick={async () => {
              const alias = await ask.prompt(
                '名前を決めてください。',
                node.alias || node.name,
                node.alias || node.name
              )
              if (!alias) return
              store.updateNode(node.uid, () => ({ alias }))
            }}
          >
            名称変更
          </Button>
        </Grid2>
      </Grid2>
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
      {/* <Group float accord accordFill title="※ 確認事項">
        <Grid2 container spacing={2}>
          <Grid2 size="grow">
            <ul>
              {form.checklist.map((rule, key) => (
                <li key={key}>●&emsp;{rule}</li>
              ))}
            </ul>
          </Grid2>
          <Grid2 size="grow">
            <Button
              sx={{ verticalAlign: 'bottom' }}
              variant="outlined"
              fullWidth
              onClick={() => {
                updateForm(
                  (r) => r.dutyDetail,
                  (prev) =>
                    dutyQuestions !== ''
                      ? textareaIsEmpty(prev)
                        ? [dutyQuestions]
                        : [...prev, dutyQuestions]
                      : prev
                )
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              「役割詳細」に追記
            </Button>
            <Button
              sx={{ verticalAlign: 'bottom' }}
              variant="outlined"
              fullWidth
              onClick={() => copy(dutyQuestions)}
            >
              クリップボードにコピー
            </Button>
          </Grid2>
        </Grid2>
      </Group> */}

      <Group accord accordEmpty={() => 'NOEMPTY'} title="デバッグ情報">
        <Box component="pre">{JSON.stringify({ form, parents }, null, 2)}</Box>
      </Group>
    </Box>
  )
}
