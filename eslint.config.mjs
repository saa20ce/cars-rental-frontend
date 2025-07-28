import js from '@eslint/js';
import next from 'eslint-config-next';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    ...next(),
    {
        name: 'custom',
        files: ['**/*.{js,ts,jsx,tsx}'],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            // ✅ Включаем prettier как lint-правило
            'prettier/prettier': 'error',
        },
    },
    {
        // ✅ Отключаем конфликты с Prettier
        ...prettierConfig,
    },
];
