const theme = require(`./${process.env.THEME || 'default'}`)

export type Theme = typeof theme
