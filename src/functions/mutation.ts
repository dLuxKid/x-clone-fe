"use server";

import { revalidatePath } from "next/cache";
import axiosInstance from "./server-axios";

export const likeTweet = async (tweet_id: string) => {
  await axiosInstance.post("/like/like-tweet", { tweet_id });

  revalidatePath("/");
};

export const unlikeTweet = async (tweet_id: string) => {
  await axiosInstance.delete("/like/unlike-tweet", { data: { tweet_id } });

  revalidatePath("/");
};

export async function sendTweet(data: { text: string; media: string[] }) {
  await axiosInstance.post("/tweet/create-tweet", data);

  revalidatePath("/");
}

export const revalidatePathOnClient = async (path?: string) =>
  revalidatePath(path || "/");
