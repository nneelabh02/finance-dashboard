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

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <h2 className="font-semibold text-slate-800 dark:text-white mb-4">
        Spending Breakdown
      </h2>

      <div className="flex items-center justify-between mb-2 text-sm text-slate-700 dark:text-slate-300">
        <span>Total Expense</span>
        <span className="font-semibold">₹ {total}</span>
      </div>

      <ResponsiveContainer width="100%" height={270}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={4}
            stroke="transparent"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ backgroundColor: '#0f172a', borderRadius: 8, border: '1px solid #334155' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#f8fafc' }} itemStyle={{ color: '#f8fafc' }} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-xs text-slate-600 dark:text-slate-300">{item.name}</span>
            <span className="ml-auto text-xs font-medium text-slate-700 dark:text-slate-100">₹ {item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}