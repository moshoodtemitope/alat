const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { join, resolve } = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


var BUILD_DIR = resolve(__dirname, 'public');
var APP_DIR = resolve(__dirname, 'src');


module.exports = {
    mode: 'development',
    entry: APP_DIR + '/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx', '.css'],

    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include : APP_DIR,

            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },

        ]
    },

    plugins: [new HtmlWebpackPlugin({
        template: resolve(__dirname, 'public', 'index.html'),
        filename: './public/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    // stats: { children: false }
    // externals: {
    //     // global app config object
    //     config: JSON.stringify({
    //         apiUrl: 'http://localhost:4000'
    //     })
    // }
};