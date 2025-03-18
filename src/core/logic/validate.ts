import { isEmailTaken, isUsernameTaken } from "@/services/real/auth";

export async function isValidEmail(email?: string, expectToExist: boolean = true): Promise<string | null> {
    if (!email) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email is not valid';
    }
    const isTaken = await isEmailTaken(email);
    if (expectToExist && !isTaken) {
        return 'Email is not registered';
    }
    if (!expectToExist && isTaken) {
        return 'Email is already taken';
    }
    return null;
};

export async function isValidUsername(username?: string, expectToExist: boolean = true): Promise<string | null> {
    if (!username) {
        return 'Username is required';
    }
    const usernameRegex = /^(?!_)[a-zA-Z0-9_]{3,30}(?<!_)$/;
    if (!usernameRegex.test(username)) {
        return 'Invalid username';
    }
    const isTaken = await isUsernameTaken(username);
    if (!expectToExist && isTaken) {
        return 'Username is already taken';
    }
    if (expectToExist && !isTaken) {
        return 'Username does not exist';
    }
    return null;
}

export async function isValidPassword(password?: string): Promise<string | null> {
    if (!password) {
        return 'Password is required';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return 'Invalid password';
    }
    return null;
}

export async function doPasswordsMatch(password?: string, confirmPassword?: string): Promise<string | null> {
    if (!password) {
        return 'Password is required';
    }
    if (!confirmPassword) {
        return 'Confirm password is required';
    }
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return null;
}

export async function isValidOtpCode(otpCode?: string): Promise<string | null> {
    if (!otpCode) {
        return 'OTP code is required';
    }
    const otpCodeRegex = /^\d{6}$/;
    if (!otpCodeRegex.test(otpCode)) {
        return 'Invalid OTP code';
    }
    return null;
}
