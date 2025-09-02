import { Hono } from "hono";

import { ExportExcel } from "./excel.js";
import { auth } from "../auth/middlewares.js";

const exportExcel = new Hono();

exportExcel.get("/", async (c) => {
    await ExportExcel();
    return c.json({
        message: "success",
    });
});

export { exportExcel };
