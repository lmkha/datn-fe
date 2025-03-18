import Base from "./base";

class User extends Base {
    async getUserByUsername(params: { username: string }) {
        const response = await this.get<any>({ url: `/users/${params.username}` });
        return response.data
    }

    async followUser(params: { username: string }) {
        const response = await this.post({ url: `/users/${params.username}/follow` });
        return response.data
    }

    async unFollowUser(params: { username: string }) {
        const response = await this.post({ url: `/users/${params.username}/unfollow` });
        return response.data;
    }

    async uploadProfileImage(data: { img: File }) {
        const formData = new FormData();
        formData.append("img", data.img);
        const response = await this.post<any>({
            url: "/users/profilePic",
            data: formData
        });
        return response.data;
    }

    async getCurrentUser() {
        const response = await this.get<any>({ url: "/users/" });
        return response.data;
    };

    async getPublicUserByUsername(params: { username: string }) {
        const response = await this.get<any>({
            url: `/users/${params.username}/public-username`,
            authRequired: false
        });
        return response.data;
    }

    async getPublicUserId(params: { userId: string }) {
        const response = await this.get<any>({
            url: `/users/${params.userId}/public-id`,
            authRequired: false
        });
        return response.data;
    }

    async getAllFollowing() {
        const response = await this.get<any>({ url: `/users/followings` });
        return response.data;
    }

    async getAllFollowers() {
        const response = await this.get<any>({ url: `/users/followers` });
        return response.data;
    }

    async searchUserByUsername(params: { username: string }) {
        const requestParams = {
            pattern: params.username,
        }
        const response = await this.get<any>({
            url: '/users/search',
            params: requestParams,
            authRequired: false,
        });

        return response.data;
    }

    async updateProfile(data: {
        phone: string;
        fullName: string;
        isPrivate: boolean;
        dateOfBirth: string;
    }) {
        const response = await this.put<any>({
            url: '/users/',
            data: data
        });
        return response.data;
    }

    async isFollowing(params: { username: string }) {
        const response = await this.get({ url: `/users/${params.username}/checkFollowing` });
        return response.data;
    }

    async isMyFollower(params: { username: string }) {
        const response = await this.get({ url: `/users/${params.username}/checkFollower` });
        return response.data;
    };
}

const userAPI = new User();
export default userAPI;
