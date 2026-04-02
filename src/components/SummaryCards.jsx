import { useFinanceStore } from "../store/useFinanceStore";
import Card from "./ui/Card";

export default function SummaryCards() {
  const { transactions } = useFinanceStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

      <StatCard title="Balance" value={balance} />
      <StatCard title="Income" value={income} />
      <StatCard title="Expenses" value={expense} />

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Card>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-slate-900 dark:text-white">
        ₹ {value}
      </h2>
    </Card>
  );
}