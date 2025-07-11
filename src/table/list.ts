import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { getOrderBy } from "./util.js";
import { history2MedicalHistory } from "../history/utils.js";
import { prisma } from "../prisma/index.js";
import { logger } from "../utils/logger.js";

const app = new Hono();

const getList = async (params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    status?: string;
}) => {
    const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
        search,
        status,
    } = params;

    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            // { email: { contains: search, mode: "insensitive" } },
        ];
    }

    if (status) {
        where.status = status;
    }

    const orderBy = getOrderBy(sortBy, sortOrder);

    const [data, total] = await Promise.all([
        prisma.userProfile.findMany({
            where,
            skip,
            take: limit,
            orderBy: orderBy,
            include: {
                hospitalization: true,
                stentPlacement: true,
                preExamination: true,
                stentRemoval: true,
                followup: true,
            },
        }),
        prisma.userProfile.count({ where }),
    ]);

    const userIds = data.map((profile) => profile.id);
    const histories = await prisma.medicalHistory.findMany({
        where: {
            userProfileId: { in: userIds },
        },
    });

    const historyMap = histories.reduce(
        (acc, history) => {
            if (!acc[history.userProfileId]) {
                acc[history.userProfileId] = [];
            }
            acc[history.userProfileId].push(history);
            return acc;
        },
        {} as Record<string, typeof histories>,
    );

    const result = data.map((profile) => ({
        ...profile,
        ...history2MedicalHistory(historyMap[profile.id] || []),
    }));

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
        },
    };
};

app.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const page = body.page;
        const limit = body.limit;
        const sortBy = body.sortBy;
        const sortOrder = body.sortOrder;
        const search = body.search;
        const status = body.status;

        const content = await getList({
            page,
            limit,
            sortBy,
            sortOrder,
            search,
            status,
        });
        return c.json(content);
    } catch (error) {
        logger(
            "error",
            (error as Error).name,
            (error as Error).message,
            (error as Error).stack ?? "",
        );
        throw new HTTPException(400, {
            message: "Bad params",
            cause: error,
        });
    }
});

export default app;
