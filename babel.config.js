module.exports = {
    "presets":[
        ["@babel/preset-env",{
            "modules":false,
            "targets":{
                "browsers":["> 1%","last 2 versions","not ie<=8"],
            }
        }],
        "@babel/preset-react"
    ],
    "plugins":[
        ["@babel/plugin-transform-runtime",{
            "corejs":3,  // polyfill 需要使用@babel/runtime-corejs2
            "useBUildIns":"usage" //按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
        }]
    ]
}