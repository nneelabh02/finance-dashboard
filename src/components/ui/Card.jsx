import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`
        bg-white/70 dark:bg-slate-900/40
        backdrop-blur-xl
        bg-clip-padding
        p-5 md:p-6
        rounded-2xl
        border border-white/40 dark:border-slate-600/40
        shadow-md dark:shadow-xl
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}