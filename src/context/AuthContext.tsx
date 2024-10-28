"use client";

import AuthPage from "@/components/auth-page";
import PageLoader from "@/components/loader/page-loader";
import axiosInstance from "@/functions/client-axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

interface userType {
  _id: string;
  username: string;
  displayname: string;
  email: string;
  profile_picture?: string;
  banner_picture?: string;
  bio?: string;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<userType | null>(null);
  const [authIsReady, setAuthisReady] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/user/get-user");

      if (!data.data) return setUser(null);

      const {
        data: {
          user: { createdAt, __v, updatedAt, ...fetchedUser },
        },
      } = data;

      setUser(fetchedUser);
    } catch (error: any) {
      setUser(null);
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setAuthisReady(true);
    }
  };

  useEffect(() => {
    setAuthisReady(false);
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
