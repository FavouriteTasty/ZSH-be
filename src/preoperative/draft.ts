import type { PreoperativeExaminationForStentRemoval } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { validate } from "./upsert.js";
import { prisma } from "../prisma/index.js";
import { filterUndefinedFields } from "../utils/data.js";
import { logger } from "../utils/logger.js";

const draftGet = new Hono();

const get = async (id: string) => {
    return await prisma.preoperativeExaminationForStentRemovalDraft.findUnique({
        where: { userProfileId: id },
    });
};

draftGet.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const preExamination = await get(id);
        return c.json(preExamination);
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

const upsert = async (
    data: PreoperativeExaminationForStentRemoval,
    id: string,
) => {
    const filtered = filterUndefinedFields(data);

    await prisma.preoperativeExaminationForStentRemovalDraft.upsert({
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
        validate(data);
        data.userProfileId = profileId;
        await upsert(data, profileId);
        return c.json("create preExamination success");
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad preExamination",
            cause: error,
        });
    }
});

export { draftGet, draftUpsert };
