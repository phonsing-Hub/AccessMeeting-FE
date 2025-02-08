import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import Loading from "@/components/loading";
import axios from "axios";

interface AuthContextProps {
  authData: any | null;
  setAuthData: (data: any | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState<any | null>(null);

  const checkAuth = async (token: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin`, {
        headers: { Authorization: token },
      });

      if (res.status === 200) {
        setAuthData(res.data); // ✅ เก็บข้อมูลผู้ใช้
        setIsLoading(false);
        console.log("User Data:", res.data);
      }
    } catch (error) {
      console.error("Authentication failed", error);
      localStorage.removeItem("token");
      setAuthData(null);
      setIsLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTimeout(() => {
      if (!token) {
        setIsLoading(false);
        navigate("/login");
      } else {
        checkAuth(token);
      }
    }, 1000);
  }, []);

  const authContextValue = useMemo(() => ({ authData, setAuthData }), [authData]);

  if (isLoading) return <Loading />;

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}