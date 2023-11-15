import type { Declaration, Rule } from 'postcss'
// import merge from 'merge'
import { createDefu } from 'defu'
import type { UserDefinedOptions } from './types'
import { defaultOptions } from './defaults'
export const postcssPlugin = 'postcss-rem-to-responsive-pixel'

const defu = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

export function getConfig(options?: UserDefinedOptions) {
  return defu<UserDefinedOptions, Required<UserDefinedOptions>[]>(
    options!,
    defaultOptions
  ) as Required<UserDefinedOptions>
}

export function createRemReplace(
  rootValue: number,
  unitPrecision: number,
  minRemValue: number,
  transformUnit = 'px'
) {
  return function (m: string, $1: string) {
    if (!$1) return m
    const rems = Number.parseFloat($1)
    if (rems < minRemValue) return m
    const fixedVal = toFixed(rems * rootValue, unitPrecision)
    return fixedVal === 0 ? '0' : fixedVal + transformUnit
  }
}

export function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

export function declarationExists(decls: Rule, prop: string, value: string) {
  return decls.some((decl) => {
    const d = decl as Declaration
    return d.prop === prop && d.value === value
  })
}

export function blacklistedSelector(
  blacklist: (string | RegExp)[],
  selector?: string
) {
  if (typeof selector !== 'string') return
  return blacklist.some((regex) => {
    if (typeof regex === 'string') {
      return selector.includes(regex)
    }
    return selector.match(regex)
  })
}

export function createPropListMatcher(propList: (string | RegExp)[]) {
  const hasWild = propList.includes('*')
  // const matchAll = hasWild && propList.length === 1

  return function (prop: string) {
    if (hasWild) return true
    return propList.some((regex) => {
      if (typeof regex === 'string') {
        return prop.includes(regex)
      }
      return prop.match(regex)
    })
  }
}

export function createExcludeMatcher(
  exclude: (string | RegExp)[] | ((filePath: string) => boolean)
) {
  return function (filepath: string) {
    if (filepath === undefined) {
      return false
    }
    return Array.isArray(exclude)
      ? exclude.some((regex) => {
          if (typeof regex === 'string') {
            return filepath.includes(regex)
          }
          return filepath.match(regex)
        })
      : exclude(filepath)
  }
}
