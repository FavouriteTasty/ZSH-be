import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";

const history = new Hono();

history.route("upsert", upsert);
history.route("get", get);

export { history };
