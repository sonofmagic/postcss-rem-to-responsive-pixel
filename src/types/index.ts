import type { Input } from 'postcss'
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

const type = (s: any) =>
  Object.prototype.toString.call(s).slice(8, -1).toLowerCase()

const types = [
  'String',
  'Array',
  'Undefined',
  'Boolean',
  'Number',
  'Function',
  'Symbol',
  'Object'
]

export type TypesFuncMap = Record<string, (val: any) => boolean>

export default types.reduce<TypesFuncMap>((acc, str) => {
  acc['is' + str] = (val) => type(val) === str.toLowerCase()
  return acc
}, {})
