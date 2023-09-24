"use server";

// types
import { Database } from "@/types/database.types";
// supabase
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
// id generator
import { randomUUID } from "crypto";
// next
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const likeTweet = async (tweetid: string, userid: string) => {
  const supabase = createServerActionClient<Database>({ cookies });

  await supabase.from("likes").insert({
    id: randomUUID(),
    tweet_id: tweetid,
    user_id: userid,
  });

  revalidatePath("/");
};

export const unlikeTweet = async (tweetid: string, userid: string) => {
  const supabase = createServerActionClient<Database>({ cookies });

  await supabase
    .from("likes")
    .delete()
    .eq("user_id", userid)
    .eq("tweet_id", tweetid);

  revalidatePath("/");
};

export async function sendTweet(tweet: string) {
  const supabase = createServerActionClient<Database>({ cookies });

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (userError) return { userError };

  const { error } = await supabase.from("tweets").insert({
    text: tweet,
    id: randomUUID(),
    user_id: userData.session?.user.id as string,
  });

  revalidatePath("/");

  return { error };
}
