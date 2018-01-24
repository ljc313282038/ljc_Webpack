var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');//无法注入语法inline-html-withimg-loader解决bug
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
    devtool: "cheap-module-inline-source-map", // any "source-map"-like devtool is possible
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
                test: /\.(scss|sass|css)$/,
                //这里注意顺序开发环境方便调试css、scss
                use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')()],
                        }
                    }

                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader?name=img/[name]-[hash].[ext]']
            }, 
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
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