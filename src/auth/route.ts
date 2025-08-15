// src/auth/routes.ts
import type { $Enums } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { nanoid } from "nanoid";

import {
    signAccessToken,
    signRefreshToken,
    verifyToken,
    type AccessPayload,
} from "./jwt.js";
import type { AppVariables } from "./middlewares.js";
import { prisma } from "../prisma/index.js";

export const authRoute = new Hono<{ Variables: AppVariables }>();

authRoute.post("/login", async (c) => {
    const secret = process.env.JWT_SECRET as string;
    const accessExp = process.env.ACCESS_EXPIRES_IN || "30d";
    const refreshExp = process.env.REFRESH_EXPIRES_IN || "30d";

    const body = await c.req.json().catch(() => ({}));

    const { username, password } = body.data;
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user || password !== user.password)
        throw new HTTPException(401, {
            message: "用户名密码错误！Invalid username or password!",
        });

    const userId = user.username;
    const role: $Enums.UserType = user.type;
    const ver = 1;

    const accessToken = await signAccessToken(
        { sub: userId, role, ver },
        secret,
        accessExp,
    );
    const refreshToken = await signRefreshToken(
        { sub: userId, ver, jti: nanoid() },
        secret,
        refreshExp,
    );

    return c.json({ accessToken, refreshToken, user: { id: userId, role } });
});

authRoute.post("/refresh", async (c) => {
    const secret = process.env.JWT_SECRET as string;
    const accessExp = process.env.ACCESS_EXPIRES_IN || "30d";
    const refreshExp = process.env.REFRESH_EXPIRES_IN || "30d";

    // 约定：X-Refresh-Token: Bearer <refreshToken>
    const hdr = c.req.header("X-Refresh-Token") || "";
    const [scheme, rt] = hdr.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !rt)
        throw new HTTPException(401, {
            message: "Missing X-Refresh-Token Bearer",
        });

    let payload: (AccessPayload & { jti: string }) | undefined;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        payload = await verifyToken<any>(rt, secret);
    } catch {
        throw new HTTPException(401, { message: "Invalid refresh token" });
    }

    if (payload) {
        const newAccess = await signAccessToken(
            { sub: payload.sub!, role: payload.role, ver: payload.ver },
            secret,
            accessExp,
        );
        const newRefresh = await signRefreshToken(
            { sub: payload.sub!, ver: payload.ver, jti: nanoid() },
            secret,
            refreshExp,
        );

        return c.json({ accessToken: newAccess, refreshToken: newRefresh });
    }
});

authRoute.post("/logout", async (c) => {
    return c.json({ ok: true });
});
