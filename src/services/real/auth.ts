import auth from "@/api/auth"
import { set, remove, setAccessToken } from "@/hooks/use-local-storage";
import { getCurrentUser } from "./user";
import Cookies from "js-cookie";

export const login = async ({ username, password }: { username: string, password: string }) => {
    const result = await auth.login({ username, password });
    if (result.success) {
        setAccessToken(result.token);

        Cookies.set("accessToken", result.token, {
            expires: 7,
            secure: false,
            sameSite: "lax",
            path: "/",
        });

        await getCurrentUser().then((result) => {
            if (result.success && result.data) {
                set("user", result.data);
            }
        });
    }
    return {
        success: result.success,
        message: result.message
    }
}

export const logout = () => {
    Cookies.remove("accessToken", { path: "/" });
    remove('accessToken');
    remove('user');
    remove("searchQuery");
}

export const isUsernameTaken = async (username: string) => {
    return (await auth.checkUsernameExist({ username })).success;
}

export const isEmailTaken = async (email: string) => {
    return (await auth.checkEmailExist({ email })).success;
}

export const createAccount = async (data: { fullName: string, email: string, username: string, password: string }) => {
    const result = await auth.registerUser({
        ...data,
        phone: "",
        dateOfBirth: "",
        isPrivate: false
    });
    return {
        success: result.success,
        message: result.message
    }
};

export const verifyAccount = async (data: { username: string, otpCode: string }) => {
    const result = await auth.verifyAccount(data);
    return {
        success: result.success,
        message: result.message
    }
};

export const resetPassword = async (data: { email: string }) => {
    return auth.resetPassword(data);
}

export const verifyResetPassword = async (data: {
    user: {
        email: string,
        password: string,
    },
    otpCode: string,
}) => {
    return auth.resetPasswordVerification(data);
}
