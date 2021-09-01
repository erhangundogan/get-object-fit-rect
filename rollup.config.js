import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import ts from "@wessberg/rollup-plugin-ts";
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      sourcemap: !production,
      file: 'dist/cjs/index.js',
      format: 'cjs'
    },
    {
      sourcemap: !production,
      file: 'dist/es/index.js',
      format: 'es'
    },
    {
      sourcemap: !production,
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'GetObjectFitRect'
    }
  ],
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    ts(),
    commonjs(),
    resolve({
      preferBuiltins: true
    }),
    production ? terser() : null,
    production ? filesize() : null
  ]
};
