import Card from "../ui/Card";
import {
  LineChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
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

      <ResponsiveContainer width="100%" height={270}>
        <LineChart data={data} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip wrapperStyle={{ backgroundColor: '#0f172a', borderRadius: 8, border: '1px solid #334155' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#f8fafc' }} itemStyle={{ color: '#f8fafc' }} />
          <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6, strokeWidth: 3, stroke: '#6366F1' }} />
          <Area type="monotone" dataKey="amount" stroke="none" fill="url(#balanceGradient)" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}