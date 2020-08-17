const { merge } = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config.js")
const {resolve} = require("./utils.js")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(webpackBaseConfig,{
    mode:"production",
    plugins:[
        new HtmlWebpackPlugin({
            filename:resolve("../dist/main.html"),
            template:"index.html",
            inject:true,
            hash:true,
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        })
    ]
})