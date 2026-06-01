// /lib/auth/jwt.ts
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User } from "@/types/user";

const SECRET = process.env.JWT_SECRET || "dev-secret"; // use env in production

export function generateToken(payload: User) {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1d",
    });
}

function isUserPayload(value: unknown): value is User {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        "role" in value
    );
}

export function verifyToken(token: string): User | null {
    try {
        const decoded = jwt.verify(token, SECRET);
        if (isUserPayload(decoded)) {
            return decoded;
        }
        return null;
    } catch {
        return null;
    }
}
