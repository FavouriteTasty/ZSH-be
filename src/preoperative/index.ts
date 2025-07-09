import { Hono } from "hono";

import get from "./get.js";
import upsert from "./upsert.js";

const preExamination = new Hono();

preExamination.route("upsert", upsert);
preExamination.route("get", get);

export { preExamination };
