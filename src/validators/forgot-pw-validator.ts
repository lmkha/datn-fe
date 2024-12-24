import { EnterNewPasswordStepState } from "@/app/(auth)/forgot-password/page";
import { doPasswordsMatch, isValidEmail, isValidOtpCode, isValidPassword, isValidUsername } from "@/core/logic/validate";

export interface ForgotPasswordErrorField {
    field: 'email' | 'newPassword' | 'confirmPassword' | 'otpCode';
    message: string;
}

export async function validateForgotPassword(state: EnterNewPasswordStepState): Promise<ForgotPasswordErrorField[]> {
    const errors: ForgotPasswordErrorField[] = [];

    await isValidEmail(state.email).then((error) => {
        if (error) {
            errors.push({ field: 'email', message: error });
        }
    });

    await isValidPassword(state.newPassword).then((error) => {
        if (error) {
            errors.push({ field: 'newPassword', message: error });
        }
    });

    await doPasswordsMatch(state.newPassword, state.confirmPassword).then((error) => {
        if (error) {
            errors.push({ field: 'confirmPassword', message: error });
        }
    });

    await isValidOtpCode(state.otpCode).then((error) => {
        if (error) {
            errors.push({ field: 'otpCode', message: error });
        }
    });
    return Promise.resolve(errors);
}
