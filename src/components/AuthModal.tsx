'use client'

// react
import { useState } from "react"
// components
import Login from "./Forms/Login"
import Signup from "./Forms/Signup"


export default function AuthModal() {
    const [formType, setFormType] = useState<'login' | 'signup'>('login')

    return (
        <div className="fixed z-30 top-0 left-0 bottom-0 right-0 bg-white flex items-center justify-center">
            <div className="bg-black p-6 w-full max-w-lg shadow-xl rounded-2xl">
                {formType === 'login' && <Login setFormType={setFormType} />}
                {formType === 'signup' && <Signup setFormType={setFormType} />}
            </div>
        </div>
    )

}
