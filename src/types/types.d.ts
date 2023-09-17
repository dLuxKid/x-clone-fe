import { Database } from "./database.types";

type tweetType = Array<
  Database["public"]["Tables"]["tweets"]["Row"] & {
    profiles: Pick<
      Database["public"]["Tables"]["profiles"]["Row"],
      "email" | "username"
    >;
  }
>;
