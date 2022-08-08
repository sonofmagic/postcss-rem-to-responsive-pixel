import postcss7 from 'postcss7'
import { remRegex } from './regex'
import type { UserDefinedOptions } from './types'
import {
  postcssPlugin,
  getConfig,
  createRemReplace,
  createPropListMatcher,
  blacklistedSelector,
  declarationExists
} from './shared'
const plugin = postcss7.plugin(
  postcssPlugin,
  (options: UserDefinedOptions = {}) => {
    const opts = getConfig(options)
    const remReplace = createRemReplace(
      opts.rootValue as number,
      opts.unitPrecision,
      opts.minRemValue,
      opts.transformUnit
    )
    const satisfyPropList = createPropListMatcher(opts.propList)
    return (css, result) => {
      css.walkDecls(function (decl, i) {
        // This should be the fastest test and will remove most declarations
        if (decl.value.indexOf('rem') === -1) return

        if (!satisfyPropList(decl.prop)) return
        // @ts-ignore
        if (blacklistedSelector(opts.selectorBlackList, decl.parent.selector)) {
          return
        }

        const value = decl.value.replace(remRegex, remReplace)

        // if px unit already exists, do not add or replace
        // @ts-ignore
        if (declarationExists(decl.parent, decl.prop, value)) return

        if (opts.replace) {
          decl.value = value
        } else {
          decl.parent.insertAfter(i, decl.clone({ value }))
        }
      })

      if (opts.mediaQuery) {
        css.walkAtRules('media', function (rule) {
          if (rule.params.indexOf('rem') === -1) return
          rule.params = rule.params.replace(remRegex, remReplace)
        })
      }
    }
  }
)

export default plugin
