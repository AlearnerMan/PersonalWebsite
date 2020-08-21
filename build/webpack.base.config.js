
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
        path: resolve("../dist"),
        filename:"js/[name].[hash].js",
        publicPath:'/'// 打包后的资源的访问路径前缀
    },
    resolve:{
        extensions:['.js','.json','.jsx'],
        alias:{
            "@": resolve('../src')
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
                loader:"babel-loader"
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true,
                            reloadAll:true
                        }
                    },
                    // {
                    //     loader:'style-loader',
                    // },
                    {
                        loader:'css-loader'
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
    optimization: {
        // 压缩css
        minimizer: [
            new OptimizeCSSAssetsPlugin({ //只在生产环境下压缩有效
                cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            }),
            new UnlifyJsPlugin({ //只在生产环境下压缩有效
                parallel:false,
                sourceMap:false,
                uglifyOptions:{
                    warnings: false,
                    compress:{
                        unused:true,
                        drop_debugger:true,
                        drop_console:true,
                    },
                    output:{
                        comments:false
                    }
                }
            })
        ]
}
}