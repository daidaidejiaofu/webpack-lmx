// 引入path 模块
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');//处理dist目录
const

module.exports = {
    entry: "./src/index.js",
    // 配置环境（这里是开发）
    mode: "production",
    output: {
        filename: "main.js", // 文件名字
        path: path.resolve(__dirname, "dist")
    },
    module: {

        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            //Compress JPEG images
                            mozjpeg:{
                                progressive:true,
                                quality:65
                            },
                            //Compress PNG images
                            optipng: {
                                enabled: false
                            },
                            //pngquant — Compress PNG images
                            pngquant: {
                                quality: "65-90",
                                speed: 4
                            },
                            //gifsicle — Compress GIF images
                            gifsicle: {
                                interlaced: false
                            },
                            //webp — Compress JPG & PNG images into WEBP
                            webp: {
                                quality: 75
                            }

                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss", // 微标示浮，没有啥实际意义，官方推荐写法
                            sourceMap: true, // 启用sourceMap
                            plugins: loader => [
                                // 插件，可以设置多个
                                require("autoprefixer")({ browsers: ["> 0.15% in CN"] }) // 这个是市场占有度在
                            ]
                        }
                    },
                   ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name][hash].css", // webpack 处理css缓存，添加一个hash
            chunkFilename: "[id][hash].css"
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Webpack App", // 默认值：Webpack App
            filename: "main.html",
            template: path.resolve(__dirname, "./src/index.html"),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    }
};
