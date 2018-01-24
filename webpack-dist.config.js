var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    devtool: 'cheap-module-eval-source-map', //开发环境
    entry: {
        home: "./src/index.js",
        page0: "./src/page_1.js",
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
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
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')()]
                            }
                        },
                        {
                            loader: "sass-loader",
                        }
                    ]
                }),
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader?name=images/[name]-[hash].[ext]']
            }, {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // favicon: './src/img/www.ico.la_3ff4b3854761361d57afe2b3d510cfb4_64X64.ico',
            title: '罗锦春的webpack脚手架dist',
            template: path.resolve(__dirname, './src/index.html'),
            filename: path.resolve(__dirname, './dist/index.html'),
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            // favicon: './src/img/www.ico.la_3ff4b3854761361d57afe2b3d510cfb4_64X64.ico',
            title: '罗锦春的webpack脚手架2dist',
            template: path.resolve(__dirname, './src/page_1.html'),
            filename: path.resolve(__dirname, './dist/page_1.html'),
            chunks: ['page_1']
        }),

        new ExtractTextPlugin({
            filename: 'css/[name]-[hash].css',
            allChunks: true
        }),
    ]
}