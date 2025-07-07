import { Hono } from "hono";

import profile from "./insertProfile.js";

const insert = new Hono();

insert.route("profile", profile);

export { insert };
