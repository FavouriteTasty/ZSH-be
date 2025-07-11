import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { history2MedicalHistory } from "../history/utils.js";
import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const get = async (id: string) => {
    const data = await prisma.userProfile.findUnique({
        where: { id },
        include: {
            hospitalization: true,
            stentPlacement: true,
            preExamination: true,
            stentRemoval: true,
            followup: true,
        },
    });
    const history = await prisma.medicalHistory.findMany({
        where: { userProfileId: id },
    });
    return { ...data, ...history2MedicalHistory(history) };
};

app.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const content = await get(id);
        return c.json(content);
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
