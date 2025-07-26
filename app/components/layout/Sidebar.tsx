"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, BarChart2, MessageSquare, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const navItems = [
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Dashboard", href: "/dashboard", icon: BarChart2 },
  { name: "Chat", href: "/chat", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Mischief Managed!");
      router.push("/login");
    } catch (error) {
      toast.error("Could not sign out.");
    }
  };

  return (
    <aside className="hidden md:flex w-64 bg-black/30 backdrop-blur-md p-4 flex-col justify-between border-r border-yellow-700/20">
      <div>
        <div className="text-center py-4 mb-8">
          <Link href="/journal">
            <h1 className="text-4xl font-harryp text-parchment-light cursor-pointer">MirrorMind</h1>
          </Link>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link href={item.href}>
                  <motion.div
                    className={`flex items-center p-3 rounded-lg font-lumos text-lg cursor-pointer transition-colors duration-300 ${
                      pathname === item.href
                        ? "bg-yellow-700/30 text-parchment"
                        : "text-parchment-dark hover:bg-yellow-700/10 hover:text-parchment"
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <item.icon className="mr-4 h-5 w-5" />
                    {item.name}
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <motion.button
          onClick={handleSignOut}
          className="flex items-center p-3 w-full rounded-lg font-lumos text-lg text-parchment-dark hover:bg-gryffindor/50 hover:text-parchment transition-colors duration-300"
          whileHover={{ x: 5, color: '#FBF5E6' }}
        >
          <LogOut className="mr-4 h-5 w-5" />
          Sign Out
        </motion.button>
      </div>
    </aside>
  );
}