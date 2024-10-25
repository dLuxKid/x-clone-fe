"use server";

// supabase
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// next
import { cookies } from "next/headers";

// sql query
const q = `
SELECT tweets.*, profiles.username AS username, profiles.email AS email, COUNT(likes.id) AS likes_count,
        EXISTS(
            SELECT 1
            FROM likes
            WHERE likes.tweet_id = tweets.id
            AND likes.user_id = $1
        ) AS user_has_liked
FROM tweets
LEFT JOIN likes ON tweets.id = likes.tweet_id
JOIN profiles ON tweets.user_id = profiles.id
GROUP BY tweets.id, profiles.username, profiles.email
ORDER BY tweets.created_at DESC;
`;

export async function fetchTweets() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getUser();

  try {
    const result = await pool.query(q, [data.user?.id]);
    return { data: result.rows, error: null };
  } catch (error: any) {
    console.error("Error executing", error);
    return { data: null, error: error.message };
  }
}
