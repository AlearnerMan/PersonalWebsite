const glob = require('glob')

console.log(glob.sync('../src/pages/*'))

function  getModulesList() {
    let modulesList = glob.sync('../src/pages/*') //[ '../src/pages/detail', '../src/pages/index' ]
    for(let i = 0,len = modulesList.length; i<len;i++){
        let moduleName = modulesList[i].split('/').slice(-1).join()

    }

}