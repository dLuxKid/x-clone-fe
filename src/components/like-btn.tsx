"use client";

import axiosInstance from "@/functions/client-axios";
import { useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

interface Props {
  tweet_id: string;
  userid: string;
  count: number | null;
  hasUserLikedTweet: boolean;
}

export default function LikeBtn({
  tweet_id,
  count,
  hasUserLikedTweet,
  userid,
}: Props) {
  const [isLikePending, startTransition] = useTransition();

  return (
    <button
      title="like"
      type="button"
      className="cursor-pointer transition duration-200 flex justify-center items-center gap-2 [&>*:nth-child(1)]:hover:bg-white/10 hover:text-rose-600"
      disabled={isLikePending}
      onClick={async () => {
        if (userid) {
          startTransition(async () => {
            hasUserLikedTweet
              ? await axiosInstance.delete("/like/unlike-tweet", {
                  data: { tweet_id },
                })
              : await axiosInstance.post("/like/like-tweet", { tweet_id });
          });
        } else {
          toast("Login to like tweet");
        }
      }}
    >
      {hasUserLikedTweet ? (
        <AiFillHeart className="p-2 h-fit w-fit rounded-full text-rose-600" />
      ) : (
        <AiOutlineHeart className="p-2 h-fit w-fit rounded-full" />
      )}
      <span className={`text-sm ${hasUserLikedTweet && "text-rose-600"}`}>
        {count ?? 0}
      </span>
    </button>
  );
}
