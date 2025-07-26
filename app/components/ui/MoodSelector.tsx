"use client";
import { motion } from "framer-motion";
import { useMood, Mood } from "@/app/context/MoodContext";
import { Sun, CloudRain, Angry, Waves, Wind, Star } from 'lucide-react';

const moodOptions: { mood: Mood; icon: React.ElementType, color: string }[] = [
  { mood: 'joy', icon: Sun, color: 'hover:text-yellow-400' },
  { mood: 'sadness', icon: CloudRain, color: 'hover:text-blue-400' },
  { mood: 'anger', icon: Angry, color: 'hover:text-red-500' },
  { mood: 'calm', icon: Waves, color: 'hover:text-green-400' },
  { mood: 'anxious', icon: Wind, color: 'hover:text-purple-400' },
  { mood: 'neutral', icon: Star, color: 'hover:text-gray-400' },
];

export default function MoodSelector() {
  const { mood, setMood } = useMood();

  return (
    <div className="mb-8">
        <h3 className="text-center font-lumos text-xl text-parchment-light mb-4">How are you feeling, wizard?</h3>
        <div className="flex justify-center items-center space-x-2 md:space-x-4">
        {moodOptions.map((option) => (
            <motion.div
            key={option.mood}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMood(option.mood)}
            className={`p-3 rounded-full cursor-pointer transition-colors duration-300 ${
                mood === option.mood ? 'bg-yellow-700/40 text-parchment' : 'text-parchment-dark bg-black/30'
            } ${option.color}`}
            >
            <option.icon className="h-6 w-6 md:h-8 md:w-8" />
            </motion.div>
        ))}
        </div>
    </div>
  );
}