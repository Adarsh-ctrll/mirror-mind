"use client";
import { motion } from "framer-motion";

interface JournalEntryProps {
  entry: {
    date: string;
    mood: string;
    text: string;
    reflection: string;
  };
}

export default function JournalEntry({ entry }: JournalEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-parchment/90 p-6 rounded-lg shadow-lg border border-yellow-800/20 text-gray-800 mb-6"
    >
      <div className="flex justify-between items-center mb-4 border-b border-yellow-800/10 pb-2">
        <h4 className="font-lumos text-xl capitalize">{entry.mood}</h4>
        <span className="font-sans text-sm text-gray-600">{entry.date}</span>
      </div>
      <p className="font-serif mb-4 whitespace-pre-wrap">{entry.text}</p>
      <div className="border-t border-yellow-800/10 pt-4 mt-4">
        <p className="font-lumos text-gray-700 italic">
          <span className="font-bold">The Mirror reflects:</span> {entry.reflection}
        </p>
      </div>
    </motion.div>
  );
}