import type { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  todoId: serial("todo_id").primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Todo = InferSelectModel<typeof todos>;
