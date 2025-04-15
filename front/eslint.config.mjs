import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    js.configs.recommended,

    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: typescriptParser, // pour le bloc <script>
                ecmaVersion: 2021,
                sourceType: 'module',
            },
        },
        plugins: {
            vue,
            '@typescript-eslint': typescriptPlugin,
            import: importPlugin,
        },
        rules: {
            ...vue.configs.recommended.rules,

            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
            }],
            'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
            'import/prefer-default-export': 'off',
            'import/extensions': 'off',
            'max-len': 'off',
            'class-methods-use-this': 'off',
            'no-param-reassign': [
                'error',
                {
                    props: true,
                    ignorePropertyModificationsFor: ['state'],
                },
            ],
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
        },
    },

    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            import: importPlugin,
        },
        rules: {
            // Tu peux copier les règles ici si besoin les appliquer aussi aux JS/TS hors Vue
        },
    },
];
