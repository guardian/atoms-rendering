module.exports = {
    stories: ['../**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('ts-loader'),
        });

        const rules = config.module.rules;
        const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
        fileLoaderRule.exclude = /\.svg$/;

        rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    addons: ['@storybook/addon-docs'],
};
