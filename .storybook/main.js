module.exports = {
    stories: ['../**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
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
            },
        });

        return config;
    },
    addons: ['@storybook/addon-docs'],
};
