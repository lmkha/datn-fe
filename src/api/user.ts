import Base from "./base";

class User extends Base {
    async getUserByUsername(params: { username: string }) {
        try {
            const response = await this.get(`/users/${params.username}`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get user by username failed",
            }
        }
    }

    async followUser(params: { username: string }) {
        try {
            const response = await this.post(`/users/${params.username}/follow`, {});
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Follow user failed",
            }
        }
    }
}

const userAPI = new User();
export default userAPI;
