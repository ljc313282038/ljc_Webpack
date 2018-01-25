const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
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
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                //url-loader 会直接把字体打包到js
                use: ["url-loader"]
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')()],
                            }
                        },
                        {
                            loader: "sass-loader",
                        }
                    ]
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,
                // 生产模式下要对css中抽离的模块但对添加publicPath
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        publicPath: '../'
                    }
                }]
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
            chunks: ['home', 'commons']
        }),
        new HtmlWebpackPlugin({
            // favicon: './src/img/www.ico.la_3ff4b3854761361d57afe2b3d510cfb4_64X64.ico',
            title: '罗锦春的webpack脚手架2dist',
            template: path.resolve(__dirname, './src/page_1.html'),
            filename: path.resolve(__dirname, './dist/page_1.html'),
            chunks: ['page_1', 'commons']
        }),

        new ExtractTextPlugin({
            filename: 'css/[name]-[hash].css',
            allChunks: true
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            exclude: /\/node_modules/,
            cache: true,
            sourceMap: true,
        }),
        new CleanWebpackPlugin( //
            ['./dist/js', './dist/css'], 　 //匹配删除的文件
            {
                root: __dirname, //根目录
                verbose: true,
                dry: false,
                exclude: ['shared.js'] //要排除的项目
            }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            minChunks: 3,
        }),
    ]
}