import { SignUpPageState } from "@/app/(auth)/signup/page";
import { doPasswordsMatch, isValidEmail, isValidPassword, isValidUsername } from "@/core/logic/validate";

export interface SignUpPageErrorField {
    field: 'email' | 'fullName' | 'username' | 'password' | 'confirmPassword';
    message: string;
}

export async function validateSignUpForm(state: SignUpPageState): Promise<SignUpPageErrorField[]> {
    const errors: SignUpPageErrorField[] = [];

    if (!state.fullName) {
        errors.push({ field: 'fullName', message: 'Full name is required' });
    }

    await isValidEmail(state.email, false).then((error) => {
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
