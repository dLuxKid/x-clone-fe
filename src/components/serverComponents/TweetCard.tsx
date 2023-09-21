// types
import { tweetType } from "@/types/types"
// icons 
import { AiOutlineRetweet } from 'react-icons/ai'
import { BsChat, BsDot, BsThreeDots } from 'react-icons/bs'
import { IoShareOutline, IoStatsChart } from 'react-icons/io5'
// date formatter
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// components
import LikeBtn from "../clientComponents/LikeBtn"
import { getTweetCount, isTweetLiked } from "@/functions"

interface Props {
    tweet: tweetType
}

export default async function TweetCard({ tweet }: Props) {

    const res = await getTweetCount(tweet.id)
    const hasUserLikedTweet = await isTweetLiked(tweet.user_id, tweet.id)

    return (
        <div
            className='border-b-[0.5px] border-gray-600 flex space-x-4 p-4'
        >
            <div>
                <div className='w-10 h-10 bg-slate-200 rounded-full' />
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex items-center justify-between space-x-1'>
                    <div className='flex items-center space-x-1'>
                        <div className='font-bold'>{tweet.profiles.username}</div>
                        <div className='text-gray-500 font-normal'>@{tweet.profiles.email ?? ""}</div>
                        <div className='text-gray-500 mt-1'>
                            <BsDot />
                        </div>
                        <div className='text-gray-500'>{dayjs(tweet.created_at).fromNow()}</div>
                    </div>
                    <div className='rounded-full p-2 hover:bg-white/20 cursor-pointer'>
                        <BsThreeDots />
                    </div>
                </div>
                <div className='text-white text-base mt-1'>
                    {tweet.text}
                </div>
                <div className='bg-slate-400 rounded-2xl aspect-square h-96 w-full mt-2'></div>
                <div className='flex justify-between w-full mt-4'>
                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                        <BsChat />
                    </div>
                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                        <AiOutlineRetweet />
                    </div>
                    <LikeBtn tweetid={tweet.id} count={res.count} hasUserLikedTweet={hasUserLikedTweet} />
                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                        <IoStatsChart />
                    </div>
                    <div className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200'>
                        <IoShareOutline />
                    </div>
                </div>
            </div>
        </div>
    )
}
