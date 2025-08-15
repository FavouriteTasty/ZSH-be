import { Hono } from "hono";

import { draftGet, draftUpsert } from "./draft.js";
import get from "./get.js";
import upsert from "./upsert.js";
import { auth } from "../auth/middlewares.js";

const hospitalization = new Hono().use("*", auth());

hospitalization.route("upsert", upsert);
hospitalization.route("get", get);
hospitalization.route("draftUpsert", draftUpsert);
hospitalization.route("draftGet", draftGet);

export { hospitalization };
