import { ArgumentTypes, client } from "./client";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type CreateTodoArgs = ArgumentTypes<
  typeof client.api.v0.todos.$post
>[0]["json"];

async function createTodo(args: CreateTodoArgs) {
  const res = await client.api.v0.todos.$post({ json: args });
  if (!res.ok) {
    throw new Error("error creating todo");
  }
  const result = await res.json();
  if (!result.todo) throw new Error("Invalid response from server");
  return result;
}

export function useCreateTodoMutation(onError?: (message: string) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

async function getTodos() {
  const res = await client.api.v0.todos.$get();
  if (!res.ok) {
    throw new Error("error getting todo");
  }
  const { todos } = await res.json();
  return todos;
}

export const getAllTodosQueryOptions = () =>
  queryOptions({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
