import { get } from '@/hooks/use-local-storage';

export const requestInterceptor = (config: any) => {
    console.log('Axios request!');
    const accessToken = get('accessToken');
    const language = localStorage.getItem('language') || 'vi';
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Accept-Language'] = language;
    return config;
};

export const requestErrorInterceptor = (error: any) => {
    return Promise.reject(error);
};
