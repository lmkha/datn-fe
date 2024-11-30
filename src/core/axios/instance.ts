import axios from "axios";
import { get } from "@/hooks/use-local-storage";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    withCredentials: true,
});

const noAuthRequiredApiEndpoints = [
    "/auth/signIn",
    "/auth/register",
    "/users/checkUsernameAvailability",
    '/users/checkEmailAvailability',
    '/auth/account-otp-verification',
];

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Axios request!");
        const accessToken = get("accessToken");
        const language = localStorage.getItem("language") || "vi";

        const isNoAuthRequired = noAuthRequiredApiEndpoints.some((endpoint) => {
            return config.url?.startsWith(endpoint);
        });
        if (!isNoAuthRequired && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

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
