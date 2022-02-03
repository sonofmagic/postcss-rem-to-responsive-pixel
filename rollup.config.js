import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import pkg from './package.json'
/** @type {import('rollup').RollupOptions} */
const config = {
  input: {
    index: 'src/index.ts',
    postcss7: 'src/index.postcss7.ts'
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'auto'
    }
    // { format: 'esm', file: pkg.module }
  ],

  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json' })
  ],
  external: [
    'postcss',
    'postcss7'
  ]
}

export default config
