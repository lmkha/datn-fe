import jwt, { JwtPayload } from 'jsonwebtoken';

export const decodeJWT = (token: string): JwtPayload | string | null => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
