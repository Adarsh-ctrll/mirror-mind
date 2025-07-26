"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../components/common/Loader";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import MagicalBackground from "../components/ui/MagicalBackground";
import { MoodProvider, useMood } from "../context/MoodContext";

// Inner component to access mood context
function DashboardUI({ children }) {
    const { mood } = useMood();
    const [user] = useAuthState(auth);

    return (
        <div className="relative min-h-screen bg-black">
            <MagicalBackground mood={mood} />
            <div className="relative z-10 flex h-screen">
                <Sidebar />
                <main className="flex-1 flex flex-col h-screen overflow-y-hidden">
                    <Header user={user} />
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

// Main layout component
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <MoodProvider>
      <DashboardUI>{children}</DashboardUI>
    </MoodProvider>
  );
}