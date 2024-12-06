import axios from "axios";
import { get } from "@/hooks/use-local-storage";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    withCredentials: true,
});

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface NoAuthRequiredApiEndpoint {
    url: string;
    method: Method;
}

const noAuthRequiredApiEndpoints: NoAuthRequiredApiEndpoint[] = [
    { url: "/auth/signIn", method: "POST" },
    { url: "/auth/register", method: "POST" },
    { url: "/auth/account-otp-verification", method: "POST" },

    { url: "/users/checkUsernameAvailability", method: "GET" },
    { url: "/users/checkEmailAvailability", method: "GET" },
    { url: "/users/search", method: "GET" },

    { url: "/videos/user", method: "GET" },
    { url: "/videos", method: "GET" },
];

const isNoAuthRequiredEndpoint = (url?: string, method?: string): boolean => {
    return noAuthRequiredApiEndpoints.some((endpoint) => {
        if (url?.startsWith(endpoint.url) && method?.toUpperCase() === endpoint.method) {
            return true;
        }

        if (url?.startsWith("/users") && url?.endsWith("/public-username") && method?.toUpperCase() === "GET") {
            return true;
        }

        if (url?.startsWith("/users") && url?.endsWith("/public-id") && method?.toUpperCase() === "GET") {
            return true;
        }

        return false;
    });
};

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Axios request!");
        const accessToken = get("accessToken");
        const language = localStorage.getItem("language") || "vi";

        if (!isNoAuthRequiredEndpoint(config.url, config.method) && accessToken) {
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
