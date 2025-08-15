import { Hono } from "hono";

import remove from "./delete.js";
import get from "./get.js";
import upsert from "./upsert.js";

const profile = new Hono();

profile.route("upsert", upsert);
profile.route("get", get);
profile.route("delete", remove);

export { profile };
