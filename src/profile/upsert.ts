import { type UserProfile } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { filterUndefinedFields, isAllFieldsValid } from "../utils/data.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const upsert = async (data: UserProfile) => {
    const filtered = filterUndefinedFields(data);

    await prisma.userProfile.upsert({
        where: {
            id: filtered.id,
        },
        update: filtered,
        create: filtered,
    });
};

const validate = (profile: UserProfile) => {
    if (profile === undefined) {
        throw new HTTPException(400, { message: "Profile is undefined" });
    }
    if (!isAllFieldsValid(profile)) {
        throw new HTTPException(400, { message: "Bad profile" });
    }
};

app.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const data = body.data;
        validate(data);
        await upsert(data);
        return c.json("create profile success");
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad profile",
            cause: error,
        });
    }
});

export default app;
