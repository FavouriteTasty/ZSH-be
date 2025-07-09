import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const get = async (id: string) => {
    return await prisma.stentPlacement.findUnique({
        where: { userProfileId: id },
    });
};

app.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const stentPlacement = await get(id);
        return c.json(stentPlacement);
    } catch (error) {
        logger("error", (error as Error).name, (error as Error).message);
        throw new HTTPException(400, {
            message: "Bad profile id",
            cause: error,
        });
    }
});

export default app;
