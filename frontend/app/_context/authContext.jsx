"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const { createContext, useEffect, useContext, useState } = require("react");

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [token, setToken] = useState(null);
  const router = useRouter();

  async function LoginUser(email, password) {
    setLoading(true);
    try {
      const resp = await axios.post("https://note-app-backend-7628.onrender.com/user/login", { email, password });

      if (resp.status === 200) {
        toast.success("Login successful");
        const token = resp.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(resp.data.user)); // Store user in localStorage
        setUser(resp.data.user);
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); // Restore user from storage
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  function LogoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ loading, user, LoginUser, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}