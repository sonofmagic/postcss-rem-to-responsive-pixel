import type { UserDefinedOptions } from './types'

export const defaultOptions: Required<UserDefinedOptions> = {
  rootValue: 16,
  unitPrecision: 5,
  selectorBlackList: [],
  propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
  replace: true,
  mediaQuery: false,
  minRemValue: 0,
  exclude: /node_modules/i,
  transformUnit: 'px'
}
