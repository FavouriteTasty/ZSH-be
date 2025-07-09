import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { followup } from "./followup/index.js";
import { history } from "./history/index.js";
import { hospitalization } from "./hospitalization/index.js";
import { preExamination } from "./preoperative/index.js";
import { profile } from "./profile/index.js";
import { stentPlacement } from "./stentPlacement/index.js";
import { stentRemoval } from "./stentRemoval/index.js";
import { logger as customLogger } from "./utils/logger.js";

const app = new Hono();

app.use(logger(customLogger));
app.get("/", (c) => {
    return c.text("Hello Hono!");
});

const api = new Hono();

api.route("profile", profile);
api.route("history", history);
api.route("hospitalization", hospitalization);
api.route("stentPlacement", stentPlacement);
api.route("preoperative", preExamination);
api.route("stentRemoval", stentRemoval);
api.route("followup", followup);

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
