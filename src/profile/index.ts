import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";

const profile = new Hono();

profile.route("upsert", upsert);
profile.route("get", get);

export { profile };
