import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Settings,
  BarChart3,
  CreditCard,
} from "lucide-react";

export default function Sidebar({ active, setActive }) {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: User, label: "Profile" },
    { icon: CreditCard, label: "Transactions" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 min-h-screen w-64 p-6 bg-white dark:bg-[#1E293B] border-r border-slate-100 dark:border-slate-700"
    >

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl font-semibold text-indigo-500 mb-8"
      >
        Finance
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.label;

          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActive(item.label)}
              className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }
              `}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}