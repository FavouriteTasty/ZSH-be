import { type Hospitalization } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { filterUndefinedFields } from "../utils/data.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const upsert = async (data: Hospitalization, id: string) => {
    const filtered = filterUndefinedFields(data);

    await prisma.hospitalization.upsert({
        where: {
            userProfileId: id,
        },
        update: filtered,
        create: filtered,
    });
};

export const validate = (hospitalization: Hospitalization) => {
    if (hospitalization === undefined) {
        throw new HTTPException(400, {
            message: "Hospitalizations is undefined",
        });
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
        return c.json("create hospitalization success");
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad hospitalization",
            cause: error,
        });
    }
});

export default app;
