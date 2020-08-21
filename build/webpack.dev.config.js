const { merge } = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config.js")
const { resolve } = require("./utils.js")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const BundleAnalyzerPlugin  = require("webpack-bundle-analyzer").BundleAnalyzerPlugin


module.exports = merge(webpackBaseConfig,{
    mode:"development",
    plugins:[
        new HtmlWebpackPlugin({
            filename:resolve("../dist/index.html"),
            template:"index.html",
            inject:true,
        }),
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    devServer:{
        historyApiFallback:true,
        hot:true,
        contentBase:false,
        compress:true,
        port:"8081",
        publicPath:"/",
        proxy:{}
    }
})