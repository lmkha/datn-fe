import userAPI from "@/api/user";

export const getUserByUsername = async (params: { username: string }) => {
    const result = await userAPI.getUserByUsername(params);
    return {
        success: result.success,
        message: result.message,
        user: result.data,
    }
};

export const getCurrentUser = async () => {
    return await userAPI.getCurrentUser();
};

export const getAllFollowings = async () => {
    const result = await userAPI.getAllFollowing();

    const followingUsers = await Promise.all(
        result.data.map(async (username: string) => {
            const { user } = await getPublicUserByUsername({ username });
            return user;
        })
    );

    return {
        success: result.success,
        message: result.message,
        followingUsers: followingUsers,
    };
};

export const getPublicUserByUsername = async (params: { username: string }) => {
    const result = await userAPI.getPublicUserByUsername({ username: params.username });
    return {
        success: result.success,
        message: result.message,
        user: result.data,
    }
};

export const getPublicUserId = async (params: { userId: string }) => {
    const result = await userAPI.getPublicUserId(params);
    return {
        success: result.success,
        message: result.message,
        user: result.data,
    }
};

export const followUser = async (params: { username: string }) => {
    return await userAPI.followUser(params);
};

export const unFollowUser = async (params: { username: string }) => {
    return await userAPI.unFollowUser(params);
};

export const searchUserByUsername = async (params: { username: string }) => {
    return await userAPI.searchUserByUsername(params);
}
