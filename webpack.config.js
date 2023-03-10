const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { 
        index: path.resolve(__dirname, 'src', 'index.js') 
    },
    output: { path: path.resolve(__dirname, 'public') },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({filename: 'style.css'})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ],
    },
    devServer: {
        port: 8080,       
        proxy: {
            '/api/': {
            target: 'http://218.50.0.41:8080',
            changeOrigin: true,
            }
        }
    },
    experiments: {
        topLevelAwait: true,
    }
}