import axiosInstance from "@/core/axios/instance";

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

class Base {
    async execute(options: { method: HttpMethod; url: string; data?: any; params?: any; config?: any }) {
        try {
            const response = await axiosInstance({
                method: options.method,
                url: options.url,
                data: options.data,
                params: options.params,
                ...options.config,
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async get(url: string, params?: any, config?: any) {
        return this.execute({ method: 'get', url, params, config });
    }

    async post(url: string, data: any, config?: any) {
        return this.execute({ method: 'post', url, data, config });
    }

    async put(url: string, data: any, config?: any) {
        return this.execute({ method: 'put', url, data, config });
    }

    async delete(url: string, data?: any, config?: any) {
        return this.execute({ method: 'delete', url, data, config });
    }

    async patch(url: string, data: any, config?: any) {
        return this.execute({ method: 'patch', url, data, config });
    }
}

export default Base;
