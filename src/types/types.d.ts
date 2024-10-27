import { Database } from "./database.types";

type tweetType = {
  _id: string;
  text: string;
  user: {
    _id: string;
    username: string;
    displayname: string;
    profile_picture: string;
  };
  media: string[];
  createdAt: Date;
  updatedAt: Date;
};
