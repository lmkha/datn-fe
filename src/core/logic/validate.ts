import { isEmailTaken, isUsernameTaken } from "@/services/real/auth";

export async function isValidEmailForSignUp(email: string): Promise<string | null> {
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

export async function isValidEmail(email: string): Promise<string | null> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email is not valid';
    }
    const isTaken = await isEmailTaken(email);
    if (!isTaken) {
        return 'Email is not registered';
    }
    return null;
};

export async function isValidUsername(username: string): Promise<string | null> {
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

export async function isValidPassword(password: string): Promise<string | null> {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return 'Invalid password';
    }
    return null;
}

export async function doPasswordsMatch(password: string, confirmPassword: string): Promise<string | null> {
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return null;
}