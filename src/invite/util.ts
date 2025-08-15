import { prisma } from "../prisma/index.js";

const ExpiredTime = 5 * 60 * 1000;

export const clearExpired = async () => {
    const timeoutThreshold = new Date(Date.now() - ExpiredTime);

    await prisma.inviteAdd.deleteMany({
        where: {
            createdAt: {
                lt: timeoutThreshold,
            },
        },
    });
};
