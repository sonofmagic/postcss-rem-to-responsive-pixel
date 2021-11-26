import remRegex from './rem-unit-regex'
import * as filterPropList from './filter-prop-list'
import type { PluginCreator } from 'postcss'
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
  exclude: null,
  transformUnit: 'px'
}

function createRemReplace(rootValue: number, unitPrecision: number, minRemValue: number, transformUnit = 'px') {
  return function (m, $1) {
    if (!$1) return m
    const rems = parseFloat($1)
    if (rems < minRemValue) return m
    const fixedVal = toFixed((rems * rootValue), unitPrecision)
    return (fixedVal === 0) ? '0' : fixedVal + transformUnit
  }
}

function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

function declarationExists(decls, prop, value) {
  return decls.some(decl => decl.prop === prop && decl.value === value)
}

function blacklistedSelector(blacklist, selector) {
  if (typeof selector !== 'string') return
  return blacklist.some(regex => {
    if (typeof regex === 'string') {
      return selector.indexOf(regex) !== -1
    }
    return selector.match(regex)
  })
}

function createPropListMatcher(propList) {
  const hasWild = propList.indexOf('*') > -1
  const matchAll = (hasWild && propList.length === 1)
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
  return function (prop) {
    if (matchAll) return true
    return (
      (
        hasWild ||
        lists.exact.indexOf(prop) > -1 ||
        lists.contain.some(function (m) {
          return prop.indexOf(m) > -1
        }) ||
        lists.startWith.some(function (m) {
          return prop.indexOf(m) === 0
        }) ||
        lists.endWith.some(function (m) {
          return prop.indexOf(m) === prop.length - m.length
        })
      ) &&
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

const plugin: PluginCreator<UserDefinedOptions> = (options: typeof defaults) => {
  // if (typeof options === 'undefined') {
  //   throw new Error('postcss-rem-to-responsive-pixel plugin does not have the correct options')
  // }
  const opts = Object.assign({}, defaults, options)


  const satisfyPropList = createPropListMatcher(opts.propList)
  const exclude = opts.exclude;

  let isExcludeFile = false;
  let pxReplace;
  return {
    postcssPlugin: 'postcss-rem-to-responsive-pixel',
    Once(css) {
      const filePath = css.source.input.file;
      if (
        exclude &&
        ((type.isFunction(exclude) && (exclude as ((filePath: string) => boolean))(filePath)) ||
          (type.isString(exclude) && filePath.indexOf(exclude as string) !== -1) ||
          filePath.match(exclude as RegExp) !== null)
      ) {
        isExcludeFile = true;
      } else {
        isExcludeFile = false;
      }

      const rootValue =
        typeof opts.rootValue === "function"
          ? opts.rootValue(css.source.input)
          : opts.rootValue;
      pxReplace = createRemReplace(
        rootValue,
        opts.unitPrecision,
        opts.minRemValue,
        opts.transformUnit
      );
    },
    Declaration(decl) {
      if (isExcludeFile) return;

      if (
        decl.value.indexOf("rem") === -1 ||
        !satisfyPropList(decl.prop) ||
        blacklistedSelector(opts.selectorBlackList, decl.parent.selector)
      ) {
        return;
      }


      const value = decl.value.replace(remRegex, pxReplace);

      // if rem unit already exists, do not add or replace
      if (declarationExists(decl.parent, decl.prop, value)) return;

      if (opts.replace) {
        decl.value = value;
      } else {
        decl.cloneAfter({ value: value });
      }
    },
    AtRule(atRule) {
      if (isExcludeFile) return;

      if (opts.mediaQuery && atRule.name === "media") {
        if (atRule.params.indexOf("rem") === -1) return;
        atRule.params = atRule.params.replace(remRegex, pxReplace);
      }
    }
  }
}

plugin.postcss = true

export default plugin
