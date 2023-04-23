import { MantineThemeOverride } from '@mantine/core'

export const themeMantine: MantineThemeOverride = {
  cursorType: 'pointer',
  black: '#222221',
  white: '#FFFFFF',
  colors: {
    customPink: ['#BD408B'],
    customBlack: ['#222221'],
  },
  globalStyles: () => ({
    html: {
      fontFamily: 'consolas, monospace, sans-serif',
    },
  }),
}
