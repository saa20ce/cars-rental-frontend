import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

export default [
    {
        ignores: [
            '.next/**',
            'node_modules/**',
            'public/**',
            'tools/**',
            '*.sql',
            'migration*.txt',
            'next-env.d.ts',
        ],
    },
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript'],
    }),
    {
        files: ['next.config.js'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    prettierConfig,
];
