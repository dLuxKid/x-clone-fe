"use server";

import axiosInstance from "./server-axios";

export async function fetchTweets() {
  try {
    const {
      data: {
        data: { tweets },
      },
    } = await axiosInstance.get("/tweet/get-tweets");

    return { tweets, error: null };
  } catch (error: any) {
    console.error("Error executing", error);
    return { tweets: null, error: error.message };
  }
}
