import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dts from "rollup-plugin-dts"
import svgr from '@svgr/rollup'
import url from 'rollup-plugin-url'
import styles from "rollup-plugin-styles"
import swc from 'rollup-plugin-swc'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default [{
  input: 'src/index.ts',
  output: {
    file: "es/index.js",
    format: 'es',
    exports: 'named',
    sourcemap: true
  },
  plugins: [
    swc({
      rollup: {
        exclude: ['node_modules/**', '**.stories.ts*'],
      },
      jsc: {
        parser: {
          syntax: 'typescript',
        },
        target: 'es2018',
      },
    }),
    // resolve to finde third party modules
    resolve({ extensions }),
    // commonjs(),
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
  // output: { file: "es/index.d.ts", format: "es" },
  // output: [{ file: "es/index.d.ts", format: "es" }, { file: "lib/index.d.ts", format: "cjs" }],
  plugins: [dts()],
}]
