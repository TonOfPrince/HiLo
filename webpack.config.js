const path = require('path');

module.exports = {
    entry: './app/js/components/Main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    },
                }]

            }, {
                test: /\.module.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            sourceMap: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        }
                    }
                ],
            }
        ],
    },
};
