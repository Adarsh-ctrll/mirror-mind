"use client";
import { motion } from 'framer-motion';
import Button from '../common/Button';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-parchment p-8 m-4 rounded-lg shadow-2xl max-w-lg w-full text-center text-gray-800 border-2 border-yellow-700"
      >
        <h2 className="font-harryp text-5xl mb-4">Welcome to MirrorMind!</h2>
        <p className="font-lumos text-lg mb-6">
          Your enchanted journal awaits. Here, you can record your thoughts, track your mood, and receive reflections from The Mirror. Let your journey of self-discovery begin!
        </p>
        <Button onClick={onComplete}>
            Enter the Chamber
        </Button>
      </motion.div>
    </div>
  );
}