"use client";
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center w-24 h-24 rounded-full bg-yellow-500/20"
      >
        <Sparkles className="w-12 h-12 text-yellow-400" />
      </motion.div>
      <p className="mt-4 font-lumos text-lg text-parchment-light">The magic is happening...</p>
    </div>
  );
}