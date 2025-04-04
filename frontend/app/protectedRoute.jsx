"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./_context/authContext";
import { LoaderPinwheel } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen xl:ml-[40rem] ml-[30rem]">
        <LoaderPinwheel size={80} className="animate-spin w-32 text-blue-500" />
      </div>
    );
  }

  return user ? children : null;
}
