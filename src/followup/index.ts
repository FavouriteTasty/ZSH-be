import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";

const followup = new Hono();

followup.route("upsert", upsert);
followup.route("get", get);

export { followup };
