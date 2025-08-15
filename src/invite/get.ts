import type { InviteAdd } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { clearExpired } from "./util.js";
import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

export type InviteGetResponse = Omit<InviteAdd, "createdAt" | "link">;

const app = new Hono();

const get = async (uuid: string) => {
    return await prisma.inviteAdd.findFirst({
        where: { link: uuid },
    });
};

app.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        await clearExpired();
        const inviteAdd = await get(id);
        if (inviteAdd === null)
            throw new HTTPException(400, { message: "链接不存在或已过期" });
        const response: InviteGetResponse = {
            name: inviteAdd.name,
            id: inviteAdd.id,
        };
        return c.json(response);
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        return c.json({
            code: 400,
            message: (error as Error).message,
        });
    }
});

export default app;
