import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

app.get("/", async (c) => {
    try {
        const periods = await prisma.followup.findMany({
            distinct: ["period"],
            select: { period: true },
        });
        const periodList = periods.map((item) => item.period);
        return c.json({ periodList });
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Internal Error",
            cause: error,
        });
    }
});

export default app;
