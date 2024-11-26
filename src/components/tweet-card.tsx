import pfp from "@/assets/default-pfp.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
import LikeBtn from "./like-btn";
import { formatDuration } from "@/lib/utils";
dayjs.extend(relativeTime);

interface Props {
  tweet: tweetType;
}

export default async function TweetCard({ tweet }: Props) {
  return (
    <div className="border-b-[0.5px] border-gray-600 flex space-x-3 p-2 md:p-4">
      <div className="size-10 flex-1">
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
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            <div className="font-bold text-sm sm:text-base">
              {tweet.user.displayname}
            </div>
            <div className="text-gray-500 font-normal text-sm sm:text-base">
              @{tweet.user.username}
            </div>
            <div className="text-gray-500 mt-1 text-xs sm:text-sm">
              <BsDot />
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">
              {formatDuration(tweet.createdAt.toString())}
            </div>
          </div>
          <div className="rounded-full p-2 hover:bg-white/20 cursor-pointer">
            <BsThreeDots />
          </div>
        </div>
        <div className="text-white text-base mt-0.5">{tweet.text}</div>
        {tweet.media && !!tweet.media.length && (
          <div
            className={`grid grid-length-${tweet.media.length} rounded-2xl overflow-hidden aspect-square h-96 w-full border-[0.25px] border-gray-900 mt-2`}
          >
            {tweet.media.map((media, i) => (
              <div
                key={i}
                className={`max-h-96 h-full w-full border-[0.25px] border-gray-900 media-${i} overflow-hidden`}
              >
                {media.includes(".mp4") ? (
                  <video
                    controls
                    className="h-full w-full max-w-full object-cover object-center"
                  >
                    <source src={media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={media}
                    alt={`Media ${i + 1}`}
                    className={`w-full max-w-full h-full object-cover object-center`}
                    height={100}
                    width={100}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between w-full mt-4">
          <div className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200">
            <BsChat />
          </div>
          <div className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition duration-200">
            <AiOutlineRetweet />
          </div>
          <LikeBtn
            tweet_id={tweet._id}
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
