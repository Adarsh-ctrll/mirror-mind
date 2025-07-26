"use client";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ children, className, loading = false, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgb(255,255,255)", boxShadow: "0px 0px 8px rgb(116,0,1)" }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-6 py-2 font-harryp text-2xl rounded-md text-parchment-light bg-gryffindor disabled:opacity-50 transition-all duration-300 ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? "Mischief in Progress..." : children}
    </motion.button>
  );
}