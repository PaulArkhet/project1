import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
  component: RouteComponent,
});

async function getExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error("server error");
  const data = await res.json();
  return data;
}

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-expenses"],
    queryFn: getExpenses,
  });
  if (error) return "Error" + error.message;
  return (
    <div className="p-10">
      <div className="grid grid-cols-3 gap-3 font-bold border">
        <div className="">ID</div>
        <div className="">Title</div>
        <div className="">Amount</div>
      </div>
      {isPending
        ? Array(3)
            .fill(0)
            .map((_, i) => (
              <div className="grid grid-cols-3 gap-3">
                <div className="">
                  <Skeleton className="h-2" />
                </div>
                <div className="">
                  <Skeleton className="h-2" />
                </div>
                <div className="">
                  <Skeleton className="h-2" />
                </div>
              </div>
            ))
        : data.expenses.map((expense) => (
            <div className="grid grid-cols-3 gap-3">
              <div className="">{expense.id}</div>
              <div className="">{expense.title}</div>
              <div className="">{expense.amount}</div>
            </div>
          ))}
    </div>
  );
}
