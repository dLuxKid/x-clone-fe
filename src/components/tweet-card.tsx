import pfp from "@/assets/default-pfp.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
import LikeBtn from "./like-btn";
dayjs.extend(relativeTime);

interface Props {
  tweet: tweetType;
}

export default async function TweetCard({ tweet }: Props) {
  return (
    <div className="border-b-[0.5px] border-gray-600 flex space-x-3 p-2 md:p-4">
      <div>
        <Image
          src={tweet.user?.profile_picture || pfp}
          alt="profile picture"
          loading="lazy"
          width={10}
          height={10}
          className={`rounded-full h-10 w-10 object-fill object-center`}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between space-x-1">
          <div className="flex items-center space-x-1">
            <div className="font-bold">{tweet.user.displayname}</div>
            <div className="text-gray-500 font-normal">
              @{tweet.user.username}
            </div>
            <div className="text-gray-500 mt-1">
              <BsDot />
            </div>
            <div className="text-gray-500">
              {dayjs(tweet.createdAt).fromNow()}
            </div>
          </div>
          <div className="rounded-full p-2 hover:bg-white/20 cursor-pointer">
            <BsThreeDots />
          </div>
        </div>
        <div className="text-white text-base mt-0.5">{tweet.text}</div>
        <div className="bg-slate-400 rounded-2xl aspect-square h-96 w-full mt-2"></div>
        <div className="flex justify-between w-full mt-4">
          <div className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200">
            <BsChat />
          </div>
          <div className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200">
            <AiOutlineRetweet />
          </div>
          <LikeBtn
            tweetid={tweet._id}
            count={0}
            hasUserLikedTweet={false}
            userid={tweet.user._id}
          />
          <div className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200">
            <IoStatsChart />
          </div>
          <div className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200">
            <IoShareOutline />
          </div>
        </div>
      </div>
    </div>
  );
}
