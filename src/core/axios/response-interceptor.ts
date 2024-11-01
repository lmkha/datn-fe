export const responseInterceptor = (response: any) => {
    return response;
};

export const responseErrorInterceptor = (error: any) => {
    console.log('Axios error!');
    const { response } = error;
    return Promise.reject(error);
};
