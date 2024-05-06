import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.total);
    }

    fetchTotal();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto w-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
