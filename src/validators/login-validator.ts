import { LoginFormState } from "@/app/(auth)/login/components/login-form";

export interface LoginFormErrorField {
    field: 'username' | 'password';
    message: string;
}

async function isValidUsername(username: string): Promise<string | null> {
    const usernameRegex = /^(?!_)[a-zA-Z0-9_]{3,30}(?<!_)$/;
    if (!usernameRegex.test(username)) {
        return 'Invalid username';
    }
    return null;
}

async function isValidPassword(password: string): Promise<string | null> {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return 'Invalid password';
    }
    return null;
}


export async function validateLoginForm(state: LoginFormState): Promise<LoginFormErrorField[]> {
    const errors: LoginFormErrorField[] = [];

    await isValidUsername(state.username).then((error) => {
        if (error) {
            errors.push({ field: 'username', message: error });
        }
    });

    await isValidPassword(state.password).then((error) => {
        if (error) {
            errors.push({ field: 'password', message: error });
        }
    });

    return Promise.resolve(errors);
}
