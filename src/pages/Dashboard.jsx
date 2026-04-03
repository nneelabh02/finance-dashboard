import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFinanceStore } from "../store/useFinanceStore";

import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import RoleSwitcher from "../components/RoleSwitcher";
import SummaryCards from "../components/SummaryCards";
import TransactionsTable from "../components/TransactionsTable";
import Insights from "../components/Insights";
import BalanceChart from "../components/Charts/BalanceChart";
import CategoryChart from "../components/Charts/CategoryChart";
import AddTransactionModal from "../components/AddTransactionModal";
import Skeleton from "../components/Skeleton";

import { Menu } from "lucide-react";

export default function Dashboard() {
  const { role, loadTransactions, loading, error } = useFinanceStore();

  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  // LOAD DATA
  useEffect(() => {
    loadTransactions();
  }, []);

  // THEME TOGGLE WITH PERSISTENCE
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen bg-slate-100 dark:bg-slate-900"
    >

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar active={active} setActive={setActive} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        active={active}
        setActive={setActive}
      />

      {/* Main */}
      <div className="flex-1 p-4 md:p-8 space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center"
        >

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 dark:text-white">
              {active}
            </h1>
          </div>

          <div className="flex items-center gap-2">

            {/* 🌙 Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 transition-colors duration-200"
            >
              🌙
            </motion.button>

            {/* Add Button */}
            {role === "admin" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="
                  text-sm font-medium
                  bg-indigo-500 text-white px-4 py-2 rounded-xl
                  shadow-md hover:bg-indigo-600 hover:shadow-lg
                  transition-all duration-200
                "
              >
                + Add
              </motion.button>
            )}

            <RoleSwitcher />

          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <SummaryCards />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              <BalanceChart />
              <CategoryChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            >
              <div className="md:col-span-2">
                <TransactionsTable />
              </div>
              <Insights />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AddTransactionModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </motion.div>
  );
}