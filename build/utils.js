const path = require("path")
const glob = require("glob")
const ModuleUrl = "../src/pages/*"

let chunksList = []
let entry = {}
 glob(path.resolve(__dirname,'../src/pages/*'),{},function(err,files){
     console.log(err,files)
 })

function  getModulesList() {
    let modulesList = glob.sync(path.resolve(__dirname,'../src/pages/*')) //[ '../src/pages/detail', '../src/pages/index' ]
    console.log('为啥会没有值呢？？',modulesList)
    for(let i = 0,len = modulesList.length; i<len;i++){
        let moduleName = modulesList[i].split('/').slice(-1).join()
        chunksList.push(moduleName)
        entry[moduleName] = path.resolve(__dirname,"../src/pages/"+moduleName+'/index.js')
    }
}
getModulesList()


module.exports = {
    resolve:function (dir) {
        return path.resolve(__dirname,dir)
    },
    entry:entry,
    chunks:chunksList
}