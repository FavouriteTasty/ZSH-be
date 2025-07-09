import type { Followup } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { defaultDate } from "../types/table.js";
import { filterUndefinedFields } from "../utils/data.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const upsert = (data: Followup) => {
    const filtered = filterUndefinedFields(data);

    return prisma.followup.upsert({
        where: {
            followup_unique: {
                userProfileId: filtered.userProfileId,
                admissionTime: filtered.admissionTime ?? defaultDate,
            },
        },
        update: filtered,
        create: filtered,
    });
};

const validate = (followup: Followup) => {
    if (followup === undefined) {
        throw new HTTPException(400, { message: "Followup is undefined" });
    }
};

app.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const data = body.data;
        const profileId = body.id;
        validate(data);
        data.userProfileId = profileId;
        await upsert(data);
        return c.json("upsert followup success");
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad followup",
            cause: error,
        });
    }
});

export default app;
