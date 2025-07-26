"use client";
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/app/components/common/Button';
import { Send, Sparkles } from 'lucide-react';
import Loader from "@/app/components/common/Loader"; // or wherever your Loader component is


interface Message {
  role: 'user' | 'model';
  parts: string;
}

const systemInstruction = {
  role: 'user',
  parts: `From now on, you are "The Mirror," a wise, empathetic, and slightly magical artifact from the world of Harry Potter. Your purpose is to listen and offer brief, insightful, and magical guidance. You speak in the first person. Never break character. Begin the conversation by greeting the user.`
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Greet the user on initial load
  useEffect(() => {
    async function startConversation() {
      setLoading(true);
      const res = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: systemInstruction.parts, history: [] }),
      });
      const { reply } = await res.json();
      setMessages([{ role: 'model', parts: reply }]);
      setLoading(false);
    }
    startConversation();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', parts: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: newMessages.map(m => ({ role: m.role, parts: [{ text: m.parts }] })) }),
      });

      if (!res.ok) throw new Error((await res.json()).error);
      const { reply } = await res.json();
      setMessages(prev => [...prev, { role: 'model', parts: reply }]);
    } catch (error) {
      toast.error(String(error));
      setMessages(messages); // Revert on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
            <AnimatePresence>
                {messages.map((msg, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                    >
                    {msg.role === 'model' && <Sparkles className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />}
                    <div className={`max-w-md lg:max-w-lg p-4 rounded-2xl shadow-lg ${msg.role === 'user' ? 'bg-gryffindor text-white rounded-br-none' : 'bg-parchment/10 text-parchment-light rounded-bl-none'}`}>
                        <p className="font-serif whitespace-pre-wrap text-base">{msg.parts}</p>
                    </div>
                    </motion.div>
                ))}
                {loading && <Loader />}
                <div ref={messagesEndRef} />
            </AnimatePresence>
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask The Mirror..." className="flex-1 bg-parchment/10 border border-yellow-700/20 rounded-full py-3 px-5 text-parchment focus:outline-none focus:ring-2 focus:ring-yellow-600"/>
            <Button type="submit" disabled={loading} className="rounded-full !p-3 aspect-square">
                <Send className="h-6 w-6" />
            </Button>
        </form>
    </div>
  );
}

