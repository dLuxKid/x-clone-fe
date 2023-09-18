"use server";

import { Database } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function sendTweet(tweet: string) {
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
