var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        hot: true,
        inline: true,
        progress: true,
        contentBase: './',
        port: 8080
    },
    entry: {
        home: "./src/index.js",
        page0: "./src/page_1.js",
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                        plugins: [require('autoprefixer')()]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/img/www.ico.la_3ff4b3854761361d57afe2b3d510cfb4_64X64.ico',
            title: '罗锦春的webpack脚手架',
            template: path.resolve(__dirname, './src/index.html'),
            filename: path.resolve(__dirname, './dist/index.html'),
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            favicon: './src/img/www.ico.la_3ff4b3854761361d57afe2b3d510cfb4_64X64.ico',
            title: '罗锦春的webpack脚手架2',
            template: path.resolve(__dirname, './src/page_1.html'),
            filename: path.resolve(__dirname, './dist/page_1.html'),
            chunks: ['page_1']
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载

    ]
}