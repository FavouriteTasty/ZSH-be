// src/auth/middlewares.ts
import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

import { verifyToken, type AccessPayload } from "./jwt.js";

export type AppVariables = { user?: AccessPayload };

const pickBearer = (c: Context) => {
    const auth = c.req.header("Authorization") || "";
    const [scheme, token] = auth.split(" ");
    return scheme?.toLowerCase() === "bearer" ? token : undefined;
};

export const auth =
    () => async (c: Context<{ Variables: AppVariables }>, next: Next) => {
        const secret = process.env.JWT_SECRET as string;
        const token = pickBearer(c);
        if (!token)
            throw new HTTPException(401, {
                message: "Missing Authorization Bearer",
            });

        try {
            const payload = await verifyToken<AccessPayload>(token, secret);
            c.set("user", payload);
            await next();
        } catch {
            throw new HTTPException(401, {
                message: "Invalid or expired token",
            });
        }
    };

export const optionalAuth =
    () => async (c: Context<{ Variables: AppVariables }>, next: Next) => {
        const secret = process.env.JWT_SECRET as string;
        const token = pickBearer(c);
        if (token) {
            try {
                c.set("user", await verifyToken<AccessPayload>(token, secret));
            } catch {
                /* empty */
            }
        }
        await next();
    };

export const requireRole =
    (...roles: NonNullable<AccessPayload["role"]>[]) =>
    async (c: Context<{ Variables: AppVariables }>, next: Next) => {
        const user = c.get("user");
        if (!user || (roles.length && !roles.includes(user.role as never))) {
            throw new HTTPException(403, { message: "Forbidden" });
        }
        await next();
    };
