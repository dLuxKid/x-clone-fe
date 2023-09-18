"use server";

import { Database } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export const likeTweet = async (tweetid: string, userid: string) => {
  const supabase = createServerActionClient<Database>({ cookies });

  await supabase.from("likes").insert({
    id: randomUUID(),
    tweet_id: tweetid,
    user_id: userid,
  });
};
