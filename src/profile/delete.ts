import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const deleteById = async (id: string) => {
    return await prisma.userProfile.delete({
        where: { id },
    });
};

app.delete("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const profile = await deleteById(id);
        if (profile === null)
            throw new HTTPException(400, { message: "Id not found" });
        return c.json(profile);
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad id",
            cause: error,
        });
    }
});

export default app;
