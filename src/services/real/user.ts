import userAPI from "@/api/user";

export const getUserByUsername = async (params: { username: string }) => {
    const result = await userAPI.getUserByUsername(params);
    return {
        success: result.success,
        message: result.message,
        user: result.data,
    }
};
