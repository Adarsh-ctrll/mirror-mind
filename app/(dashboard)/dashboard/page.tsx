"use client";
import { useEffect, useState, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import MoodChart from '@/app/components/charts/MoodChart';
import Loader from '@/app/components/common/Loader';
import { getHouseForMood, HogwartsHouse, getHouseColors } from '@/lib/utils';
import { Trophy, BookOpenText, Feather } from 'lucide-react';

export default function DashboardPage() {
    const [user] = useAuthState(auth);
    const [entries, setEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userHouse, setUserHouse] = useState<HogwartsHouse>('Unsorted');

    // Fetches the user's assigned house from Firestore.
    useEffect(() => {
        if(user) {
            const userDocRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                if(doc.exists() && doc.data().house) {
                    setUserHouse(doc.data().house);
                }
            });
            return () => unsubscribe();
        }
    }, [user]);

    // Fetches all journal entries and performs the house sorting ceremony if needed.
    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'journalEntries'), where('uid', '==', user.uid), orderBy('createdAt', 'desc'));
            const unsubscribe = onSnapshot(q, async (snapshot) => {
                const fetchedEntries = snapshot.docs.map(doc => doc.data());
                setEntries(fetchedEntries);

                // Sort the user into a house after 5 entries.
                if (fetchedEntries.length >= 5 && userHouse === 'Unsorted') {
                    const moodCounts = fetchedEntries.reduce((acc, entry) => {
                        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>);

                    const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
                    const newHouse = getHouseForMood(dominantMood);
                    
                    if (newHouse !== 'Unsorted') {
                        const userDocRef = doc(db, 'users', user.uid);
                        await updateDoc(userDocRef, { house: newHouse });
                        toast.success(`The Mirror has sorted you into... ${newHouse}!`, { duration: 6000, icon: '🎉' });
                    }
                }
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, [user, userHouse]);

    // Calculates user stats.
    const stats = useMemo(() => {
        if (entries.length === 0) return { total: 0, dominantMood: 'N/A' };
        const moodCounts = entries.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, 'N/A');
        return { total: entries.length, dominantMood };
    }, [entries]);

    if (loading) return <Loader />;

    const houseColors = getHouseColors(userHouse);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {/* Stat Cards */}
                <StatCard icon={BookOpenText} label="Total Entries" value={stats.total} />
                <StatCard icon={Feather} label="Common Mood" value={stats.dominantMood} />
                <HouseCard house={userHouse} colors={houseColors} />
            </div>
            <MoodChart data={entries} />
        </motion.div>
    );
}

// Reusable Stat Card Component
const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <motion.div whileHover={{ y: -5 }} className="bg-black/40 p-6 rounded-lg border border-yellow-700/20">
        <Icon className="mx-auto h-10 w-10 text-yellow-500 mb-2" />
        <p className="font-lumos text-xl">{label}</p>
        <p className="font-harryp text-5xl capitalize">{value}</p>
    </motion.div>
);

// House Card Component
const HouseCard = ({ house, colors }: { house: HogwartsHouse, colors: any }) => (
     <motion.div whileHover={{ y: -5, boxShadow: `0px 0px 15px ${colors.secondary}` }} className="p-6 rounded-lg border" style={{ backgroundColor: colors.primary, borderColor: colors.secondary, color: colors.text }}>
         <Trophy className="mx-auto h-10 w-10 mb-2"/>
        <p className="font-lumos text-xl">Your House</p>
        <p className="font-harryp text-5xl">{house}</p>
    </motion.div>
);