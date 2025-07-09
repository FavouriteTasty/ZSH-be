import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";

const stentRemoval = new Hono();

stentRemoval.route("upsert", upsert);
stentRemoval.route("get", get);

export { stentRemoval };
