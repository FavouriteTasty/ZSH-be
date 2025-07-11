import { Hono } from "hono";

import get from "./get.js";
import list from "./list.js";

const table = new Hono();

table.route("get", get);
table.route("get", list);

export { table };
