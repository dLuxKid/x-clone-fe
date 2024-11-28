"use client";

import { likeTweet, unlikeTweet } from "@/functions";
import { useState, useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

interface Props {
  tweet_id: string;
  userid: string;
  count: number;
  hasUserLikedTweet: boolean;
}

export default function LikeBtn({
  tweet_id,
  count,
  hasUserLikedTweet,
  userid,
}: Props) {
  const [isLikePending, startTransition] = useTransition();

  const [liked, setLiked] = useState(hasUserLikedTweet || false);
  const [noOfLikes, setNoOfLikes] = useState(count);

  return (
    <button
      title="like"
      type="button"
      className="cursor-pointer transition duration-200 flex justify-center items-center gap-2 [&>*:nth-child(1)]:hover:bg-white/10 hover:text-rose-600"
      disabled={isLikePending}
      onClick={async () => {
        if (userid) {
          const newLiked = !liked;
          const newNoOfLikes = newLiked ? noOfLikes + 1 : noOfLikes - 1;

          setLiked(newLiked);
          setNoOfLikes(newNoOfLikes);

          startTransition(async () => {
            try {
              if (newLiked) {
                await likeTweet(tweet_id);
              } else {
                await unlikeTweet(tweet_id);
              }
            } catch (error) {
              setLiked(liked);
              setNoOfLikes(count);
            }
          });
        } else {
          toast.info("Login to like tweet");
        }
      }}
    >
      {liked ? (
        <AiFillHeart className="p-2 h-fit w-fit rounded-full text-rose-600" />
      ) : (
        <AiOutlineHeart className="p-2 h-fit w-fit rounded-full" />
      )}
      <span className={`text-sm ${hasUserLikedTweet && "text-rose-600"}`}>
        {noOfLikes ?? 0}
      </span>
    </button>
  );
}
