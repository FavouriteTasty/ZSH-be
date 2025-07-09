import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";

const hospitalization = new Hono();

hospitalization.route("upsert", upsert);
hospitalization.route("get", get);

export { hospitalization };
