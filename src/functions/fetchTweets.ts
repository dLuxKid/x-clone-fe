"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function fetchTweets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("tweets").select(`
        *,
        profiles(
            email, username
        )
    `);

  return { data, error };
}
