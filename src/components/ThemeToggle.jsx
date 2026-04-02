import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "light" : "dark");
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur border border-gray-200 dark:border-white/10"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}