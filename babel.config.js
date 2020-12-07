module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
    plugins: [
        // this is needed to support `const enum`s - see https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats
        'const-enum',
        '@babel/plugin-proposal-optional-chaining',
        [
            'emotion',
            {
                sourceMap: false,
            },
        ],
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};
