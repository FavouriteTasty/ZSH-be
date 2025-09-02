import { Hono } from "hono";

import { ExportExcel } from "./excel.js";
import period from "./period.js";
import { auth } from "../auth/middlewares.js";

const exportExcel = new Hono();

exportExcel.post("/", async (c) => {
    const body = await c.req.json();
    const periods = (body.data ?? []) as string[];
    await ExportExcel(periods);
    return c.json({
        message: "success",
    });
});

exportExcel.route("/period", period);

export { exportExcel };
