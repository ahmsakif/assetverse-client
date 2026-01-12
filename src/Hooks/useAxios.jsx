import axios from "axios"

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'https://assetverse-server-xi.vercel.app'
})

const useAxios = () => {
    return axiosInstance
}

export default useAxios

// 'http://localhost:3000'
// 'https://better-tomorrow-server.vercel.app'