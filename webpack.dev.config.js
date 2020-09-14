const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')

const buildDir = './test/view/built'

function getTime() {
    return new Date().toLocaleString('zh', { hour12: false });
}

module.exports = {
    entry: {
        shape: './test/view/shape.test.ts',
        render: './test/view/render.test.ts'
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
        path: path.join(__dirname, buildDir),
        filename: '[name].bundle.test.js'
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            title: 'shape-test',
            template: './test/view/template/tmpl-canvas.html',
            filename: './shape.test.html',
            chunks: ['shape'],
            showErrors: true,
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            title: 'render-test',
            template: './test/view/template/tmpl-canvas.html',
            filename: './render.test.html',
            chunks: ['render'],
            showErrors: true,
            inject: true,
            hash: true
        }),
        new WebpackOnBuildPlugin(function (stats) {
            const newlyCreatedAssets = stats.compilation.assets;
            const unlinked = [];
            fs.readdir(path.resolve(buildDir), (err, files) => {
                files.forEach(file => {
                    if (!newlyCreatedAssets[file]) {
                        fs.unlink(path.resolve(buildDir + file));
                        unlinked.push(file);
                    }
                });
                if (unlinked.length > 0) {
                    console.log('删除文件: ', unlinked);
                }
            });
        })
    ]
}