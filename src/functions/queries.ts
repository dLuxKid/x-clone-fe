"use server";

// db
import { pool } from "@/lib/db";
// types
import { tweetType } from "@/types/types";
// supabase
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// next
import { cookies } from "next/headers";

// sql query
const q = `
SELECT tweets.*, COUNT(likes.id) AS likes_count,
        EXISTS(
            SELECT 1
            FROM likes
            WHERE likes.tweet_id = tweets.id
            AND likes.user_id = $1
        ) AS user_has_liked
FROM tweets
LEFT JOIN likes ON tweets.id = likes.tweet_id
GROUP BY tweets.id
ORDER BY tweets.created_at DESC;
`;

export async function fetchTweets() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getUser();

  pool.query(q, [data.user?.id], (error, result) => {
    if (error) {
      console.error("Error executing", error);
      return;
    }

    console.log(result);
  });

  // pool.end();

  return await supabase
    .from("tweets")
    .select(
      `
        *,
        profiles(
            email, username
        )
    `
    )
    .returns<tweetType[]>();
}

export async function getTweetCount(tweetId: string) {
  const supabase = createServerComponentClient({ cookies });
  return await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("tweet_id", tweetId);
}

export async function isTweetLiked(userid: string, tweetid: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", userid)
    .eq("tweet_id", tweetid)
    .single();

  return Boolean(data?.id);
}
