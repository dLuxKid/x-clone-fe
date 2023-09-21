export { likeTweet, sendTweet, unlikeTweet } from "./mutation";
export { fetchTweets, getTweetCount, isTweetLiked } from "./queries";

// sql query
var q = `
SELECT tweets.*, COUNT(likes.id) AS likes_count,
        EXISTS(
            SELECT 1
            FROM likes
            WHERE likes.tweet_id = tweets.id
            AND likes.user_id = 'your user id'
        ) AS user_has_liked
FROM tweets
LEFT JOIN likes ON tweets.id = likes.tweet_id
GROUP BY tweets.id
ORDER BY tweets.created_at DESC;
`;
