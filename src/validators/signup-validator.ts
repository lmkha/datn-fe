import { SignUpPageState } from "@/app/(auth)/signup/page";
import { isEmailTaken, isUsernameTaken } from "@/services/real/auth";

export interface SignUpPageErrorField {
    field: 'email' | 'fullName' | 'username' | 'password' | 'confirmPassword';
    message: string;
}

async function isValidEmail(email: string): Promise<string | null> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email is not valid';
    }
    const isTaken = await isEmailTaken(email);
    if (isTaken) {
        return 'Email is already taken';
    }
    return null;
}

async function isValidUsername(username: string): Promise<string | null> {
    const usernameRegex = /^(?!_)[a-zA-Z0-9_]{3,30}(?<!_)$/;
    if (!usernameRegex.test(username)) {
        return 'Invalid username';
    }
    const isTaken = await isUsernameTaken(username);
    if (isTaken) {
        return 'Username is already taken';
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

async function doPasswordsMatch(password: string, confirmPassword: string): Promise<string | null> {
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return null;
}

export async function validateSignUpForm(state: SignUpPageState): Promise<SignUpPageErrorField[]> {
    const errors: SignUpPageErrorField[] = [];

    if (!state.fullName) {
        errors.push({ field: 'fullName', message: 'Full name is required' });
    }

    await isValidEmail(state.email).then((error) => {
        if (error) {
            errors.push({ field: 'email', message: error });
        }
    });

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

    await doPasswordsMatch(state.password, state.confirmPassword).then((error) => {
        if (error) {
            errors.push({ field: 'confirmPassword', message: error });
        }
    });

    return Promise.resolve(errors);
}
