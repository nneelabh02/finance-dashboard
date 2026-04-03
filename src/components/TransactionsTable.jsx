import { useFinanceStore } from "../store/useFinanceStore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SortDropdown from "./SortDropdown";
import Card from "./ui/Card";
import { exportToCSV, exportToJSON } from "../utils/export";

export default function TransactionsTable() {
  const {
    transactions,
    search,
    setSearch,
    sortBy,
    setSort,
    deleteTransaction,
    role,
  } = useFinanceStore();

  // 🔍 Filter
  let filtered = transactions.filter((t) =>
    (t.category || "")
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  // 🔄 Sort
  if (sortBy === "amount") {
    filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  } else {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center w-full">

          {/* Search */}
          <input
            placeholder="Search..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            className="
              px-3 py-2
              rounded-lg
              border border-slate-200 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-slate-800 dark:text-white
              text-sm
              outline-none
              focus:ring-2 focus:ring-indigo-400
              w-full sm:w-64
            "
          />

          {/* Sort */}
          <SortDropdown sortBy={sortBy} setSort={setSort} />

          {/* Export */}
          <div className="flex gap-2 sm:ml-auto w-full sm:w-auto">

            <button
              onClick={() => {
                exportToCSV(filtered);
                toast.success("CSV Exported");
              }}
              className="
                px-3 py-2 text-sm font-medium
                rounded-lg bg-green-500 text-white
                hover:bg-green-600
              "
            >
              CSV
            </button>

            <button
              onClick={() => {
                exportToJSON(filtered);
                toast.success("JSON Exported");
              }}
              className="
                px-3 py-2 text-sm font-medium
                rounded-lg bg-slate-700 text-white
                hover:bg-slate-800
              "
            >
              JSON
            </button>

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">

            {/* Head */}
            <thead>
              <tr className="border-b text-left text-slate-500 dark:text-slate-400 text-sm font-medium">
                <th className="py-2">Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                {role === "admin" && <th>Action</th>}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="
                    border-b
                    hover:bg-slate-50 dark:hover:bg-slate-800
                    transition-colors duration-150
                  "
                >
                  <td className="py-2 text-slate-700 dark:text-slate-300">
                    {t.date}
                  </td>

                  <td className="text-slate-700 dark:text-slate-300">
                    {t.category}
                  </td>

                  <td
                    className={
                      t.type === "income"
                        ? "text-green-500 font-medium"
                        : "text-red-400 font-medium"
                    }
                  >
                    ₹ {t.amount}
                  </td>

                  <td className="capitalize text-slate-600 dark:text-slate-400">
                    {t.type}
                  </td>

                  {role === "admin" && (
                    <td>
                      <button
                        onClick={() => {
                          deleteTransaction(t.id);
                          toast.success("Deleted");
                        }}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </Card>
    </motion.div>
  );
}