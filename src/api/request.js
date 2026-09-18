import axios from 'axios'
import { Message, Loading } from 'element-ui'

let loading
// 创建aixos实例
const instance = axios.create({
  // 请求地址前缀
  //baseURL: !process.env.VUE_APP_MOCK ? '/api' : '',
  //baseURL: '/ierp',
  baseURL: process.env.VUE_APP_BASE_API_PREFIX,
  // 超时时间
  // timeout: 5 * 1000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 对配置实例进行设置并返回
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  },
  error => {
    // 请求失败
    Message.error('数据请求失败')
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    loading.close()
    let data = response.data
    // 对响应的结果进行处理
    if (data && data.code && parseInt(data.code) !== 200) {
      Message({
        message: data.message || 'Error',
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(data.message || 'Error'))
    }
    return data
  },
  error => {
    // 超出 2xx 范围的响应状态码都会触发该函数
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default instance