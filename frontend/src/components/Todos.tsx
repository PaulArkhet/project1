import { useQuery } from "@tanstack/react-query";
import { getAllTodosQueryOptions } from "../lib/api/todos";

export default function Todos() {
  const { data: todosQuery } = useQuery(getAllTodosQueryOptions());
  return (
    <div>
      <div className="text-center text-6xl mt-20">Todos</div>
      <div className="flex flex-col">
        <div className="mx-auto">
          {todosQuery?.map((todo) => (
            <div className="my-10">
              <div>{todo.title}</div>
              <div>{todo.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
