import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Spacer } from './Spacer'

export const Accord = (p: { title: string; summary?: string; children: ReactNode }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon="▽">
        <Typography component="span">{p.title}</Typography>
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
  )
}
