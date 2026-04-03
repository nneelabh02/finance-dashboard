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

  return (
    <div className="min-h-screen w-64 p-6 bg-white dark:bg-[#1E293B] border-r border-slate-100 dark:border-slate-700">

      <h2 className="text-xl font-semibold text-indigo-500 mb-8">
        Finance
      </h2>

      <div className="space-y-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.label;

          return (
            <div
              key={i}
              onClick={() => setActive(item.label)}
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
    </div>
  );
}