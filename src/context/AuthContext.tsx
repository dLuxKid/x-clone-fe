'use client'

import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
    authIsReady: boolean
}

interface userType {
    id: string;
    username: string;
    email: string;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<userType | null>(null);
    const [authIsReady, setAuthisReady] = useState<boolean>(false)

    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                supabase.auth.onAuthStateChange(async (event, session) => {
                    if (session?.user.id) {
                        const { data: profileData, error } = await supabase
                            .from('profiles')
                            .select('id, username, email')
                            .eq('id', session.user.id);

                        if (error) {
                            toast.error(error.message)
                            throw error;
                        }

                        if (profileData && profileData.length > 0) {
                            // @ts-ignore
                            const { username, email } = profileData[0];
                            setUser({ id: session.user.id, username, email });
                        } else {
                            toast.error('error fetching user, try again')
                            setUser(null);
                        }
                        setAuthisReady(true)
                    } else {
                        toast.error('error fetching user, try again')
                        setUser(null);
                    }
                });
            } catch (error: any) {
                console.error(error.message);
                toast.error(error.message);
                setAuthisReady(true)
            }
        };
        fetchUser();
    }, []);

    const authContextValue: AuthContextType = { user, setUser, authIsReady };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
