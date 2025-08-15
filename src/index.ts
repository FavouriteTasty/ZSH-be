import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { authRoute } from "./auth/route.js";
import { followup } from "./followup/index.js";
import { history } from "./history/index.js";
import { hospitalization } from "./hospitalization/index.js";
import { invite } from "./invite/index.js";
import { preExamination } from "./preoperative/index.js";
import { profile } from "./profile/index.js";
import { stentPlacement } from "./stentPlacement/index.js";
import { stentRemoval } from "./stentRemoval/index.js";
import { table } from "./table/index.js";
import { logger as customLogger } from "./utils/logger.js";

const app = new Hono();

app.use(logger(customLogger));
app.get("/", (c) => {
    return c.text("Hello Hono!");
});

const api = new Hono();

app.use(
    "*",
    cors({
        origin: ["*"],
        allowHeaders: ["Content-Type", "Authorization", "X-Refresh-Token"],
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: false,
    }),
);

api.route("auth", authRoute);

api.route("table", table);
api.route("profile", profile);
api.route("history", history);
api.route("hospitalization", hospitalization);
api.route("stentPlacement", stentPlacement);
api.route("preoperative", preExamination);
api.route("stentRemoval", stentRemoval);
api.route("followup", followup);
api.route("invite", invite);

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
