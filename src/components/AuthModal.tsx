'use client'

// next
import { useRouter } from "next/navigation"
// react
import { useEffect, useState } from "react"
// supabase
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// components
import { Database } from "@/types/database.types"
import { Button } from "./ui/button"
import { Dialog, DialogContent } from "./ui/dialog"
import { toast } from "sonner"


interface loginType { email: string, password: string, username: '' }


export default function AuthModal() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [formValues, setFormValues] = useState<loginType>({ email: '', password: '', username: '' })

    useEffect(() => {
        const fetchUser = async () => {
            const user = await supabase.auth.getUser()
            user.data.user ? setIsOpen(false) : setIsOpen(true)
        }
        fetchUser()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const { data } = await supabase.from('profiles').select().eq('username', formValues.email.trim())

            if (data?.length) {
                return toast.error('credentials already exists use another one')
            }

            const { data: { user }
            } = await supabase.auth.signInWithPassword({
                email: formValues.email,
                password: formValues.password,
            })

            console.log(user)

            // // @ts-ignore
            // await supabase
            //     .from('profiles')
            //     .upsert(
            //         [{ username: formValues.username, email: formValues.email, id: user?.id as string }],
            //         { onConflict: ['id'], returning: ['*'] }
            //     )

            toast.success('Successful')
            router.refresh()

        } catch (error: any) {
            console.log(error.message)
            return toast.error(error.message)
        }

    }


    return (
        <>
            <Dialog open={isOpen}>
                <DialogContent className="bg-black p-6">
                    <h3 className="text-lg my-1">Please sign up to continue</h3>
                    <form onSubmit={handleSignup}>
                        <p className="text-sm text-gray-200 my-2">Username</p>
                        <input type="text" placeholder="username" name="username" value={formValues.username} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                        <p className="text-sm text-gray-200 my-2">Email</p>
                        <input type="text" placeholder="email" name="email" value={formValues.email} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                        <p className="text-sm text-gray-200 my-2">Password</p>
                        <input type="text" placeholder="password" name="password" value={formValues.password} onChange={handleChange} className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none" />
                        <div className="flex w-full justify-end mt-4">
                            <Button className="bg-blue-pry text-white hover:bg-blue-pry" onClick={handleSignup}>Login</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
