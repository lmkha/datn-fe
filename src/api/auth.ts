import Base from "./base";

class Auth extends Base {
    async login(data: { username: string, password: string }) {
        const result = await this.post<string>({
            url: "/auth/signIn",
            data: data,
            authRequired: false,
        })
        return result.data
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
        const result = await this.post({
            url: "/auth/register",
            data: data,
            authRequired: false
        })
        return result.data
    }

    async checkUsernameExist(params: { username: string }) {
        const result = await this.get<{ isExisted: boolean }>({
            url: "/users/checkUsernameAvailability",
            params: params,
            authRequired: false,
        })
        return result.data;
    }

    async checkEmailExist(params: { email: string }) {
        const result = await this.get<{ isExisted: boolean }>({
            url: '/users/checkEmailAvailability',
            params: params,
            authRequired: false,
        })
        return result.data
    }

    async resetPassword(data: { email: string }) {
        const result = await this.post({
            url: '/auth/reset-password',
            params: data,
            authRequired: false,
        })
        return result.data
    }

    async resetPasswordVerification(data: {
        user: {
            email: string,
            password: string,
        },
        otpCode: string,
    }) {
        const result = await this.post({
            url: '/auth/reset-password-verification',
            data: data,
            authRequired: false,
        })
        return result.data
    }

    async verifyAccount(data: { username: string, otpCode: string }) {
        const requestData = {
            user: {
                username: data.username,
            },
            otpCode: data.otpCode,
        }

        const result = await this.post({
            url: 'auth/account-otp-verification',
            data: requestData,
            authRequired: false
        })

        return result.data
    }
}

const auth = new Auth();
export default auth;
