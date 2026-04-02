import { useFinanceStore } from "../store/useFinanceStore";
import Card from "./ui/Card";
import { motion } from "framer-motion";

export default function Insights() {
  const { transactions } = useFinanceStore();

  let income = 0, expenses = 0;
  transactions.forEach(t=>{
    if(t.type==="income") income+=t.amount;
    else expenses+=t.amount;
  });

  const savings = income - expenses;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">

        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">
          Insights
        </h2>

        <div className="space-y-3 text-sm">

          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
            <p className="text-slate-500 dark:text-slate-400">Income</p>
            <p className="text-green-500">₹ {income}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
            <p className="text-slate-500 dark:text-slate-400">Expenses</p>
            <p className="text-red-400">₹ {expenses}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
            <p className="text-slate-500 dark:text-slate-400">Savings</p>
            <p className="text-slate-900 dark:text-white font-semibold">
              ₹ {savings}
            </p>
          </div>

        </div>

      </Card>
    </motion.div>
  );
}