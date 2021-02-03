module.exports = {
    presets: [
        '@babel/preset-typescript',
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
                importSource: '@emotion/core',
            },
        ],
        [
            '@babel/preset-env',
            {
                targets: {
                    ie: '11',
                },
            },
        ],
        '@emotion/babel-preset-css-prop',
    ],
    plugins: ['@babel/plugin-proposal-optional-chaining'],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};
