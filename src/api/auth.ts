import Base from "./base";

class Auth extends Base {
    async login(data: { username: string, password: string }) {
        try {
            const response = await this.post({
                url: "/auth/signIn",
                data: data,
                authRequired: false
            });
            return {
                success: true,
                token: response.token,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Login failed",
            }
        }
    }

    async registerUser(data: {
        fullName: string;
        email: string,
        username: string,
        password: string,
        phone: string,
        dateOfBirth: string,
        isPrivate: boolean,
    }) {
        try {
            const response = await this.post({
                url: "/auth/register",
                data: data,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Register failed",
            }
        }
    }

    async checkUsernameExist(params: { username: string }) {
        try {
            const response = await this.get({
                url: '/users/checkUsernameAvailability',
                params: params,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Check username failed",
            }
        }
    }

    async checkEmailExist(params: { email: string }) {
        try {
            const response = await this.get({
                url: '/users/checkEmailAvailability',
                params: params,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Check email failed",
            }
        }
    }

    async resetPassword(data: { email: string }) {
        try {
            const response = await this.post({
                url: `/auth/reset-password/?email=${data.email}`,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Reset password failed",
            }
        }
    }

    async resetPasswordVerification(data: {
        user: {
            username: string,
            email: string,
            password: string,
        },
        otpCode: string,
    }) {
        try {
            const response = await this.post({
                url: '/auth/reset-password-verification',
                data: data,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Reset password verification failed",
            }
        }
    }

    async verifyAccount(data: { username: string, otpCode: string }) {
        try {
            const requestData = {
                user: {
                    username: data.username,
                },
                otpCode: data.otpCode,
            }
            const response = await this.post({
                url: 'auth/account-otp-verification',
                data: requestData,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Verify account failed",
            }
        }
    }
}

const auth = new Auth();
export default auth;
