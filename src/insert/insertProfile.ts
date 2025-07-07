import { PrismaClient, type UserProfile } from "@prisma/client";
import { Hono } from "hono";

const app = new Hono();

const prisma = new PrismaClient();

const createProfile = async (data: UserProfile) => {
    await prisma.userProfile.create({ data });
};

const validateProfile = (profile: UserProfile): boolean => {
    return true;
};

app.post("/", async (c) => {
    const body = await c.req.json();
    const data = body.data;
    validateProfile(data);
    console.log(data);
    await createProfile(data);
    return c.json("create profile success");
});

export default app;
