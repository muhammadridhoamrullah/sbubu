import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY!;

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET as string, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET as string) as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    } else {
      throw new Error("Token verification failed");
    }
  }
}
