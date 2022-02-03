import type { Input, PluginCreator } from 'postcss'

export interface UserDefinedOptions {
  rootValue?: number | ((input: Input) => number)
  unitPrecision?: number
  selectorBlackList?: (string | RegExp)[]
  propList?: string[]
  replace?: boolean
  mediaQuery?: boolean
  minRemValue?: number
  exclude?: string | RegExp | ((filePath: string) => boolean)
  transformUnit?: 'px' | 'rpx'
}

export type PostcssRemToResponsivePixel = PluginCreator<UserDefinedOptions>
