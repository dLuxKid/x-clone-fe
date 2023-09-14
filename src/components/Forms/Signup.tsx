'use client'

// next
import { useRouter } from "next/navigation"
// react
import { useState } from "react"
// supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// components
import Loader from "../Loader/Loader"
import { Database } from "@/types/database.types"
import { Button } from "../ui/button"
// toast
import { toast } from "sonner"
// hooks
import { useAuthContext } from "@/context/AuthContext"

interface signupType { username: string, email: string, password: string }

interface Props {
    setFormType: React.Dispatch<React.SetStateAction<'signup' | 'login'>>
}

export default function Signup({ setFormType }: Props) {
    const router = useRouter()

    const supabase = createClientComponentClient<Database>()

    const [formValues, setFormValues] = useState<signupType>({ username: '', email: '', password: '' })
    const [loading, setLoading] = useState<boolean>(false)

    const { setUser } = useAuthContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await supabase.from('profiles').select().eq('username', formValues.email.trim())

            if (data?.length) {
                return toast.error('credentials already exists use another one')
            }

            const { data: { user }
            } = await supabase.auth.signUp({
                email: formValues.email,
                password: formValues.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })

            console.log(user)

            // @ts-ignore
            await supabase
                .from('profiles')
                .upsert(
                    [{ username: formValues.username, email: formValues.email, id: user?.id as string }],
                    { onConflict: ['id'], returning: ['*'] }
                )
            //  @ts-ignore
            setUser({ id: user.id as string, username: profileData[0].username, email: profileData[0].email })
            setLoading(false)
            router.push('/')
            toast.success('Successful')

        } catch (error: any) {
            console.log(error.message)
            setLoading(false)
            return toast.error(error.message)
        }

    }

    return (
        <>
            <h3 className="text-lg font-semibold mb-2">Please sign up to continue</h3>
            <form onSubmit={handleSignup} className="flex flex-col items-stretch justify-center gap-4 md:gap-6">
                <div>
                    <p className="text-sm text-gray-200 mb-1">Username</p>
                    <input type="text" placeholder="username" name="username" value={formValues.username} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                </div>
                <div>
                    <p className="text-sm text-gray-200 mb-1">Email</p>
                    <input type="text" placeholder="email" name="email" value={formValues.email} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                </div>
                <div>
                    <p className="text-sm text-gray-200 mb-1">Password</p>
                    <input type="text" placeholder="password" name="password" value={formValues.password} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                </div>
                <div className="flex justify-between gap-4 w-full items-center">
                    <p className="text-sm text-gray-500 cursor-pointer font-semibold hover:underline" onClick={() => setFormType('login')}>Login to your account</p>
                    <Button className="bg-blue-pry w-fit text-white hover:bg-blue-pry px-6 py-2 disabled:bg-neutral-400 disabled:hover:bg-neutral-400 disabled:cursor-not-allowed" onClick={handleSignup} disabled={loading}>
                        {loading ? <Loader /> : 'Signup'}
                    </Button>
                </div>
            </form>
        </>
    )
}
