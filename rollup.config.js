import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import dts from "rollup-plugin-dts"
import svgr from '@svgr/rollup'
import url from 'rollup-plugin-url'
import styles from "rollup-plugin-styles"

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: "lib/index.js",
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: "es/index.js",
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
  ],

  plugins: [
    babel({
      exclude: ['node_modules/**', '**.stories.ts*'],
      extensions,
      runtimeHelpers: true
    }),
    // resolve to finde third party modules
    resolve({ extensions }),
    commonjs(),
    // transform commonjs modules
    // svg loader
    styles(),
    url(),
    svgr(),
    // minimize code
  ],
  external: id => /^react|react-dom|styled-components/.test(id),
}, {
  input: 'src/index.ts',
  output: [{ file: "es/index.d.ts", format: "es" }, { file: "lib/index.d.ts", format: "cjs" }],
  plugins: [dts()],
}]
