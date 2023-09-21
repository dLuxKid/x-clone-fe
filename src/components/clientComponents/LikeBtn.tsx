'use client'

// react
import { useTransition } from "react";
// server functions
import { likeTweet } from "@/functions";
import { unlikeTweet } from "@/functions";
// icons
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// toast
import { toast } from "react-toastify";

interface Props {
    tweetid: string
    userid: string
    count: number | null,
    hasUserLikedTweet: boolean
}

export default function LikeBtn({ tweetid, count, hasUserLikedTweet, userid }: Props) {
    const [isLikePending, startTransition] = useTransition();

    return (
        <button
            title="like"
            type="button"
            className='cursor-pointer transition duration-200 flex justify-center items-center gap-2 [&>*:nth-child(1)]:hover:bg-white/10 hover:text-rose-600'
            disabled={isLikePending}
            onClick={() => {
                if (userid) {
                    startTransition(() => {
                        hasUserLikedTweet ? unlikeTweet(tweetid, userid) : likeTweet(tweetid, userid)
                    })
                } else {
                    toast('Login to like tweet')
                }
            }
            }
        >
            {hasUserLikedTweet ? <AiFillHeart className='p-2 h-fit w-fit rounded-full text-rose-600' /> : <AiOutlineHeart className='p-2 h-fit w-fit rounded-full' />}
            <span className={`text-sm ${hasUserLikedTweet && 'text-rose-600'}`}>{count ?? 0}</span>
        </button>
    )
}
