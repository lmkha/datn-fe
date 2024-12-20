import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Axios request!");
        const language = localStorage.getItem("language") || "vi";
        config.headers["Accept-Language"] = language;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        console.log("Axios error!");
        return Promise.reject(error);
    }
);

export default axiosInstance;
