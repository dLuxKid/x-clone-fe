"use client";

import AuthPage from "@/components/auth-page";
import PageLoader from "@/components/loader/page-loader";
import axiosInstance from "@/functions/client-axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<userType | null>(null);
  const [authIsReady, setAuthisReady] = useState<boolean>(false);

  const fetchUser = async () => {
    setAuthisReady(false);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthisReady(true);
      return setUser(JSON.parse(storedUser));
    }

    try {
      const { data } = await axiosInstance.get("/user/get-user");

      if (!data.data) return setUser(null);

      const {
        data: {
          user: { createdAt, __v, updatedAt, ...fetchedUser },
        },
      } = data;

      setUser(fetchedUser);
      localStorage.setItem("user", JSON.stringify(fetchedUser));
    } catch (error: any) {
      setUser(null);
      console.error(error.message);
      toast.error(error.message);
    }
    setAuthisReady(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const authContextValue: AuthContextType = { user, setUser };

  if (!authIsReady) return <PageLoader />;

  if (!user && authIsReady) {
    return (
      <AuthContext.Provider value={authContextValue}>
        <AuthPage />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    toast.error("useAuthContext must be used within an AuthProvider");
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
