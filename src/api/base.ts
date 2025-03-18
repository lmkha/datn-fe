import axiosInstance from "@/configs/axios-instance";
import { get } from "@/hooks/use-local-storage";
import { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface RequestOptions {
    url: string;
    method?: HttpMethod;
    data?: any;
    params?: any;
    config?: AxiosRequestConfig;
    authRequired?: boolean;
}

interface Response<T> {
    success: boolean;
    message: string;
    data?: T;
}

interface SuccessResponse<T> extends Response<T> {
    success: true;
    data: T;
}

interface ErrorResponse extends Response<undefined> {
    success: false;
}

interface CustomAxiosResponse<T> extends AxiosResponse {
    data: Response<T>;
}

class Base {
    private async execute<T>(options: RequestOptions): Promise<CustomAxiosResponse<T>> {
        const { method = "get", url, data, params, config = {}, authRequired = true } = options;

        try {
            const updatedConfig: AxiosRequestConfig = { ...config };
            if (authRequired) {
                const accessToken = await get("accessToken");
                if (accessToken) {
                    updatedConfig.headers = {
                        ...updatedConfig.headers,
                        Authorization: `Bearer ${accessToken}`,
                    };
                }
            }

            const response = await axiosInstance({ method, url, data, params, ...updatedConfig });

            return {
                ...response,
                data: {
                    success: true,
                    message: response?.data?.message || '',
                    data: response?.data?.data as T
                } as SuccessResponse<T>
            };
        } catch (err: any) {
            return {
                ...err.response,
                data: {
                    success: false,
                    message: err?.response?.data?.message || 'Something went wrong'
                } as ErrorResponse
            };
        }
    }

    async put<T>(options: Omit<RequestOptions, "method">): Promise<CustomAxiosResponse<T>> {
        return this.execute({ ...options, method: "put" });
    }

    async get<T>(options: Omit<RequestOptions, "method" | "data">): Promise<CustomAxiosResponse<T>> {
        return this.execute({ ...options, method: "get" });
    }

    async post<T>(options: Omit<RequestOptions, "method">): Promise<CustomAxiosResponse<T>> {
        return this.execute({ ...options, method: "post" });
    }

    async delete<T>(options: Omit<RequestOptions, "method">): Promise<CustomAxiosResponse<T>> {
        return this.execute({ ...options, method: "delete" });
    }

    async patch<T>(options: Omit<RequestOptions, "method">): Promise<CustomAxiosResponse<T>> {
        return this.execute({ ...options, method: "patch" });
    }
}

export default Base;
