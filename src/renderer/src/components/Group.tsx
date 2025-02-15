import { Box, FormLabel, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Spacer } from './Spacer'

export const Group = (p: { label: string | ReactNode; children: ReactNode }) => {
  return (
    <>
      <Box
        component="fieldset"
        sx={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 1,
          pb: 2,
          position: 'relative',
          '&:hover': { borderColor: 'rgba(255, 255, 255, 0.4)' },
          '&:focus-within': { borderColor: 'rgba(255, 255, 255, 0.4)' }
        }}
      >
        <FormLabel>
          {typeof p.label === 'string' ? <Typography variant="h5">{p.label}</Typography> : p.label}
        </FormLabel>
        <Spacer />
        {p.children}
      </Box>
      <Spacer />
    </>
  )
}
