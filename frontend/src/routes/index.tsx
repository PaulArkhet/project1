import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "../App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotal() {
  const res = await api.expenses["total"].$get();
  if (!res.ok) throw new Error("server error");
  const data = await res.json();
  return data;
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total"],
    queryFn: getTotal,
  });
  if (error) return "Error" + error.message;

  return (
    <div className="flex flex-col min-h-screen">
      <Card className="my-10 mx-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.total}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
