https://www.jianshu.com/p/04e436cf75ba


# webpack和webpack-dev-server的区别 

webpack 是一个模块打包器，根据entry中指定的入口，查找所有的依赖，然后处理完所有的依赖之后 会输出到output字段中的path指定的路径中去

webpack-dev-server 一个服务器插件，相当于webpack+Apache，启动一个web服务并实时的更新修改，启动webpack-dev-server 之后，在目标文件夹中是看不到编译后的文件的，实时编译的文件都放到内存当中，

## 两者的区别
  webpack不会实时的更新修改，就是一个打包工具，webpack-dev-server 会实时自动更新修改

  webpack打包输出路径，output对象中的path；webpack-dev-server 打包输出路径，output中的publicpath（默认为根路径）

  webpack打包输出的文件，是真的存在于物理地址path中的，而webpack-dev-server 打包输出的文件是保存在内存当中的，在项目的目录中是找不到的

  ## webpack-dev-server 相比于webpack的优势

    尽管webpack提供了命令 webpack --watch 来动态监听文件的改变并实时打包，但是
      1. 文件多了打包速度会变慢
      2. 且这样的打包方式不能做到hot replace 即每次webpack编译之后，还需要手动更新浏览器


    webpack-dev-server 克服了webpack的以上两个问题，webpack-dev-server主要是启动一个服务器，他的作用主要是用来服务资源文件，此外这个http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会实时编译，然后保存到内存中 同时通知浏览器刷新

    

# babel的配置流程

 ## 安装babel （babel 7.X）
  npm install -D @babel/core @babel/preset-env @babel/preset-react 
  npm install -D @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2

  @babel/core  babel的核心库

  @babel/preset-env  把es6,es7语法转换成es5，babel7以上的版本只用这一个预设包就可以实现语法的转换了，已经废弃了preset-stage-0,perset-stage-1,perset-stage-2等这些包了，但是这个包还不能转换es6，es7的一些新特性例如Array.includes()，这就需要我们使用@babel/plugin-reansform-runtime了
     默认情况下 preset-env只会转换语法，如果要转换内置对象或者实例方法的话，需要使用polyfill来转换 
     使用useBuiltlns属性来控制@babel/preset-env使用何种的方式帮我们导入polyfill的核心，有三个值可选（entry,usage,false）
     1. entry : 是一种入口导入方法，只要我们在打包配置入口，或者 文件入口写入 import “core-js”这样的一串代码，babel就会跟据我们配置的目标浏览器配置来引入所需要的polyfill(也就是说不管你用不用得到，只要浏览器不支持的都要引入)
     ``` javascript
      import "core-js"
      function test(){
        new Promise()
      }
      test()
      const arr = [1,3,4,5].map(item=>item*item)
     ```
    2. usage：会参考目标浏览器（browserslit）和代码中使用到的特性来按需加入polyfill
              使用该参数的话还需要传一个corejs的版本号
              core-js支持两个版本 2/3 ,很多新特性已经不会加到2里面了，比如：flat等等最新的方法，2版本里面没有，推荐使用3
    3. false: 不引入polyfill

  @babel/preset-react  把react语法转换成es5
  
  @babel/plugin-transform-runtime 支持一些es6，es7的新语法  把每个文件中的使用preset-env转换成的helper函数 --> 转换成使用babel-runtime中的helper函数，减少包体积
  
  @babel/runtime  这个包是 在进行es6转换成es5的时候会生成很多helper函数，这些函数每一个文件转换都会重复生成，这个包里面会包含这些helper函数，这样每个文件中引入helper函数的时候就直接引用这个包里面的文件了，减少了每个文件的包体积
   

  @babel-runtime 和 @babel/plugin-tranform-runtime 两个是什么关系
  @babel-runtime是一个核心，一种helper function的实现方式，而@babel/plugin-tranform-runtime 像是一个管家，负责更好的重复使用@babel-runtime 
  
  参考链接： https://segmentfault.com/a/1190000021188054

 ## 安装babel-loader 

    安装，然后modules里面的rule中 添加 js 使用babel-loader 

# css-loader style-loader 有啥区别？
  
  css-loader是为了处理import require @import url 这样的引入 

  style-loader 是动态创建一个style 标签，然后把样式塞进去 添加到页面中的
  
  执行顺序：如果loader选项是一个数组 那执行顺序是从右向左的  loader：['style-loader','css-loader']
          配置多个loader的话 是从下到上的执行顺序的
# webpack 的loader执行顺序 从右向左 从下向上 为什么？
函数式编程中有一种模式是通过组合多个函数的功能来实现一个组合函数。一般支持函数式编程的工具库都实现了这种模式，这种模式一般被称作compose与pipe。

compose是从右向左执行
const fun1 = compose(f,g,h) 

fun1(args) ---> f(g(h(args)))

pipe是从左向右执行
const fun2 = pipe(f,g,h)

fun2(args) ---> h(g(f(args)))

  webpack使用的compose模式 

# mobx 


# 在项目中配置对装饰器的支持



# webpack.dev.config.js 中 devserver 中添加proxy选项 设置代理


# react-loadable 插件的使用 -- 路由懒加载

# 提取css文件 
  webpack3中一般使用extract-text-webpack-plugin
  webpack4中一般使用mini-css-extract-plugin 
  相比来说优势：
  1. 异步加载
  2. 不重复编译，性能更好
  3. 更容易使用
  4. 只针对CSS

# webpack4中拆包
 webpack3中拆包使用 common-chunk-plugin拆包 具体用法参考百度
 webpack4中通过设置splitChunks参数
 splitChunks默认参数：(是在optimization中的一个property)
 ``` javascript
  splitChunks: {
    // async表示只从异步加载得模块（动态加载import()）里面进行拆分(会拆分出通过懒加载等方式异步加载的模块)
    // initial表示只从入口模块进行拆分（入口文件会包含node_modules中的react-dom等包,但是在blog.js中异步加载的marterial等插件就没有拆分出来 和业务代码打包成了一个包）
    // all表示以上两者都包括
    chunks: "async",
    minSize: 30000,   // 大于30k会被webpack进行拆包
    minChunks: 1,     // 被引用次数大于等于这个次数进行拆分
    // import()文件本身算一个
    // 只计算js，不算css
    // 如果同时有两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
    maxAsyncRequests: 5,  // 最大的按需加载（异步）请求次数
    // 最大的初始化加载请求次数,为了对请求数做限制，不至于拆分出来过多模块
    // 入口文件算一个
    // 如果这个模块有异步加载的不算
    // 只算js，不算css
    // 通过runtimeChunk拆分出来的runtime不算在内
    // 如果同时又两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
    maxInitialRequests: 3,
    automaticNameDelimiter: '~', // 打包分隔符
    name:true,
    cacheGroups: {
        // 默认的配置
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        // 默认的配置，vendors规则不命中的话，就会命中这里
        default: {
            minChunks: 2, // 引用超过两次的模块 -> default
            priority: -20,
            reuseExistingChunk: true
        },
    },
  }

 ```

 ## 项目中设置全局变量 可以通过 new Webpack.DefinePlugin({})来设置

 
