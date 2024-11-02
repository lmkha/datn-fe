import Base from "./base";

class Auth extends Base {
    async login({ username, password }: { username: string, password: string }) {
        try {
            const response = await this.post("/auth/signIn", {
                username: username,
                password: password,
            });
            return {
                success: true,
                token: response.token,
            };
        } catch (err: any) {
            return {
                success: false,
                // message: err.response.data.message,
            }
        }
    }

    async registerUser({ username, password, email, phone, dateOfBirth }: {
        username: string,
        password: string,
        email: string,
        phone: string,
        dateOfBirth: string,
    }) {
        try {
            const response = await this.post("/auth/signUp", {
                username: username,
                password: password,
                email: email,
                phone: phone,
                isPrivate: false,
                dateOfBirth: dateOfBirth,
            });
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

    async checkUsernameExist({ username }: { username: string }) {
        try {
            const response = await this.get('/auth/checkUsernameAvailability/', {
                username: username,
            });
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

    async checkEmailExist({ email }: { email: string }) {
        try {
            const response = await this.get('/auth/checkEmailAvailability', {
                email: email,
            });
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
