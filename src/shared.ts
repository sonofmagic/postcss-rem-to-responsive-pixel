import * as filterPropList from './filter-prop-list'
import type { ChildNode, Container } from 'postcss'
import type { UserDefinedOptions } from './types'
import defu from 'defu'
import { defaultOptions } from './defaults'

export const postcssPlugin = 'postcss-rem-to-responsive-pixel'

export function getConfig (options: UserDefinedOptions) {
  if (typeof options === 'undefined') {
    throw new Error(`${postcssPlugin} plugin does not have the correct options`)
  }
  return defu<UserDefinedOptions, Required<UserDefinedOptions>>(
    options,
    defaultOptions
  )
}

export function createRemReplace (
  rootValue: number,
  unitPrecision: number,
  minRemValue: number,
  transformUnit = 'px'
) {
  return function (m: string, $1: string) {
    if (!$1) return m
    const rems = parseFloat($1)
    if (rems < minRemValue) return m
    const fixedVal = toFixed(rems * rootValue, unitPrecision)
    return fixedVal === 0 ? '0' : fixedVal + transformUnit
  }
}

export function toFixed (number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

export function declarationExists (
  decls: Container<ChildNode>,
  prop: string,
  value: string
) {
  // @ts-ignore
  return decls.some((decl) => decl.prop === prop && decl.value === value)
}

export function blacklistedSelector (blacklist: string[], selector: string) {
  if (typeof selector !== 'string') return
  return blacklist.some((regex) => {
    if (typeof regex === 'string') {
      return selector.indexOf(regex) !== -1
    }
    return selector.match(regex)
  })
}

export function createPropListMatcher (propList: string[]) {
  const hasWild = propList.indexOf('*') > -1
  const matchAll = hasWild && propList.length === 1
  const lists = {
    exact: filterPropList.exact(propList),
    contain: filterPropList.contain(propList),
    startWith: filterPropList.startWith(propList),
    endWith: filterPropList.endWith(propList),
    notExact: filterPropList.notExact(propList),
    notContain: filterPropList.notContain(propList),
    notStartWith: filterPropList.notStartWith(propList),
    notEndWith: filterPropList.notEndWith(propList)
  }
  return function (prop: string) {
    if (matchAll) return true
    return (
      (hasWild ||
        lists.exact.indexOf(prop) > -1 ||
        lists.contain.some(function (m) {
          return prop.indexOf(m) > -1
        }) ||
        lists.startWith.some(function (m) {
          return prop.indexOf(m) === 0
        }) ||
        lists.endWith.some(function (m) {
          return prop.indexOf(m) === prop.length - m.length
        })) &&
      !(
        lists.notExact.indexOf(prop) > -1 ||
        lists.notContain.some(function (m) {
          return prop.indexOf(m) > -1
        }) ||
        lists.notStartWith.some(function (m) {
          return prop.indexOf(m) === 0
        }) ||
        lists.notEndWith.some(function (m) {
          return prop.indexOf(m) === prop.length - m.length
        })
      )
    )
  }
}
