
import type { Input } from 'postcss'
export interface UserDefinedOptions {
  rootValue?: number | ((input: Input) => number)
  unitPrecision?: number
  selectorBlackList?: string[]
  propList?: string[]
  replace?: boolean
  mediaQuery?: boolean,
  minRemValue?: number
  exclude?: string | RegExp | ((filePath: string) => boolean)
  transformUnit?: 'px' | 'rpx' | string
}



const type = s =>
  Object.prototype.toString
    .call(s)
    .slice(8, -1)
    .toLowerCase()

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

export default types.reduce<Record<string, (val: any) => boolean>>((acc, str) => {
  acc['is' + str] = val => type(val) === str.toLowerCase()
  return acc
}, {})
