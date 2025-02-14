import { Box, Button } from '@mui/material'
import { ReactNode } from 'react'

export interface ListFormProps<T> {
  items: T[]
  addItem: () => void
  removeItem: (index: number) => void
  updateItem: (index: number, newItem: T) => void
  renderItem: (item: T, update: (newItem: T) => void, index: number) => ReactNode
}

// <ListForm
//   items={form.histories}
//   {...itemControllers('histories', { historyName: '', daily: [] })}
//   renderItem={(item, update, index) => (
//     <div key={index}>
//       <TextField
//         fullWidth
//         label="履歴名"
//         value={item.historyName}
//         onChange={(e) => update({ ...item, historyName: e.target.value })}
//         sx={{ mb: 1 }}
//       />
//       <TextField
//         fullWidth
//         label="日々の記録"
//         multiline
//         minRows={3}
//         value={item.daily.join('\n')}
//         onChange={(e) => update({ ...item, daily: e.target.value.split('\n') })}
//         sx={{ mb: 1 }}
//       />
//     </div>
//   )}
// />
export const ListForm = <T,>({
  items,
  renderItem,
  addItem,
  removeItem,
  updateItem
}: ListFormProps<T>) => {
  return (
    <Box sx={{ mt: 2 }}>
      {items.map((item, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          {renderItem(item, (newItem) => updateItem(index, { ...item, ...newItem }), index)}
          <Button variant="outlined" color="secondary" onClick={() => removeItem(index)}>
            削除
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={addItem}>
        追加
      </Button>
    </Box>
  )
}
