"use client";
import { User } from "firebase/auth";

export default function Header({ user }: { user: User | null | undefined }) {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="bg-black/10 backdrop-blur-sm p-4 border-b border-yellow-700/20">
      <h2 className="text-2xl font-lumos text-parchment">
        {getGreeting()}, {user?.email?.split('@')[0] || 'Wizard'}.
      </h2>
    </header>
  );
}