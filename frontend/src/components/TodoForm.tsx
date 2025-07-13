import { useCreateTodoMutation } from "../lib/api/todos";

export default function TodoForm() {
  const { mutate: createTodo } = useCreateTodoMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = (e.target as HTMLFormElement).todotitle.value;
    const description = (e.target as HTMLFormElement).description.value;
    createTodo({ title, description });
  }

  return (
    <div className="mx-auto">
      <div className="text-center text-6xl">Create To-do</div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="todotitle"
          id="todotitle"
          placeholder="Title"
          className="bg-white text-black my-5"
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          className="bg-white text-black my-5"
        />
        <button>CREATE</button>
      </form>
    </div>
  );
}
