import { Hono } from "hono";

import { draftGet, draftUpsert } from "./draft.js";
import get from "./get.js";
import upsert from "./upsert.js";
import { auth } from "../auth/middlewares.js";

const stentPlacement = new Hono().use("*", auth());

stentPlacement.route("draftUpsert", draftUpsert);
stentPlacement.route("draftGet", draftGet);

stentPlacement.route("upsert", upsert);
stentPlacement.route("get", get);

export { stentPlacement };
