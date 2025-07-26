"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { Mood } from '@/app/context/MoodContext';

const moodColors: Record<Mood, string> = {
  neutral: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
  joy: 'radial-gradient(ellipse at bottom, #FFD700 0%, #FDB813 100%)',
  sadness: 'radial-gradient(ellipse at bottom, #0E1A40 0%, #080D20 100%)',
  anger: 'radial-gradient(ellipse at bottom, #740001 0%, #3B0000 100%)',
  calm: 'radial-gradient(ellipse at bottom, #1A472A 0%, #0D2415 100%)',
  anxious: 'radial-gradient(ellipse at bottom, #500778 0%, #28033d 100%)',
};

const Star = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, repeatType: 'reverse' }}
    style={style}
  />
);

export default function MagicalBackground({ mood }: { mood: Mood }) {
  const stars = useMemo(() => Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
    },
  })), []);

  return (
    <AnimatePresence>
      <motion.div
        key={mood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 h-full w-full"
        style={{ background: moodColors[mood] }}
      >
        {stars.map(star => <Star key={star.id} style={star.style} />)}
      </motion.div>
    </AnimatePresence>
  );
}