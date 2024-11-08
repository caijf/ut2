import { defineConfig } from 'rollup';
import { esmDir, cjsDir, input, plugins } from './rollup.base.config.mjs';

export default defineConfig({
  input,
  external: ['tslib'],
  output: [
    {
      format: 'es',
      dir: esmDir,
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
    {
      format: 'cjs',
      dir: cjsDir,
      preserveModules: true,
      preserveModulesRoot: 'src'
    }
  ],
  plugins
});
