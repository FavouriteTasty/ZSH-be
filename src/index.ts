import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { profile } from "./profile/index.js";
import { logger as customLogger } from "./utils/logger.js";

const app = new Hono();

app.use(logger(customLogger));
app.get("/", (c) => {
    return c.text("Hello Hono!");
});

const api = new Hono();

api.route("profile", profile);

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
