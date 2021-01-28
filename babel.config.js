module.exports = {
    presets: [
        '@babel/preset-typescript',
        ['@babel/preset-react', { pragma: 'h', pragmaFrag: 'Fragment' }],
        '@emotion/babel-preset-css-prop',
        [
            '@babel/preset-env',
            {
                targets: {
                    ie: '11',
                },
            },
        ],
    ],
    plugins: ['@babel/plugin-proposal-optional-chaining'],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};
