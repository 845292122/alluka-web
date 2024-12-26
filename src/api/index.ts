import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAtomValue } from 'jotai'
import { tokenAtom } from '~/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
  // timeout: 5000,
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = useAtomValue(tokenAtom)
    if (token) {
      request.headers['Authorization'] = token
    }

    return request
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code = 200, msg, data } = response.data

    // 文件对象直接返回
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data
    }

    /**
     * TODO: 异常处理 + 弹窗显示错误
     * 1. 401
     * 2. 403
     * 3. !== 200
     * 4. default(200)
     */
    if (code === 401) {
    } else if (code === 403) {
    } else if (code !== 200) {
    } else {
      return Promise.resolve(data)
    }
  },
  (error: AxiosError) => {
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    // TODO: 弹窗显示错误
    return Promise.reject(error)
  }
)

// TODO: 通用下载方法

export default service

/**
 * 导出api模块
 */
export * from './auth.api'
