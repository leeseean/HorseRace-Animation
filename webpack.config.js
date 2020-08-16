const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");        //提取成单个css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');      //压缩css插件
const HtmlWebpackPlugin = require('html-webpack-plugin');       //html文件打包，压缩
const {CleanWebpackPlugin} = require("clean-webpack-plugin");     //删除原来的打包文件
const copyWebpackPlugin = require("copy-webpack-plugin");     //复制静态文件

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {        //入口文件
        index: './js/index.js',
    },
    output: {       //出口文件
        publicPath: '',     //模板、样式、脚本、图片等资源的路径中统一会加上额外的路径
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[hash:8].js'
    },
    devServer: {
        proxy: {
            '/api': { // 这个是你要替换的位置
                target: 'http://api.81p.net/api',//这个是被替换的目标地址
                secure: false,//true表示接受对方是https的接口
                changeOrigin: true,// 是否需要跨域
                pathRewrite: {'^/api': ''}
            }
        },
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, 'js')],
                loader: 'babel-loader',
                options: {
                    plugins: ['syntax-dynamic-import'],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false
                            }
                        ]
                    ]
                },
                test: /\.js$/
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: '/assets/images/[name].[ext]',
                }
            },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    },
    plugins: [
        new CleanWebpackPlugin(),       //删除上次打包文件，默认目录'./dist'
        new copyWebpackPlugin({
            patterns: [{        //静态资源输出,将src目录下的assets文件夹复制到dist目录下
                from: path.join(__dirname, "./assets"),
                to: path.join(__dirname, "./dist/assets"),
            }]
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[hash:8].css"
        }),
        new OptimizeCssAssetsPlugin(),      //压缩css文件
        new HtmlWebpackPlugin({
            // favicon: './src/img/favicon.ico',      //图标
            template: './index.html',      //指定要打包的html
            filename: 'index.html',       //指定输出路径和文件名
            minify: {       //压缩
                removeComments: true,       //移除HTML中的注释
                collapseWhitespace: true,        //删除空白符与换行符
                removeAttributeQuotes: true        //去除属性引用
            }
        }),
        // new HtmlWebpackPlugin(//打包第二个页面
        //     {
        //         template: './app/src/page/index2.html',
        //         filename:'./page/index2.html'
        //     }
        // )
    ]
};
