import postcss7 from 'postcss7'
import type {} from 'postcss7'
import { defaultOptions } from './defaults'
import defu from 'defu'
import { postcssPlugin } from './shared'
const plugin = postcss7.plugin(postcssPlugin, (config) => {
  return (root, result) => {}
})

export default plugin
