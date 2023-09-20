'use client'

import { useAuthContext } from "@/context/AuthContext";
import { getTweetCount, likeTweet } from "@/functions";
import { useTransition } from "react";
import { AiOutlineHeart } from "react-icons/ai"
import { toast } from "react-toastify";

interface Props {
    tweetid: string
    count: number | null,
    idData: { id: string }[] | null
}

export default function LikeBtn({ tweetid, count, idData }: Props) {
    const { user } = useAuthContext()

    const [isLikePending, startTransition] = useTransition();

    return (
        <button
            title="like"
            type="button"
            className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200 flex justify-center items-center gap-3'
            disabled={isLikePending}
            onClick={() => {
                if (user) {
                    startTransition(() => {
                        likeTweet(tweetid, user.id)
                    })
                } else {
                    toast('Login to like tweet')
                }
            }
            }
        >
            <AiOutlineHeart className='w-5 h-5' />
            <span className="text-sm mb-[2px]">{count ?? 0}</span>
        </button>
    )
}
