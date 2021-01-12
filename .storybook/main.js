const path = require('path');

module.exports = {
    stories: ['../**/*.stories.tsx'],
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('ts-loader'),
                },
            ],
        });

        return config;
    },
    addons: ['@storybook/addon-docs'],
};
