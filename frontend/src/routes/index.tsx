import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Index,
});

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();

  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  return data;
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto w-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.total}</p>
        </CardContent>
      </Card>
    </div>
  );
}
