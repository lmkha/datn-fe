import axiosInstance from "@/configs/axios-instance";
import { AxiosRequestConfig } from "axios";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface RequestOptions {
    url: string;
    method?: HttpMethod;
    data?: any;
    params?: any;
    config?: AxiosRequestConfig;
    authRequired?: boolean;
}

class Base {
    private async execute(options: RequestOptions) {
        const { method = "get", url, data, params, config = {}, authRequired = true } = options;

        if (!url || url.trim() === "") {
            return null;
        }

        try {
            const updatedConfig: AxiosRequestConfig = { ...config };
            if (authRequired) {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    const sanitizedToken = accessToken.replace(/^"+|"+$/g, "");
                    updatedConfig.headers = {
                        ...updatedConfig.headers,
                        Authorization: `Bearer ${sanitizedToken}`,
                    };
                }
            }

            const response = await axiosInstance({
                method,
                url,
                data,
                params,
                ...updatedConfig,
            });

            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async put(options: Omit<RequestOptions, "method">) {
        return this.execute({ ...options, method: "put" });
    }

    async get(options: Omit<RequestOptions, "method" | "data">) {
        return this.execute({ ...options, method: "get" });
    }

    async post(options: Omit<RequestOptions, "method">) {
        return this.execute({ ...options, method: "post" });
    }

    async delete(options: Omit<RequestOptions, "method">) {
        return this.execute({ ...options, method: "delete" });
    }

    async patch(options: Omit<RequestOptions, "method">) {
        return this.execute({ ...options, method: "patch" });
    }
}

export default Base;
