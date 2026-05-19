// /lib/auth/jwt.ts
import jwt from "jsonwebtoken";
import { User } from "@/types/user";

const SECRET = process.env.JWT_SECRET || "dev-secret"; // use env in production

export function generateToken(payload: User) {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1d",
    });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return null;
    }
}
