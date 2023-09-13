'use client'

import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";

const AuthContext = createContext<userType | undefined>(undefined)

interface userType {
    id: string,
    username: string
    email: string
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null)

    const supabase = createClientComponentClient<Database>()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                supabase.auth.onAuthStateChange(
                    async (event, session) => {
                        if (session?.user.id) {
                            const { data: profileData }
                                = await supabase.from('profiles').select('id, username, email').eq('id', session.user.id)
                            //  @ts-ignore
                            setUser({ id: user.id as string, username: profileData[0].username, email: profileData[0].email })
                            console.log(user)
                        } else {
                            setUser(null);
                        }
                    }
                )
            } catch (error: any) {
                console.log(error.message)
                return toast.error(error.message)
            }
        }
        fetchUser()
    }, [])

    return <AuthContext.Provider value={{ ...user as userType }}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthProvider
