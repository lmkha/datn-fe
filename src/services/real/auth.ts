import auth from "@/api/auth"
import { set, remove } from "@/hooks/use-local-storage";
import { getCurrentUser } from "./user";

export const login = async ({ username, password }: { username: string, password: string }) => {
    const result = await auth.login({ username, password });
    if (result.success) {
        set("accessToken", result.token);
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
    remove('accessToken');
    remove('user');
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
        username: string,
        email: string,
        password: string,
    },
    otpCode: string,
}) => {
    return auth.resetPasswordVerification(data);
}
