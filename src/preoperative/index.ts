import { Hono } from "hono";

import { draftGet, draftUpsert } from "./draft.js";
import get from "./get.js";
import upsert from "./upsert.js";
import { auth } from "../auth/middlewares.js";

const preExamination = new Hono().use("*", auth());

preExamination.route("draftGet", draftGet);
preExamination.route("draftUpsert", draftUpsert);

preExamination.route("upsert", upsert);
preExamination.route("get", get);

export { preExamination };
