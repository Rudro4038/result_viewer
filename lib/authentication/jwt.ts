// /lib/auth/jwt.ts
import jwt from "jsonwebtoken"; 

const SECRET = process.env.JWT_SECRET || "dev-secret"; // use env in production

export function generateToken(payload: {
  id: string;
  role: string;
}) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "1d",
  });
}