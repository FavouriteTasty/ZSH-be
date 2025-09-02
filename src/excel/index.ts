import { Hono } from "hono";

import { ExportExcel } from "./excel.js";
import period from "./period.js";
import { auth } from "../auth/middlewares.js";

const exportExcel = new Hono().use("*", auth());

exportExcel.post("/", async (c) => {
    const body = await c.req.json();
    const periods = (body.data ?? []) as string[];
    const buffer = await ExportExcel(periods);
    const filename = `${periods.length > 0 ? periods.join(",") : "all"}-${new Date().toISOString().slice(0, 10)}.xlsx`;

    const encodedFilename = encodeURIComponent(filename);

    return c.body(buffer, 200, {
        "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodedFilename}; filename="${Date.now()}.xlsx"`,
    });
});

exportExcel.route("/period", period);

export { exportExcel };
