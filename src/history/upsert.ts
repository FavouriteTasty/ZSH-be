import type { MedicalHistory } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { medicalHistory2History, type UnknownMedicalHistory } from "./utils.js";
import { prisma } from "../prisma/index.js";
import {
    type MedicalHistory as TableMedicalHistory,
    defaultDate,
} from "../types/table.js";
import {
    differenceByProps,
    filterUndefinedFields,
    isAllFieldsValid,
} from "../utils/data.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const upsert = (data: UnknownMedicalHistory) => {
    const filtered = filterUndefinedFields(data);

    return prisma.medicalHistory.upsert({
        where: {
            history_unique: {
                userProfileId: filtered.userProfileId,
                date: filtered.date ?? defaultDate,
                description: filtered.description ?? "",
            },
        },
        update: filtered,
        create: filtered,
    });
};

const remove = (exclude: MedicalHistory[]) => {
    return prisma.medicalHistory.deleteMany({
        where: {
            id: { in: exclude.map((i) => i.id) },
        },
    });
};

const findAll = (id: string) => {
    return prisma.medicalHistory.findMany({
        where: { userProfileId: id },
    });
};

const validate = (history: TableMedicalHistory) => {
    if (history === undefined) {
        throw new HTTPException(400, { message: "History is undefined" });
    }
    if (!isAllFieldsValid(history)) {
        throw new HTTPException(400, { message: "Bad history" });
    }
};

const upserts = async (
    histories: UnknownMedicalHistory[],
    exclude: MedicalHistory[],
) => {
    const operations = histories.map((data) => upsert(data));
    const removeOperations = remove(exclude);
    const results = await prisma.$transaction([
        ...operations,
        removeOperations,
    ]);
    return results;
};

app.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const data = body.data;
        const profileId = body.id;
        validate(data);
        const history = medicalHistory2History(data, profileId);
        const origin = await findAll(profileId);
        const exclude = differenceByProps(origin, history, [
            "description",
            "date",
            "type",
        ]);

        await upserts(history, exclude);
        return c.json("upsert history success");
    } catch (error) {
        logger("error", (error as Error).name, (error as Error).message);
        throw new HTTPException(400, {
            message: "Bad history",
            cause: error,
        });
    }
});

export default app;
