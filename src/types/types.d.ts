import { Database } from "./database.types";

type tweetType = {
  id: string;
  text: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  username: string;
  email: string;
  likes_count: number;
  user_has_liked: boolean;
};
