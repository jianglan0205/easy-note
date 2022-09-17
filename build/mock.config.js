const fs = require('fs')
const path = require('path')

const mockBaseURL = 'https://note-server.hunger-valley.com'
  //本地测试地址
const realBaseURL = 'https://note-server.hunger-valley.com'
  //线上地址
exports.config = function ({isDev = true} = {isDev:true}){ //默认初始配置  isDev-是否是开发环境
  let fileTxt = `
  module.exports = {
    baseURL:'${isDev ? mockBaseURL : realBaseURL}'
  }
  `
  fs.writeFileSync(path.join(__dirname,'../src/helpers/config-baseURL.js'),fileTxt)
  //把上面的字符串写入对应文件
}
