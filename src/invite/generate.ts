import type { InviteAdd } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { v4 as uuidv4 } from "uuid";

import { clearExpired } from "./util.js";
import { prisma } from "../prisma/index.js";
import { isAllFieldsValid } from "../utils/data.js";
import { logger } from "../utils/logger.js";

export type InviteGenerateRequest = Omit<InviteAdd, "createdAt" | "link">;

const app = new Hono();

const upsert = async (data: InviteGenerateRequest) => {
    const uuid = uuidv4();
    const insertData: Omit<InviteAdd, "createdAt"> = {
        ...data,
        link: uuid,
    };

    await prisma.inviteAdd.upsert({
        where: {
            id: insertData.id,
        },
        update: insertData,
        create: insertData,
    });
    return insertData;
};

const validate = async (request: InviteGenerateRequest) => {
    if (request === undefined) {
        throw new HTTPException(400, {
            message: "Invite add Request is undefined",
        });
    }
    if (!isAllFieldsValid(request)) {
        throw new HTTPException(400, { message: "Bad profile" });
    }
    const inviteAddResult = await prisma.inviteAdd.findUnique({
        where: { id: request.id },
    });
    if (inviteAddResult !== null) {
        throw new HTTPException(400, {
            message: `该病人的邀请链接已存在: ${inviteAddResult.link}`,
        });
    }
    const userProfileResult = await prisma.userProfile.findUnique({
        where: { id: request.id },
    });
    if (userProfileResult !== null) {
        throw new HTTPException(400, {
            message: `该病人资料已经在库中`,
        });
    }
};

app.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const data = body.data;
        await clearExpired();
        await validate(data);
        const result = await upsert(data);
        return c.json(result);
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
