import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const globalName = pkg.name;
const outputDivConfig = {
  umd: 'dist',
  esm: 'es',
  cjs: 'lib'
};
const input = './src/index.ts';
const plugins = [
  replace({
    preventAssignment: true,
    values: {
      BUILD_VERSION: JSON.stringify(pkg.version)
    }
  }),
  resolve(),
  commonjs(),
  // TODO 大版本更新将调整为主要导出 es2018 版本，额外导出 es5 版本。（tsconfig.es2018.json、tsconfig.es5.json）
  typescript({
    tsconfig: './tsconfig.build.json',
    compilerOptions: {
      removeComments: true
    }
  })
];

export default defineConfig([
  {
    input,
    external: ['tslib'],
    output: [
      {
        format: 'es',
        dir: outputDivConfig.esm,
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      {
        format: 'cjs',
        dir: outputDivConfig.cjs,
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    ],
    plugins
  },
  {
    input,
    output: [
      {
        format: 'umd',
        file: `${outputDivConfig.umd}/${pkg.name}.js`,
        name: globalName,
        sourcemap: true
      },
      {
        format: 'umd',
        file: `${outputDivConfig.umd}/${pkg.name}.min.js`,
        name: globalName,
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins
  }
]);
