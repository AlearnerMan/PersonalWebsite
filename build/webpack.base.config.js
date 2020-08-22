
const resolve = require("./utils.js").resolve
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UnlifyJsPlugin = require("uglifyjs-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    // 入口
    entry:{
        app:'./src/index'
    },
    output:{
        path: resolve("../dist"), //webpack命令的输出目录
        filename:"js/[name].[hash].js",
        publicPath:'/'// 打包后的资源的访问路径前缀（webpack-dev-server命令的输出目录）
    },
    resolve:{
        extensions:['.js','.json','.jsx'],  // 解析扩展。当我们通过路径引入文件时，找不到该文件时会通过加上该参数设置的后缀继续查找
        alias:{
            "@": resolve('../src') // 在项目中使用@符号代表src路径
        }
    },
    plugins:[
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin({
            patterns:[
            { 
                from: resolve('../static'),
                to:resolve('../dist/static')
            }
        ]})
    ],
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                // use:{
                //     loader:'babel-loader',
                //     options:{
                //         babelrc:true
                //     }
                // }
                loader:"babel-loader"
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true, // 支持热更新
                            reloadAll:true
                        }
                    },
                    // {
                    //     loader:'style-loader', // 这个会创建一个<style></style>标签  
                    // },
                    {
                        loader:'css-loader'  // 转换css 
                    }
                ]
            },
            {
                test: /\.less$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true,
                            reloadAll:true
                        }
                    },
                    // {
                    //     loader:'style-loader'
                    // },
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
    // optimization: {
    //     // 压缩css
    //     minimizer: [
    //         new OptimizeCSSAssetsPlugin({ //只在生产环境下压缩有效
    //             cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
    //         }),
    //         new UnlifyJsPlugin({ //只在生产环境下压缩有效
    //             parallel:false,
    //             sourceMap:false,
    //             uglifyOptions:{
    //                 warnings: false,
    //                 compress:{
    //                     unused:true,
    //                     drop_debugger:true,
    //                     drop_console:true,
    //                 },
    //                 output:{
    //                     comments:false
    //                 }
    //             }
    //         })
    //     ]
    // }
}