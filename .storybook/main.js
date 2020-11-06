const path = require('path');

module.exports = {
    stories: ['../**/*.stories.tsx'],
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            'const-enum',
                            [
                                'emotion',
                                {
                                    sourceMap: false,
                                },
                            ],
                        ],
                    },
                },
            ],
            include: path.resolve(__dirname, '../'),
        });

        // Return the altered config
        return config;
    },
};
