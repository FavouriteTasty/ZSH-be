import type { StentPlacement } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { validate } from "./upsert.js";
import { prisma } from "../prisma/index.js";
import { filterUndefinedFields } from "../utils/data.js";
import { logger } from "../utils/logger.js";

const draftGet = new Hono();

const get = async (id: string) => {
    return await prisma.stentPlacementDraft.findUnique({
        where: { userProfileId: id },
    });
};

draftGet.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const stentPlacement = await get(id);
        return c.json(stentPlacement);
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad profile id",
            cause: error,
        });
    }
});

const draftUpsert = new Hono();

const upsert = async (data: StentPlacement, id: string) => {
    const filtered = filterUndefinedFields(data);

    await prisma.stentPlacementDraft.upsert({
        where: {
            userProfileId: id,
        },
        update: filtered,
        create: filtered,
    });
};

draftUpsert.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const profileId = body.id;
        const data = body.data;
        validate(data, false);
        data.userProfileId = profileId;
        await upsert(data, profileId);
        return c.json("create stentPlacement success");
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad stentPlacement",
            cause: error,
        });
    }
});

export { draftGet, draftUpsert };
