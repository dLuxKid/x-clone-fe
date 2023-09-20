'use client'

// next
import { useRouter } from "next/navigation"
// react
import { useState } from "react"
// supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// components
import { Database } from "@/types/database.types"
import { Button } from "../ui/button"
import Loader from "../Loader/Loader"
// tost
import { toast } from "react-toastify"
// hooks
import { useAuthContext } from "@/context/AuthContext"


interface loginType { email: string, password: string }

interface Props {
    setFormType: React.Dispatch<React.SetStateAction<'signup' | 'login'>>
}

export default function Login({ setFormType }: Props) {
    const router = useRouter()

    const supabase = createClientComponentClient<Database>()

    const [formValues, setFormValues] = useState<loginType>({ email: '', password: '' })
    const [loading, setLoading] = useState<boolean>(false)

    const { setUser } = useAuthContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!formValues.email || !formValues.password) {
            setLoading(false)
            return toast.error('Please fill in values')
        }

        try {
            const { data } = await supabase.auth.signInWithPassword({
                email: formValues.email,
                password: formValues.password
            })

            const { data: profileData }
                = await supabase.from('profiles').select('id, username, email').eq('id', data.user?.id as string)

            //  @ts-ignore
            setUser({ id: data.user?.id as string, username: profileData[0].username, email: profileData[0].email })
            router.push('/')
            toast.success('Login successful')
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            return toast.error(error.message)
        }
    }

    return (
        <>
            <h3 className="text-lg font-semibold mb-2">Please login to continue</h3>
            <form onSubmit={handleLogin} className="flex flex-col items-stretch justify-center gap-4 md:gap-6">
                <div>
                    <p className="text-sm text-gray-200 mb-1">Email</p>
                    <input type="text" placeholder="email" name="email" value={formValues.email} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                </div>
                <div>
                    <p className="text-sm text-gray-200 mb-1">Password</p>
                    <input type="text" placeholder="password" name="password" value={formValues.password} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                </div>
                <div className="flex justify-between gap-4 w-full items-center">
                    <p className="text-sm text-gray-500 cursor-pointer font-semibold hover:underline" onClick={() => setFormType('signup')}>Create account</p>
                    <Button className="bg-blue-pry min-w-[100px] w-fit text-white hover:bg-blue-pry px-6 py-2 disabled:cursor-not-allowed" onClick={handleLogin} disabled={loading}>
                        {loading ? <Loader /> : 'Login'}
                    </Button>
                </div>
            </form>
        </>
    )
}
