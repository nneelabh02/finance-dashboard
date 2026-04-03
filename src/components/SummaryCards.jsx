import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
    >

      <motion.div variants={cardVariants}>
        <StatCard title="Balance" value={balance} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <StatCard title="Income" value={income} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <StatCard title="Expenses" value={expense} />
      </motion.div>

    </motion.div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-2xl md:text-3xl font-semibold mt-2 text-slate-900 dark:text-white"
        >
          ₹ {value}
        </motion.h2>
      </Card>
    </motion.div>
  );
}