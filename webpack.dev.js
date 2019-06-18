const path=require('path');
const merge=require('webpack-merge');
const common =require('./webpack.common');
const webpack =require('webpack')
 const devConfig= {
     //开发环境
     mode: 'development',
     output: {
         filename: "main.js",
         path: path.resolve(__dirname, "dist")
     },
     devtool: 'inline-source-map',//方便调试
     devServer:{
         clientLogLevel:"warning",
         hot:true,//启用webpack的模块热替换
         contentBase:path(__dirname,"dist"),// //指定目录运行服务
         compress:true,//启用gzip压缩
         host:'0,0,0,0',//指定使用一个host。默认是是localhost
         port:8080,
         open:true,//是否自动打开浏览器
         overlay:{ //出现错误或者警告时，是否覆盖
             warning:true,
             error:true
         },
        publicPath:'/',//此路径下的打包文件可在浏览器中访问，必须是斜杠
         proxy:{
             "/api":{  // 访问api开头的请求，会跳转到  下面的target配置
                 target:"http://192.168.0.102:8080",
                 pathRewrite: {"^/api" : "/mockjsdata/5/api"}

             }
         }
     },
     module: {
         rules: [
             {
                 test: /\.(sc|c|sa)ss$/,
                 use: [
                     "style-loader",
                     {
                         loader: "css-loader",
                         options: {
                             sourceMap: true
                         }
                     },
                     {
                         loader: "postcss-loader",
                         options: {
                             ident: "postcss",
                             sourceMap: true, // 启用sourceMap
                             plugins: loader => [require("autoprefixer")({browsers: ["> 0.15% in CN"]}) // 这个是市场占有度在
                             ]
                         }
                     }
                 ]
             }
         ]
     },
     plugins:[
         new webpack.NamedModulesPlugin(),
         new webpack.HotModuleReplacementPlugin()//替换插件
     ]
 };
module.exports=merge(common,devConfig);