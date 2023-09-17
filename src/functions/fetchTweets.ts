"use server";

// types
import { tweetType } from "@/types/types";
// supabase
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// next
import { cookies } from "next/headers";

export default async function fetchTweets() {
  const supabase = createServerComponentClient({ cookies });

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
    .returns<tweetType>();
}
