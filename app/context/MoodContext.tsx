"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

export type Mood = 'joy' | 'sadness' | 'anger' | 'calm' | 'neutral' | 'anxious';

interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [mood, setMood] = useState<Mood>('neutral');

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};