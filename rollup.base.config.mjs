import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert { type: 'json' };

export const pkgName = pkg.name;
export const globalName = pkgName;
export const umdDir = 'dist';
export const esmDir = 'es';
export const cjsDir = 'lib';
export const typesDir = 'types';
export const input = './src/index.ts';
export const plugins = [
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
