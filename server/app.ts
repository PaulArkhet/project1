import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", logger());

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.use("*", serveStatic({ root: "./frontend/dist/index.html" }));

app.use("*", cors());

app.all("/api/abc", (c) => {
  return c.json({ success: true });
});
app.all("/api2/abc", (c) => {
  return c.json({ success: true });
});

app.get("/", (c) => {
  c.status(200);
  return c.newResponse("welcome");
});

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
