import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createInsertSchema } from "drizzle-zod";
import { todos as todosTable } from "../schemas/todos";
import { mightFail } from "might-fail";
import { db } from "../db";
import { HTTPException } from "hono/http-exception";

export const todosRouter = new Hono().post(
  "/",
  zValidator(
    "json",
    createInsertSchema(todosTable).omit({ todoId: true, createdAt: true })
  ),
  async (c) => {
    const insertValues = c.req.valid("json");
    const { error: todoInsertError, result: todoInsertResult } =
      await mightFail(db.insert(todosTable).values(insertValues).returning());
    if (todoInsertError) {
      throw new HTTPException(500, {
        message: "Error inserting todo",
        cause: todoInsertError,
      });
    }
    return c.json({ todo: todoInsertResult[0] });
  }
);
