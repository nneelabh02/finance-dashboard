import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Settings,
  BarChart3,
  CreditCard,
  X,
} from "lucide-react";

export default function MobileSidebar({ open, setOpen, active, setActive }) {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: User, label: "Profile" },
    { icon: CreditCard, label: "Transactions" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed top-0 left-0 h-full w-64 p-6 bg-white dark:bg-[#1E293B] z-50 shadow-xl"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold text-indigo-500">
                Finance
              </h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, i) => {
                const Icon = item.icon;
                const isActive = active === item.label;

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActive(item.label);
                      setOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl cursor-pointer
                      ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}