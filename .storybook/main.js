module.exports = {
    stories: ['../**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
                presets: [
                    '@babel/preset-typescript',
                    '@babel/preset-react',
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                esmodules: true,
                            },
                        },
                    ],
                ],
            },
        });

        return config;
    },
    addons: ['@storybook/addon-docs'],
};
