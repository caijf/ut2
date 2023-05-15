import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert { type: "json" };

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

export const pkgName = pkg.name;
export const globalName = toCamel(pkg.name);
export const umdDir = `dist`;
export const esmDir = `es`;
export const cjsDir = `lib`;
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
  typescript({
    tsconfig: "./tsconfig.build.json",
    compilerOptions: {
      removeComments: true
    }
  })
];
