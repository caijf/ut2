import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig(
  {
    ignores: ['dist/', 'dist-bak/', 'types/', 'build/', 'docs/', 'coverage/', 'lib/', 'es/', 'umd/']
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0
      // 'no-control-regex': 0,
      // '@typescript-eslint/ban-ts-comment': 0,
      // '@typescript-eslint/no-this-alias': 0,
      // '@typescript-eslint/no-explicit-any': 0,
      // '@typescript-eslint/no-empty-function': 0
    }
  }
);
