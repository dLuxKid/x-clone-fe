"use server";

import { Database } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export default async function sendTweet(formData: FormData) {
  const tweet = formData.get("tweet");
  if (!tweet) return;

  const supabase = createServerActionClient<Database>({ cookies });

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (userError) return { userError };

  const { error } = await supabase.from("tweets").insert({
    text: tweet as string,
    id: randomUUID(),
    user_id: userData.session?.user.id as string,
  });

  return { error };
}
