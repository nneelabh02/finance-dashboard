import Card from "../ui/Card";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useFinanceStore } from "../../store/useFinanceStore";

export default function BalanceChart() {
  const { transactions } = useFinanceStore();

  const data = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  return (
    <Card>
      <h2 className="font-semibold text-slate-800 dark:text-white mb-4">
        Balance Trend
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#888" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#6366F1" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}