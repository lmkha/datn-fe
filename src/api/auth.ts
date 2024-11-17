import Base from "./base";

class Auth extends Base {
    async login(data: { username: string, password: string }) {
        try {
            const response = await this.post("/auth/signIn", data);
            return {
                success: true,
                token: response.token,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
            }
        }
    }

    async registerUser(data: {
        username: string,
        password: string,
        email: string,
        phone: string,
        dateOfBirth: string,
    }) {
        try {
            const response = await this.post("/auth/signUp", data);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
            }
        }
    }

    async checkUsernameExist(params: { username: string }) {
        try {
            const response = await this.get('/auth/checkUsernameAvailability/', params);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
            }
        }
    }

    async checkEmailExist(params: { email: string }) {
        try {
            const response = await this.get('/auth/checkEmailAvailability', params);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
            }
        }
    }
}

const auth = new Auth();
export default auth;
