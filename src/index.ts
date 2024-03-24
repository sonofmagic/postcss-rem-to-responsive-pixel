import type { PluginCreator } from 'postcss'

// https://postcss.org/docs/writing-a-postcss-plugin
// 你可以在这里定义插件用户，可以传入的配置
export interface UserDefinedOptions {
  a?: string
  b?: number
  // 1rem 多少 px , 默认 1rem = 16px
  rootValue?: number
}

// ast 可视化网站:
// https://astexplorer.net/
const plugin: PluginCreator<UserDefinedOptions> = (
  options: UserDefinedOptions = {}
) => {
  return {
    postcssPlugin: 'postcss-my-rem2px-plugin',
    // Rule 节点 hook
    Rule(rule, helper) {},
    // AtRule 节点 hook
    AtRule(atRule, helper) {},
    Declaration(decl, { Rule }) {
      // 你可以在 regex101 进行正则表达式的测试
      // 从而对 decl.value 这个字符串的值进行解析和替换
    }
    // Root 节点 hook
    // Root(root, helper) {}
  }
}
// 告诉postcss，这个是一个 postcss 插件
plugin.postcss = true

export default plugin
