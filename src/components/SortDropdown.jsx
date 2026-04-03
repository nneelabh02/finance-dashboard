import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function SortDropdown({ sortBy, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const options = [
    { label: "Sort by Date", value: "date" },
    { label: "Sort by Amount", value: "amount" },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o.value === sortBy);

  return (
    <div ref={ref} className="relative w-full sm:w-48">

      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center px-3 py-2 rounded-lg
          border border-slate-200 dark:border-slate-600
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-white
          text-sm shadow-sm
          transition-colors duration-100
        "
      >
        {selected?.label}
        <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="
              absolute mt-2 w-full z-50
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-600
              rounded-xl shadow-lg
              transition-colors duration-200
            "
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  setSort(opt.value);
                  setOpen(false);
                }}
                className={`
                  px-3 py-2 cursor-pointer text-sm
                  ${
                    sortBy === opt.value
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }
                `}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}