import axios from 'axios';
import localStorageService from '../services/localStorageService'
import { notification } from 'antd'

const { getToken, removeToken } = localStorageService

axios.defaults.baseURL = "http://localhost:8000";
axios.interceptors.request.use(
    (config) => {
        if (config.url.includes('/login') || config.url.includes('/register')){
            return config
        }

        const token = getToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}` 
        }

        return config
    },
    (err) => {
        Promise.reject(err)
    }
)

axios.interceptors.response.use(
    res => {
        return res
    },
    err => {
        if (err.response?.status === 401) {
            removeToken()
            window.location.reload()
            notification.error({
                message: 'กรุณาเข้าสู่ระบบใหม่'
            })
            return Promise.reject(err)
        }

        return Promise.reject(err)
    }
)

export default axios;