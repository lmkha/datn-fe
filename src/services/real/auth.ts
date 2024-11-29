import auth from "@/api/auth"
import { set, remove } from "@/hooks/use-local-storage";
import { getUserByUsername } from "./user";

export const login = async ({ username, password }: { username: string, password: string }) => {
    const result = await auth.login({ username, password });
    if (result.success) {
        set("accessToken", result.token);
        getUserByUsername({ username }).then((data) => {
            if (data.success && data.user) {
                set("user", data.user);
            }
        });
        return {
            success: true
        }
    }
    return {
        success: false,
        message: result.message
    }
}

export const logout = () => {
    remove('accessToken');
    remove('user');
}

export const checkUsernameAvailable = async (username: string) => {
    return await auth.checkUsernameExist({ username });
}
