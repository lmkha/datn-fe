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

    async unFollowUser(params: { username: string }) {
        try {
            const response = await this.post(`/users/${params.username}/unfollow`, {});
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "UnFollow user failed",
            }
        }
    }

    async uploadProfileImage(data: { img: File }) {
        try {
            const formData = new FormData();
            formData.append("img", data.img);
            const response = await this.post("/users/profilePic", formData);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Upload profile image failed",
            }
        }
    }

    async getCurrentUser() {
        try {
            const response = await this.get("/users/");
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get current user failed",
            }
        }
    };

    async getPublicUserByUsername(params: { username: string }) {
        try {
            const response = await this.get(`/users/${params.username}/public-username`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get public user by username failed",
            }
        }
    }

    async getPublicUserId(params: { userId: string }) {
        try {
            const response = await this.get(`/users/${params.userId}/public-id`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get public user by userId failed",
            }
        }
    }

    async getAllFollowing() {
        try {
            const response = await this.get(`/users/followings`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get all following failed",
            }
        }
    }

    async searchUserByUsername(params: { username: string }) {
        const requestParams = {
            pattern: params.username,
        }
        try {
            const response = await this.get('/users/search', requestParams);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Search by username failed",
            }
        }
    }

    async updateProfile(data: {
        phone: string;
        fullName: string;
        isPrivate: boolean;
        dateOfBirth: string;
    }) {
        try {
            const response = await this.put('/users/', data);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Update profile failed",
            }
        }
    }
}

const userAPI = new User();
export default userAPI;
