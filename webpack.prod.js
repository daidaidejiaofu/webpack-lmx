const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require('webpack-merge')
const common = require('./webpack.common')
const prodConfig = {
    // 配置环境（这里是开发）
    mode: "production",
    // 配置出口
    output: {
        filename: "main.js", // 文件名字
        path: path.resolve(__dirname, "dist") // 文件路径(绝对路径)
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    // 配置postcss-loader
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            sourceMap: true, // 启用sourceMap
                            plugins:  [
                                require("autoprefixer")({ browsers: ["> 0.15% in CN"] })
                            ]
                        }

                    }
                ]
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name][hash].css", // webpack 处理css缓存，添加一个hash
            chunkFilename: "[id][hash].css"
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}), // css压缩
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            })
        ]
    }
};
module.exports = merge(common, prodConfig);

