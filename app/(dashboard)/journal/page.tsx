"use client";
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useMood } from '@/app/context/MoodContext';
import MoodSelector from '@/app/components/ui/MoodSelector';
import Button from '@/app/components/common/Button';
import JournalEntry from '@/app/components/ui/JournalEntry';
import Loader from '@/app/components/common/Loader';

export default function JournalPage() {
  const [user, authLoading] = useAuthState(auth);
  const { setMood } = useMood();
  const [entryText, setEntryText] = useState('');
  const [pastEntries, setPastEntries] = useState<any[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true); // Start as true


  useEffect(() => {
    // Do not proceed if the user is still loading from auth.
    if (authLoading) {
      setHistoryLoading(true);
      return;
    }

    // Do not proceed if there is no user logged in.
    if (!user) {
      setHistoryLoading(false); // Stop loading if no user
      return;
    }

    // We have a confirmed user, now create the query.
    const entriesCollection = collection(db, 'journalEntries');
    const q = query(
      entriesCollection,
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),

        date: doc.data().createdAt?.toDate().toLocaleDateString() ?? 'Just now',
      }));
      setPastEntries(entries);
      setHistoryLoading(false); 
    }, (error) => {

      console.error("Firestore Error:", error);
      toast.error("Could not fetch past entries. Check security rules and indexes.");
      setHistoryLoading(false);
    });

    // This is the cleanup function. It runs when the component is unmounted.
    return () => {
      unsubscribe();
    };

  }, [user, authLoading]); // Re-run this effect when the user or authLoading state changes.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryText.trim()) {
      toast.error("Your parchment is empty!");
      return;
    }
    setApiLoading(true);
    toast.loading("The Mirror is reflecting...");

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ journalEntry: entryText }),
      });

      if (!res.ok) throw new Error((await res.json()).error || 'Something went wrong');
      
      const { mood: aiMood, reflection } = await res.json();
      setMood(aiMood);

      await addDoc(collection(db, 'journalEntries'), {
        uid: user?.uid,
        mood: aiMood,
        text: entryText,
        reflection,
        createdAt: serverTimestamp(),
      });

      toast.dismiss();
      toast.success("Your thoughts have been recorded.");
      setEntryText('');
    }  catch (error) {
  toast.dismiss();
  // Safely handle the error object
  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
  toast.error(errorMessage);
}

};

  if (authLoading) {
    return <Loader />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <MoodSelector />
      <form onSubmit={handleSubmit} className="mb-12">
        <motion.div className="bg-parchment/10 p-4 rounded-lg border border-yellow-700/20" whileFocus={{ scale: 1.02 }}>
          <textarea
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder="What's on your mind? The Mirror is listening..."
            className="w-full h-48 bg-transparent text-parchment-light placeholder-parchment-dark/50 resize-none focus:outline-none font-serif text-lg"
            disabled={apiLoading}
          />
        </motion.div>
        <div className="text-center mt-6">
          <Button type="submit" loading={apiLoading}>Seal Your Thoughts</Button>
        </div>
      </form>
      <div>
        <h3 className="font-harryp text-4xl text-center mb-6 text-parchment border-b-2 border-yellow-700/20 pb-2">
          Past Reflections
        </h3>
        {historyLoading ? (
          <div className="flex justify-center items-center h-40"><Loader /></div>
        ) : pastEntries.length > 0 ? (
          pastEntries.map(entry => <JournalEntry key={entry.id} entry={entry} />)
        ) : (
          <p className="text-center font-lumos text-parchment-dark">Your journal is waiting for its first story.</p>
        )}
      </div>
    </motion.div>
  );
}