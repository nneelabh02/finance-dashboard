import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`
        bg-white dark:bg-slate-800
        p-5 md:p-6
        rounded-2xl
        border border-slate-100 dark:border-slate-700
        shadow-md dark:shadow-xl
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}