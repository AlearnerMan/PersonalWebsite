import React from "react"
import ReactDOM from 'react-dom';

import logImg from "@/assets/img/logo192.png"
import "./index.less"

import Blog from "./blog/Blog.js"
console.log(12323)
var array1 = [1,2,3]

console.log(array1.includes(2))


ReactDOM.render(
    <Blog/>,
    document.getElementById("root")
)