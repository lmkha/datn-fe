import axiosInstance from "@/core/axios/axios-instance";

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

class Base {
    async execute(options: { method: HttpMethod; url: string; data?: any; params?: any }) {
        try {
            const response = await axiosInstance({
                method: options.method,
                url: options.url,
                data: options.data,
                params: options.params,
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async get(url: string, params?: any) {
        return this.execute({ method: 'get', url, params });
    }

    async post(url: string, data: any) {
        return this.execute({ method: 'post', url, data });
    }

    async put(url: string, data: any) {
        return this.execute({ method: 'put', url, data });
    }

    async delete(url: string, data: any) {
        return this.execute({ method: 'delete', url });
    }
}

export default Base;
