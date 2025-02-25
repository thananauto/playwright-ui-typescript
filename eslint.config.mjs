import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import ascii from 'eslint-plugin-ascii'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import unusedImports from 'eslint-plugin-unused-imports'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tsParser from '@typescript-eslint/parser'
import parser from 'jsonc-eslint-parser'

export default tseslint.config(
  eslint.configs.recommended,
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  ...tseslint.configs.recommended,
  {
    ignores: [
      '.vscode/',
      '.idea/',
      '.cloudbees/',
      '.github/',
      '.husky/',
      'dist/',
      'node_modules/',
      'allure-results/',
      'test-results/',
      '.prettierrc.json',
      'eslint.config.mjs',
      'tsconfig.json',
      'package.json',
      'package-lock.json',
      '.commitlintrc.cjs',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      ascii,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'ascii/valid-name': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unnecessary-type-assertion': [
        'warn',
        {
          typesToIgnore: ['HTMLElement'],
        },
      ],
    },
  },
  {
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
    rules: {
      'jsonc/auto': 'error',
    },
    languageOptions: {
      parser,
    },
  },
)
