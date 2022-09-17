import axios from 'axios'
import baseURLConfig from './config-baseURL'

console.log(baseURLConfig)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
//配置完 baseURL 后面写相关的URL就只需要写后缀，也方便后面如果需要修改地址
//mock.config.js里识别是生产还是开发环境
axios.defaults.withCredentials = true
//是否使用跨域请求

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
        //对服务器发回的数据进行验证，不符合直接catch
      }
    }


    if (type.toLowerCase() === 'get') {
      option.parmas = data
    } else {
      option.data = data
    }


    axios(option).then(response => {  //res是后端返回的数据
      if (response.status === 200) {
        resolve(response.data)   //就可以直接拿到res.data供其他地方调用了request().then去用
      } else {
        console.log(response.data);
        reject(response.data)
      }


      // 当使用 then 时，您将接收如下响应:
      // axios.get('/user/12345')
      //   .then(function (response) {
      //     console.log(response.data);
      //     console.log(response.status);
      //     console.log(response.statusText);
      //     console.log(response.headers);
      //     console.log(response.config);
      //   });


    }).catch(err => {
      console.log({msg: '网络异常'})
      reject({msg: '网络异常'})
    })
  })
}


// request('/auth/login','POST',{username:'hunger',password:'123456'})
//   .then(
//     data => {
//       console.log(data);
//     }
//   )
