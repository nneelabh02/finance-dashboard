import Card from "../ui/Card";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";
import { useFinanceStore } from "../../store/useFinanceStore";

export default function CategoryChart() {
  const { transactions } = useFinanceStore();

  const dataMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      dataMap[t.category] = (dataMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

  return (
    <Card>
      <h2 className="font-semibold text-slate-800 dark:text-white mb-4">
        Spending Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}