import { useState } from "react";
import { useFinanceStore } from "../store/useFinanceStore";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useFinanceStore();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const handleSubmit = () => {
    if (!form.amount || !form.category || !form.date) {
      toast.error("Fill all fields");
      return;
    }

    addTransaction({
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    });

    toast.success("Transaction added");

    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-md border border-slate-200 dark:border-slate-600 shadow-lg">

              <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                Add Transaction
              </h2>

              <div className="space-y-3">

                <input
                  placeholder="Amount"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />

                <input
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />

                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />

              </div>

              <div className="flex justify-end gap-2 mt-5">

                <button onClick={onClose} className="text-sm text-white bg-slate-600 px-3 py-2 rounded-lg hover:bg-slate-700">
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add
                </button>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}