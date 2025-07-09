import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { history2MedicalHistory } from "./utils.js";
import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const get = async (id: string) => {
    return await prisma.medicalHistory.findMany({
        where: { userProfileId: id },
    });
};

app.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const history = await get(id);
        if (history === null)
            throw new HTTPException(400, { message: "History not found" });
        return c.json(history2MedicalHistory(history));
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

export default app;
