import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react";


const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'https://assetverse-server-xi.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth(); 

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use((config) => {

            const token = localStorage.getItem('access-token')

            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            console.log('JWT token',token);
            return config
        })

        const responseInterceptor = instance.interceptors.response.use(res => {
            return res
        }, err => {
            const status = err.response?.status
            if (status === 401 || status === 403) {
                signOutUser()
                    .then(() => {
                        navigate('/login')
                    })
            }
            return Promise.reject(err)
        })
        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    }, [signOutUser, navigate])

    return instance;
};

export default useAxiosSecure;