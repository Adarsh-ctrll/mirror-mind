"use client";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from './components/common/Loader';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/journal');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return <Loader />;
}