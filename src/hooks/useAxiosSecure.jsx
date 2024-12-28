import axios from 'axios'
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.error('Interceptor Error:', error);

                // Handle cases where error.response is undefined
                if (!error.response) {
                    console.error('No response from server:', error.message);
                    return Promise.reject(error);
                }

                const { status } = error.response;

                if (status === 401 || status === 403) {
                    // logout
                    await logOut()
                    // navigate to login
                    navigate('/login')
                }
            }
        )
    }, [logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;