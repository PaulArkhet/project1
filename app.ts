import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

export default app;

const PORT = parseInt(process.env.PORT!) || 3333;

const server = serve({
  port: PORT,
  fetch: app.fetch,
});

console.log("Server running on port: ", PORT);
