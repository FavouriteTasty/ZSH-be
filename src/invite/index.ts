import { Hono } from "hono";

import generate from "./generate.js";
import get from "./get.js";

const invite = new Hono();

invite.route("generate", generate);
invite.route("get", get);

export { invite };
