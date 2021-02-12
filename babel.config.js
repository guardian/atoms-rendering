module.exports = {
    presets: [
        '@babel/preset-typescript',
        [
            '@babel/preset-react',
            { runtime: 'automatic', importSource: '@emotion/react' },
        ],
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
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
