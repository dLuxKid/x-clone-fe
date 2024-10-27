"use client";

import AuthModal from "@/components/AuthModal";
import PageLoader from "@/components/Loader/PageLoader";
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
          user: { _id, email, displayname, username },
        },
      } = data;

      setUser({
        _id,
        email,
        username,
        displayname,
      });
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
        <AuthModal />
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
