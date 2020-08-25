const { merge } = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config.js")
const {resolve, chunks} = require("./utils.js")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 在打包之前会删除之前的打包目录
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
// 在打包结束之后会启动一个服务在浏览器查看打包的大小以及打包出来的文件中包含的内容
const BundleAnalyzerPlugin  = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
// 压缩css 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')


module.exports = merge(webpackBaseConfig,{
    mode:"production",
    plugins:[
        new HtmlWebpackPlugin({
            filename:resolve("../docs/detail/index.html"),
            template:"index.html",
            inject:true,
            hash:true, // 给每一个script标签中的js文件加一个随机数防止cdn缓存造成js文件不更新 bundle.js?22b9692e22e7be37b57e
            favicon:resolve('../public/favicon.ico'),
            // html压缩选项 
            minify:{
                removeComments:true, // 去注释
                collapseWhitespace:true, // 去空格
                removeAttributeQuotes:true, // 去除属性的引号 
            },
            chunks:['detail']
        }),
        new HtmlWebpackPlugin({
            filename:resolve("../docs/index/index.html"),
            template:"index.html",
            inject:true,
            hash:true, // 给每一个script标签中的js文件加一个随机数防止cdn缓存造成js文件不更新 bundle.js?22b9692e22e7be37b57e
            favicon:resolve('../public/favicon.ico'),
            // html压缩选项 
            minify:{
                removeComments:true, // 去注释
                collapseWhitespace:true, // 去空格
                removeAttributeQuotes:true, // 去除属性的引号 
            },
            chunks:['index']
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    optimization:{
        //压缩css
        minimizer:[
            new OptimizeCssAssetsWebpackPlugin({ // 只在生产环境中压缩有效
                cssProcessorOptions:{
                    discardComments:{removeAll:true} //移除注释
                }
            }),
            new UglifyjsWebpackPlugin({//也是只有在生产环境下生效
                parallel:true, // 使用多进程并行来提高构建速度
                sourceMap:true, // 没生效吧？？
                uglifyOptions:{
                    warnings:false,
                    compress:{
                        unused:true,
                        drop_debugger:true,
                        drop_console:true
                    },
                    output:{
                        comments:false,// 去掉注释
                    }
                }
            })
        ],
        splitChunks:{
            chunks: "all"
        }
    },
    
})