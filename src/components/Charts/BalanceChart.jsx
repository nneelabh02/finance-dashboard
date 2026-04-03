import Card from "../ui/Card";
import {
  LineChart, CartesianGrid, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
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
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.35} />
          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip wrapperStyle={{ backgroundColor: '#0f172a', borderRadius: 8, border: '1px solid #334155' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#f8fafc', boxShadow: '0 8px 18px rgba(15, 23, 42, 0.45)' }} itemStyle={{ color: '#f8fafc' }} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.2 }} />
          <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 7, fill: '#6366F1', stroke: '#fff', strokeWidth: 3 }} />
          <Area type="monotone" dataKey="amount" stroke="none" fill="url(#balanceGradient)" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}