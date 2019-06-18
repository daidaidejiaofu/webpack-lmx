const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
             //babel转码 es6语法转化
            {
              test:/\.(js|jsx)$/,
                exclude :/node_modules/,
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                            cacheDirectory:true,
                            presets:[
                                "es2015","react"
                            ]
                        }
                    }
                ]

            },
            {
                test:/\.(png|svg|jpg|gif|jpeg|ico|woff|eot|ttf|otf)$/,
                use:[
                    {
                        loader: "url-loader",
                        options:{
                            limit:10000
                        }
                    },
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
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js",".json",".vue"],
        alias: {
            "@": path.resolve(__dirname,"dist")//配置别名
        }
    },
    plugins: [

        new CleanWebpackPlugin(),
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
    ]
};
