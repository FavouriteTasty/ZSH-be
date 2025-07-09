import { type StentPlacement } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { filterUndefinedFields, isAllFieldsValid } from "../utils/data.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const upsert = async (data: StentPlacement, id: string) => {
    const filtered = filterUndefinedFields(data);

    await prisma.stentPlacement.upsert({
        where: {
            userProfileId: id,
        },
        update: filtered,
        create: filtered,
    });
};

const validate = (stentPlacement: StentPlacement) => {
    if (stentPlacement === undefined) {
        throw new HTTPException(400, {
            message: "StentPlacement is undefined",
        });
    }
    if (!isAllFieldsValid(stentPlacement)) {
        throw new HTTPException(400, { message: "Bad stentPlacement" });
    }
};

app.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const profileId = body.id;
        const data = body.data;
        console.log(data);

        validate(data);
        data.userProfileId = profileId;
        await upsert(data, profileId);
        return c.json("create stentPlacement success");
    } catch (error) {
        console.log(error);

        logger("error", (error as Error).name, (error as Error).message);
        throw new HTTPException(400, {
            message: "Bad stentPlacement",
            cause: error,
        });
    }
});

export default app;
