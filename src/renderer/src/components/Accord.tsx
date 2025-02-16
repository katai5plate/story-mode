import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Spacer } from './Spacer'

export const Accord = (p: {
  title: string
  summary?: string
  open?: boolean
  fill?: boolean
  nospace?: boolean
  closeIsEmpty?: boolean
  children: ReactNode
}) => {
  const title = `${p.title}${p.closeIsEmpty && !p.open ? ' （未入力）' : ''}`
  return (
    <>
      <Accordion defaultExpanded={p.open} variant={p.fill ? 'elevation' : 'outlined'}>
        <AccordionSummary expandIcon="▽">
          <Typography component="span">
            <strong style={{ opacity: 0.7 }}>{title}</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {p.summary && (
            <>
              <Typography sx={{ color: 'gray' }}>{p.summary}</Typography>
              <Spacer />
            </>
          )}
          <Box>{p.children}</Box>
        </AccordionDetails>
      </Accordion>
      {p.nospace || <Spacer />}
    </>
  )
}
