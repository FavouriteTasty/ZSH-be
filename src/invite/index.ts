import { Hono } from "hono";

import generate from "./generate.js";
import get from "./get.js";
import { auth } from "../auth/middlewares.js";

const invite = new Hono().use("*", auth());

invite.route("generate", generate);
invite.route("get", get);

export { invite };
