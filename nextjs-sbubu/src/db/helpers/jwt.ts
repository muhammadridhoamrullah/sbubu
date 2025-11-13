import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY!;

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET as string, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET as string);
}
