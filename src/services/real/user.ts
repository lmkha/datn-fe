import userAPI from "@/api/user";
import { get } from "@/hooks/use-local-storage";

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
    const accessToken = get('accessToken');
    if (!accessToken) {
        return {
            success: false,
            message: "You need to login to follow user",
        }
    }

    return await userAPI.followUser(params);
};

export const unFollowUser = async (params: { username: string }) => {
    const accessToken = get('accessToken');
    if (!accessToken) {
        return {
            success: false,
            message: "You need to login to unfollow user",
        }
    }
    return await userAPI.unFollowUser(params);
};

export const searchUserByUsername = async (params: { username: string }) => {
    return await userAPI.searchUserByUsername(params);
}

export const uploadAvatar = async (avatar: File) => {
    return await userAPI.uploadProfileImage({ img: avatar });
};

export const updateProfile = async (data: {
    phone: string;
    fullName: string;
    isPrivate: boolean;
    dateOfBirth: string;
    avatar?: File | null;
}) => {
    const result = await userAPI.updateProfile({
        phone: data.phone,
        fullName: data.fullName,
        isPrivate: data.isPrivate,
        dateOfBirth: data.dateOfBirth
    });

    if (!result.success) {
        return {
            success: false,
            message: result.message,
        }
    }

    if (data.avatar) {
        const uploadResult = await uploadAvatar(data.avatar);
        if (!uploadResult.success) {
            return {
                success: false,
                message: uploadResult.message,
            }
        }
    }

    return {
        success: true,
        message: "Update profile successfully",
    }
}

export const isFollowing = async (params: { username: string }) => {
    const result = await userAPI.isFollowing(params);
    return {
        success: result.success,
        message: result.message,
        isFollowing: result.message === "Followed",
    }
};
