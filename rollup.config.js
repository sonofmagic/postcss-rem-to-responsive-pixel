import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// bug: Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)
// import replace from '@rollup/plugin-replace'
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
    typescript({ tsconfig: './tsconfig.build.json' }),
    {
      name: 'postcss7-renamer',
      renderChunk (code, chunk) {
        if (chunk.fileName === 'postcss7.js') {
          // console.log(`[renderChunk]:${chunk.fileName}`)
          return {
            code: code.replace(/require\('postcss7'\)/g, 'require(\'postcss\')')
          }
        }
      }
      // transform (code, id) {
      //   // 都是 ts
      //   console.log(`[transform]:${id}`)
      //   return {
      //     code
      //   }
      // }
    }
    // replace({
    //   values: {
    //     postcss7: JSON.stringify('postcss')
    //   },
    //   preventAssignment: true
    // })
  ],
  external: [
    'postcss',
    'postcss7'
  ]
}

export default config
