import axios from 'axios'
import { useCookieMenager } from '../hooks/use-cookie'

export const BASE_URL = 'https://www.test-store.shop/'
export const COOKIE_TOKEN_NAME = 'token'

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const { getToken } = useCookieMenager()
    const accessToken = getToken()

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
