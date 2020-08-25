const { merge } = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config.js")
const { resolve, entry, chunks } = require("./utils.js")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const BundleAnalyzerPlugin  = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

// 配置多入口文件

const HtmlWebpackPluginList = []

// (function () {

//     HtmlWebpackPluginList.push(new HtmlWebpackPlugin({
//         filename:resolve("../dist/index.html"),
//         template:resolve("../public/index.html"),
//         inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
//         favicon:resolve('../public/favicon.ico'),
//         hash:true,//回给script标签中的js文件增加一个随机数 防止缓存 bundle.js?22b9692e22e7be37b57e
//         chunks:['app'], // 主要用于多入口文件，当你有对个入口文件是，那就会编译生成多个打包后的文件（和entry中的属性一一对应的）
//     }))


// })()





module.exports = merge(webpackBaseConfig,{
    mode:"development",
    // module:{
    //     rules:[
    //         {
    //             test:/\.css$/,
    //             loader:
    //         }
    //     ]
    // }
    plugins:[
        new HtmlWebpackPlugin({
            filename:resolve("../docs/detail/index.html"),
            template:resolve("../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            favicon:resolve('../public/favicon.ico'),
            hash:true,//回给script标签中的js文件增加一个随机数 防止缓存 bundle.js?22b9692e22e7be37b57e
            chunks:['detail'], // 主要用于多入口文件，当你有对个入口文件是，那就会编译生成多个打包后的文件（和entry中的属性一一对应的）
        }),
        new HtmlWebpackPlugin({
            filename:resolve("../docs/index/index.html"),
            template:resolve("../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            favicon:resolve('../public/favicon.ico'),
            hash:true,//回给script标签中的js文件增加一个随机数 防止缓存 bundle.js?22b9692e22e7be37b57e
            chunks:['index'], // 主要用于多入口文件，当你有对个入口文件是，那就会编译生成多个打包后的文件（和entry中的属性一一对应的）
        }),
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    // 开启本地服务时的服务配置
    devServer:{
        historyApiFallback:true, // 当找不到路径的时候 默认加载index.html文件
        hot:true, 
        contentBase:false, 
        compress:true,
        port:"8081",
        publicPath:"/",
        proxy:{
            "/api":{
                secure:false,
                target:'http:127.0.0.1:8082'
            }
        }  // 接口请求代理
    }
})