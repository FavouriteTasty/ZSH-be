import { type StentRemoval } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { filterUndefinedFields, isAllFieldsValid } from "../utils/data.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const upsert = async (data: StentRemoval, id: string) => {
    const filtered = filterUndefinedFields(data);

    await prisma.stentRemoval.upsert({
        where: {
            userProfileId: id,
        },
        update: filtered,
        create: filtered,
    });
};

const validate = (stentPlacement: StentRemoval) => {
    if (stentPlacement === undefined) {
        throw new HTTPException(400, {
            message: "StentRemoval is undefined",
        });
    }
    if (!isAllFieldsValid(stentPlacement)) {
        throw new HTTPException(400, { message: "Bad stentRemoval" });
    }
};

app.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const profileId = body.id;
        const data = body.data;
        validate(data);
        data.userProfileId = profileId;
        await upsert(data, profileId);
        return c.json("create stentRemoval success");
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad stentRemoval",
            cause: error,
        });
    }
});

export default app;
