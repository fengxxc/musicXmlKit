const path = require('path')

module.exports = {
    entry: ['./src/main.ts'],
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'awesome-typescript-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    output: {
        path: path.join(__dirname, './built'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',

    // mode: 'production',
    // devtool: 'cheap-module-source-map',
}