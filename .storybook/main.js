module.exports = {
    stories: ['../**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('ts-loader'),
        });

        return config;
    },
    addons: ['@storybook/addon-docs'],
};
