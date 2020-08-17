const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")


function resolve(dir) {
    return path.resolve(__dirname,dir)
}

module.exports = {
    //指定构建环境
    mode:'development',
    // 入口
    entry:{
        app:'./src/index'
    },
    output:{
        path: resolve("../dist"),
        filename:"js/[name].[hash].js",
        publicPath:'/'// 打包后的资源的访问路径前缀
    },
    module:{

    },
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            filename:resolve('../dist/index.html'),
            template:'index.html',
            inject:true,
            hash:true,
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        })
    ],
    //开发环境本地启动的服务配置
    devServer:{

    }
}