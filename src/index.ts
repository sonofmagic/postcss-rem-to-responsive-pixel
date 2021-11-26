import { remRegex } from './regex'
import * as filterPropList from './filter-prop-list'
import type { PluginCreator, ChildNode, Container } from 'postcss'
import type { UserDefinedOptions } from './types'
import type from './types'

const defaults: UserDefinedOptions = {
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

function createRemReplace (
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

function toFixed (number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

function declarationExists (
  decls: Container<ChildNode>,
  prop: string,
  value: string
) {
  // @ts-ignore
  return decls.some((decl) => decl.prop === prop && decl.value === value)
}

function blacklistedSelector (blacklist: string[], selector: string) {
  if (typeof selector !== 'string') return
  return blacklist.some((regex) => {
    if (typeof regex === 'string') {
      return selector.indexOf(regex) !== -1
    }
    return selector.match(regex)
  })
}

function createPropListMatcher (propList: string[]) {
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

const plugin: PluginCreator<UserDefinedOptions> = (
  options?: UserDefinedOptions
) => {
  // if (typeof options === 'undefined') {
  //   throw new Error('postcss-rem-to-responsive-pixel plugin does not have the correct options')
  // }
  const opts = Object.assign<
    {},
    typeof defaults,
    UserDefinedOptions | undefined
  >({}, defaults, options) as Required<UserDefinedOptions>

  const satisfyPropList = createPropListMatcher(opts.propList)
  const exclude = opts.exclude

  let isExcludeFile = false
  let pxReplace: (m: string, $1: string) => string
  return {
    postcssPlugin: 'postcss-rem-to-responsive-pixel',
    Once (css) {
      const source = css.source
      const filePath = source!.input.file as string
      if (
        exclude &&
        ((type.isFunction(exclude) &&
          (exclude as (filePath: string) => boolean)(filePath)) ||
          (type.isString(exclude) &&
            filePath.indexOf(exclude as string) !== -1) ||
          filePath.match(exclude as RegExp) !== null)
      ) {
        isExcludeFile = true
      } else {
        isExcludeFile = false
      }

      const rootValue =
        typeof opts.rootValue === 'function'
          ? opts.rootValue(source!.input)
          : opts.rootValue
      pxReplace = createRemReplace(
        rootValue,
        opts.unitPrecision,
        opts.minRemValue,
        opts.transformUnit
      )
    },
    Declaration (decl) {
      if (isExcludeFile) return

      if (
        decl.value.indexOf('rem') === -1 ||
        !satisfyPropList(decl.prop) ||
        // @ts-ignore
        blacklistedSelector(opts.selectorBlackList, decl.parent!.selector)
      ) {
        return
      }

      const value = decl.value.replace(remRegex, pxReplace)

      // if rem unit already exists, do not add or replace
      // @ts-ignore
      if (declarationExists(decl.parent, decl.prop, value)) return

      if (opts.replace) {
        decl.value = value
      } else {
        decl.cloneAfter({ value: value })
      }
    },
    AtRule (atRule) {
      if (isExcludeFile) return

      if (opts.mediaQuery && atRule.name === 'media') {
        if (atRule.params.indexOf('rem') === -1) return
        atRule.params = atRule.params.replace(remRegex, pxReplace)
      }
    }
  }
}

plugin.postcss = true

export default plugin
