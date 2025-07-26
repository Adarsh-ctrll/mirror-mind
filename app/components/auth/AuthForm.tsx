"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/common/Button"; // Correct path
import Input from "@/app/components/common/Input";   // Correct path
import Link from "next/link";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
}

export default function AuthForm({ isLogin, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setLoading(true);
    // This line causes the error if onSubmit is not provided
    await onSubmit(email, password); 
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "circOut" }}
      className="w-full max-w-md p-8 space-y-6 bg-parchment/90 backdrop-blur-sm rounded-lg shadow-2xl border border-yellow-700/30"
    >
      <div className="text-center">
        <h1 className="text-5xl font-harryp text-gray-900">MirrorMind</h1>
        <p className="font-lumos text-gray-700 mt-2 text-lg">
          {isLogin ? "Unlock Your Thoughts" : "Create Your Magical Account"}
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          id="email"
          type="email"
          label="Your Scroll (Email)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          label="Secret Word (Password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <Button type="submit" loading={loading} className="w-full">
          {isLogin ? "Enter" : "Begin"}
        </Button>
      </form>
      <div className="text-center font-lumos text-sm">
        {isLogin ? (
          <p className="text-gray-700">
            First time here?{" "}
            <Link href="/signup" className="font-bold text-gryffindor hover:underline">
              Join the magic.
            </Link>
          </p>
        ) : (
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-gryffindor hover:underline">
              Sign in.
            </Link>
          </p>
        )}
      </div>
    </motion.div>
  );
}