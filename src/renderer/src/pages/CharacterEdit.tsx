import { Box, Typography } from '@mui/material'
import { ListForm } from '@renderer/components/ListForm'
import { SelectBox } from '@renderer/components/SelectBox'
import { Spacer } from '@renderer/components/Spacer'
import { TextInput } from '@renderer/components/TextInput'
import { useStore } from '@renderer/store/useStore'
import { useEditForm } from '@renderer/utils/useEditForm'
import { useEffect } from 'react'

export interface CharacterHistory {
  historyName: string
  daily: string[]
}

export interface CharacterEditForm {
  name: string
  duty: string
  histories: CharacterHistory[]
}

const duties = [
  {
    id: 'hero',
    name: '主人公'
  },
  {
    id: 'buddy',
    name: '相棒'
  }
]

export const CharacterEdit = () => {
  const store = useStore()
  const { form, setAllField, updateField, itemControllers } = useEditForm<CharacterEditForm>({
    name: '',
    duty: '',
    histories: []
  })

  useEffect(() => {
    setAllField({
      name: '勇者アレックス',
      duty: '主人公',
      histories: [{ historyName: '過去の出来事', daily: ['事件1', '事件2'] }]
    })
  }, [])

  return (
    <Box>
      <pre>{JSON.stringify(store.currentRoute, null, 2)}</pre>
      <Typography variant="h5">キャラクター編集</Typography>
      <Spacer />
      <TextInput
        label="名前"
        value={form.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      <SelectBox
        label="役割"
        combo
        value={form.duty}
        options={store.template.character.duty}
        onChange={(text) => updateField('duty', text || '')}
      />
      <SelectBox
        label="役割"
        value={form.duty}
        options={store.template.character.duty}
        onChange={(text) => updateField('duty', text || '')}
      />
      <ListForm
        items={form.histories}
        {...itemControllers('histories', { historyName: '', daily: [] })}
        renderItem={(item, update, index) => (
          <div key={index}>
            <TextInput
              label="履歴名"
              value={item.historyName}
              onChange={(e) => update({ historyName: e.target.value })}
            />
            <TextInput
              textarea
              label="日々の記録"
              value={item.daily.join('\n')}
              onChange={(e) => update({ daily: e.target.value.split('\n') })}
            />
          </div>
        )}
      />
    </Box>
  )
}
