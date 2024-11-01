// axios-instance.ts
import axios from 'axios';
import { requestErrorInterceptor, requestInterceptor } from './request-interceptor';
import { responseErrorInterceptor, responseInterceptor } from './response-interceptor';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000
});

axiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default axiosInstance;
