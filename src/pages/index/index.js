import React from "react"
import ReactDOM from 'react-dom';

import logImg from "@/assets/img/logo192.png"
import "./index.less"
import "./app.less"
import LoadableComponent from "@/common/loadable"
// import Blog from "./blog/Blog.js"

console.log('APP_NODE'+ process.env.APP_NODE)
// const BlogPage = ()=>import("./blog/Blog.js")

const BlogPage = LoadableComponent(()=>import("./blog/Blog.js"))

console.log(SEVER_BASE_URL)
var array1 = [1,2,3]

console.log(array1.includes(2))


ReactDOM.render(
    <BlogPage/>,
    document.getElementById("root")
)