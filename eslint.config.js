const js = require('@eslint/js');

module.exports = [
    {
        ignores: ['node_modules', '.git', 'dist']
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                console: 'readonly',
                process: 'readonly'
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            'indent': ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always']
        }
    }
];
