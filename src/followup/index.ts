import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";
import { auth } from "../auth/middlewares.js";

const followup = new Hono().use("*", auth());

followup.route("upsert", upsert);
followup.route("get", get);

export { followup };
