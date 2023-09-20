'use client'

// react
import { useState, useRef } from "react";
// server functions
import { sendTweet } from "@/functions";
// toastify
import { toast } from "react-toastify";
// components
import Loader from "../Loader/Loader";

interface Props {
    fetchTweetUponSend: () => void
}

export default function ComposeTweet() {
    const [pending, setPending] = useState<boolean>(false)

    const btnRef = useRef<HTMLButtonElement>(null)

    const handleAction = async (formData: FormData) => {
        setPending(true)

        const tweet = formData.get("tweet");
        if (!tweet) {
            setPending(false)
            return
        };

        try {
            const res = await sendTweet(tweet as string)
            if (res?.userError) {
                setPending(false)
                return toast.error(res?.userError?.message)
            }

            if (res?.error) {
                setPending(false)
                return toast.error(res?.error?.message)
            }

            setPending(false)
            btnRef.current?.click()
            return toast.success('tweet sent successfully')
        } catch (error: any) {
            setPending(false)
            return toast.error(error.message)
        }
    }

    return (
        <form className='flex flex-col w-full space-y-2' action={handleAction}>
            <input
                type='text'
                name='tweet'
                placeholder="What's happening?!"
                className='w-full h-full bg-transparent outline-none p-4 text-xl placeholder:text-gray-600'
            />
            <div className='w-full flex justify-between items-center'>
                <div></div>
                <div className='w-full max-w-[100px]'>
                    <button
                        title='tweet'
                        type='submit'
                        className='bg-blue-pry rounded-full px-6 py-2 w-full text-lg font-semibold text-center hover:bg-opacity-80 transition duration-200 disabled:opacity-80 flex items-center justify-center'
                        disabled={pending}
                    >
                        {pending ? <Loader /> : 'Tweet'}
                    </button>
                    <button title="reset" className="hidden" type="reset" ref={btnRef}></button>
                </div>
            </div>
        </form>
    )
}

