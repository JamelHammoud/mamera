import { type } from './type'
import { elevation } from './elevation'
import { breakpoint } from './breakpoint'
import { color } from './color'

export const theme = {
  color,
  elevation,
  breakpoint,
  type
}

export type Theme = typeof theme