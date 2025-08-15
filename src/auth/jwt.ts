// src/auth/jwt.ts
import type { $Enums } from "@prisma/client";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const alg = "HS256";
const key = (s: string) => new TextEncoder().encode(s);

export interface AccessPayload extends JWTPayload {
    sub: string;
    role?: $Enums.UserType;
    ver?: number;
}

export async function signAccessToken(
    payload: Omit<AccessPayload, "exp" | "iat" | "nbf">,
    secret: string,
    exp = "10m",
) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(key(secret));
}

export async function signRefreshToken(
    payload: Pick<AccessPayload, "sub" | "ver"> & { jti: string },
    secret: string,
    exp = "30d",
) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(key(secret));
}

export async function verifyToken<T extends JWTPayload>(
    token: string,
    secret: string,
) {
    const { payload } = await jwtVerify(token, key(secret), {
        algorithms: [alg],
    });
    return payload as T;
}
