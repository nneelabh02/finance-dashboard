import { useEffect, useState } from "react";
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

  // ✅ LOAD DATA
  useEffect(() => {
    loadTransactions();
  }, []);

  // ✅ THEME TOGGLE WITH PERSISTENCE
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
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">

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
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 dark:text-white">
              {active}
            </h1>
          </div>

          <div className="flex items-center gap-2">

            {/* 🌙 Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700"
            >
              🌙
            </button>

            {/* Add Button */}
            {role === "admin" && (
              <button
                onClick={() => setOpen(true)}
                className="
                  text-sm font-medium
                  bg-indigo-500 text-white px-4 py-2 rounded-xl
                  shadow-md hover:bg-indigo-600 hover:shadow-lg
                  transition
                "
              >
                + Add
              </button>
            )}

            <RoleSwitcher />

          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <SummaryCards />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <BalanceChart />
              <CategoryChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="md:col-span-2">
                <TransactionsTable />
              </div>
              <Insights />
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <AddTransactionModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}