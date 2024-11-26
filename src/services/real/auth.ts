import auth from "@/api/auth"
import { set } from "@/hooks/use-local-storage";
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
    set("accessToken", null);
    set("user", null);
}

export const checkUsernameAvailable = async (username: string) => {
    return await auth.checkUsernameExist({ username });
}
