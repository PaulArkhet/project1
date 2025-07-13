export default function TodoForm() {
  return (
    <div className="mx-auto">
      <div className="text-center text-6xl">Create To-do</div>
      <form action="" className="flex flex-col">
        <input type="text" className="bg-white my-5" />
        <input type="text" className="bg-white my-5" />
        <button>CREATE</button>
      </form>
    </div>
  );
}
