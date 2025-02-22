import { CommandMethodMember } from './TemplateJSON'

export type CommandForm = Omit<CommandMethodMember, 'name'>
