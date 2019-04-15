const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { join, resolve } = require('path');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const webpackMerge = require("webpack-merge");
const path = require("path");

// const ExtractTextPlugin = require("extract-text-webpack-plugin");

//
// var BUILD_DIR = resolve(__dirname, 'public');
// var APP_DIR = resolve(__dirname, 'src');
//


module.exports = (
    { mode, presets } = { mode: "development", presets: [] }) => {
    // console.log(`mode: ${mode}`);

    return webpackMerge(
        {
            mode,
            entry: "./src/index.jsx",
            resolve: {
                extensions: ['.js', '.jsx', '.css', 'scss'],

            },
            devServer: {
                historyApiFallback: true,
                contentBase: "./",
                open: true
            },
            module: {
                rules: [
                    {
                        test: /\.(png|jpg|jpeg|gif|ico)$/,
                        exclude: /node_modules/,
                        loader: ["url-loader", "file-loader"]
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        exclude: /node_modules/,
                        use: "babel-loader"
                    },
                    {
                        test: /\.(svg|woff|woff2|eot|ttf)$/,
                        loader: 'url-loader?limit=100000'
                    }

                ]
            },

            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundle.js"
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                })

                // new FaviconsWebpackPlugin({ logo: "./public/image.png" })
            ]
        },
        modeConfig(mode)
    );
};



//
// module.exports = {
//     mode: 'development',
//     entry: './src/index.jsx',
//     resolve: {
//         extensions: ['.js', '.jsx', '.css'],
//
//     },
//     output: {
//         path: BUILD_DIR,
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(jpe?g|png|ico)$/,
//                 exclude: /node_modules/,
//                 loader: ["url-loader", "file-loader"]
//             },
//             {
//                 test: /\.(js|jsx|mjs)$/,
//                 exclude: /node_modules/,
//                 use: "babel-loader"
//             }
//             // {
//             //     test: /\.css/,
//             //     use: ExtractTextPlugin.extract({
//             //         use: 'css-loader',
//             //         fallback: 'style-loader'
//             //     })
//             // },
//
//         ]
//     },
//
//     plugins: [new HtmlWebpackPlugin({
//         template: resolve(__dirname, 'public', 'index.html'),
//         filename: './public/index.html'
//     })],
//     devServer: {
//         historyApiFallback: true
//     },
// };