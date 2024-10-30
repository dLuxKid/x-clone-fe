"use server";

import { revalidatePath } from "next/cache";
import axiosInstance from "./server-axios";

// export const likeTweet = async (tweetid: string, userid: string) => {
//   const supabase = createServerActionClient<Database>({ cookies });

//   await supabase.from("likes").insert({
//     id: randomUUID(),
//     tweet_id: tweetid,
//     user_id: userid,
//   });

//   revalidatePath("/");
// };

// export const unlikeTweet = async (tweetid: string, userid: string) => {
//   const supabase = createServerActionClient<Database>({ cookies });

//   await supabase
//     .from("likes")
//     .delete()
//     .eq("user_id", userid)
//     .eq("tweet_id", tweetid);

//   revalidatePath("/");
// };

export async function sendTweet(data: { text: string; media: string[] }) {
  await axiosInstance.post("/tweet/create-tweet", data);

  revalidatePath("/");
}

export const revalidatePathOnClient = async (path?: string) =>
  revalidatePath(path || "/");
