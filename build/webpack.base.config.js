
const resolve = require("./utils.js").resolve

module.exports = {
    // 入口
    entry:{
        app:'./src/index'
    },
    output:{
        path: resolve("../dist"),
        filename:"js/[name].[hash].js",
        publicPath:'/'// 打包后的资源的访问路径前缀
    },
    resolve:{
        extensions:['.js','.json'],
        alias:{
            "@": resolve('../src')
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                loader:"babel-loader"

            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader:'style-loader',
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:10000,
                    name:'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:"url-loader",
                options:{
                    limit:10000,
                    name:"static/fonts/[name].[hash:7].[ext]"
                }
            },{
                test:/\.md$/,
                loader:"raw-loader"
            }
        ]
    },
}