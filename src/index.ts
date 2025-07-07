import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { insert } from "./insert/index.js";

const app = new Hono();

app.use(logger());
app.get("/", (c) => {
    return c.text("Hello Hono!");
});

const api = new Hono();
api.route("insert", insert);

app.route("api", api);

serve(
    {
        fetch: app.fetch,
        port: 3000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    },
);
