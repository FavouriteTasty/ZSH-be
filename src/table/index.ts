import { Hono } from "hono";

import get from "./get.js";
import list from "./list.js";
import { auth } from "../auth/middlewares.js";

const table = new Hono().use("*", auth());

table.route("get", get);
table.route("get", list);

export { table };
