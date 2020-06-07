const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let tmpl = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>graph-test</title>
    </head>
    <body>
        <canvas id="can" width="1000px" height="800px" styles="box-shadow: 0 0 5px;"></canvas>
    </body>
    </html>
`

module.exports = {
    entry: {
        shape: './test/view/shape.test.ts'
    },
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
        path: path.join(__dirname, './test/view/built'),
        filename: '[name].bundle.test.js'
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            // template: './test/view/graph.test.html',
            templateContent: ({htmlWebpackPlugin}) => tmpl,
            filename: './shape.test.html',
            chunks: ['shape'],
            showErrors: true,
            inject: true,
            hash: true
        })
    ]
}