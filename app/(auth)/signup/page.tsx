"use client";
import AuthForm from "@/app/components/auth/AuthForm"; // Import the engine
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  // These are the instructions for the engine
  const handleSignup = async (email:string, password:string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
        house: null,
      });

      toast.success("Welcome to MirrorMind, the journey begins!");
      router.push("/journal");
    } catch (error) {
        const firebaseError = error as { code?: string; message: string };
        toast.error(firebaseError.message || "An unknown error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-marauders-map bg-cover p-4">
      {/* Here, we put the engine in the car and give it the instructions */}
      <AuthForm isLogin={false} onSubmit={handleSignup} />
    </div>
  );
}