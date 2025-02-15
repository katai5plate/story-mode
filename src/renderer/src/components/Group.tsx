import { Box, FormLabel, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Spacer } from './Spacer'
import { Accord } from './Accord'

export const Group = (p: {
  title: string
  smallLabel?: true
  accord?: true
  accordClose?: true
  children: ReactNode
}) => {
  const render = (
    <>
      {p.accord || (
        <>
          <FormLabel>
            <Typography
              {...(p.smallLabel ? { sx: { fontSize: '12px', color: 'gray' } } : { variant: 'h5' })}
            >
              {p.title}
            </Typography>
          </FormLabel>
          <Spacer />
        </>
      )}
      {p.children}
    </>
  )
  return p.accord ? (
    <Accord open={p.accordClose ? undefined : true} title={p.title}>
      {render}
    </Accord>
  ) : (
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
        {render}
      </Box>
      <Spacer />
    </>
  )
}
