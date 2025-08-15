import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";
import { auth } from "../auth/middlewares.js";

const stentRemoval = new Hono().use("*", auth());

stentRemoval.route("upsert", upsert);
stentRemoval.route("get", get);

export { stentRemoval };
