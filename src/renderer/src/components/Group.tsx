import { Box, FormLabel, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Spacer } from './Spacer'
import { Accord } from './Accord'
import { Float } from './Float'

export const Group = (p: {
  title: string
  smallLabel?: boolean
  accord?: boolean
  accordEmpty?: () => boolean | 'NOEMPTY'
  accordFill?: boolean
  float?: boolean | number
  children: ReactNode
}) => {
  const accordEmpty = p.accordEmpty?.()
  const title = `${p.title}${accordEmpty && accordEmpty !== 'NOEMPTY' ? '（未入力）' : ''}`
  const core = (
    <>
      {p.accord || (
        <>
          <FormLabel>
            <Typography
              {...(p.smallLabel ? { sx: { fontSize: '12px', color: 'gray' } } : { variant: 'h5' })}
            >
              {title}
            </Typography>
          </FormLabel>
          <Spacer />
        </>
      )}
      {p.children}
    </>
  )
  const render = p.accord ? (
    <Accord open={!accordEmpty} title={title} fill={p.accordFill} nospace={!!p.float}>
      {core}
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
        {core}
      </Box>
      {p.float || <Spacer />}
    </>
  )
  return p.float ? (
    <Float top={typeof p.float === 'number' ? p.float : undefined}>{render}</Float>
  ) : (
    render
  )
}
