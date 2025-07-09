import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const get = async (id: string) => {
    return await prisma.userProfile.findUniqueOrThrow({
        where: { id },
    });
};

app.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const profile = await get(id);
        if (profile === null)
            throw new HTTPException(400, { message: "Profile not found" });
        return c.json(profile);
    } catch (error) {
        logger("error", (error as Error).name, (error as Error).message);
        throw new HTTPException(400, {
            message: "Bad profile id",
            cause: error,
        });
    }
});

export default app;
