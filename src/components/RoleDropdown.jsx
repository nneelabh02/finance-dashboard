import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Shield } from "lucide-react";

export default function RoleDropdown({ role, setRole }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const options = [
    { label: "Viewer", value: "viewer", icon: User },
    { label: "Admin", value: "admin", icon: Shield },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o.value === role);
  const Icon = selected?.icon;

  return (
    <div ref={ref} className="relative w-full sm:w-40">

      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          px-3 py-2 rounded-lg
          border border-slate-200 dark:border-slate-600
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-white
          text-sm
          shadow-sm
          hover:border-indigo-400
        "
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} />}
          <span className="capitalize">{role}</span>
        </div>

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
            "
          >
            {options.map((opt) => {
              const ItemIcon = opt.icon;

              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    setRole(opt.value);
                    setOpen(false);
                  }}
                  className={`
                    flex items-center gap-2 px-3 py-2 cursor-pointer text-sm
                    ${
                      role === opt.value
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }
                  `}
                >
                  <ItemIcon size={16} />
                  {opt.label}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}