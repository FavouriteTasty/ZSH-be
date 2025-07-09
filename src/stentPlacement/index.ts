import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";

const stentPlacement = new Hono();

stentPlacement.route("upsert", upsert);
stentPlacement.route("get", get);

export { stentPlacement };
