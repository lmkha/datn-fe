import auth from "@/api/auth"
import { set } from "@/hooks/use-local-storage";

export const login = async ({ username, password }: { username: string, password: string }) => {
    const result = await auth.login({ username, password });
    if (result.success) {
        set("accessToken", result.token);
        console.log('Login success!', result.token);
    }
}

export const checkUsernameAvailable = async (username: string) => {
    return await auth.checkUsernameExist({ username });
}
