import { pgTable, unique, pgEnum, uuid, timestamp, text, varchar, foreignKey, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const profiles = pgTable("profiles", {
	id: uuid("id").primaryKey().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	username: text("username").notNull(),
	email: varchar("email").default('').notNull(),
},
(table) => {
	return {
		profilesUsernameKey: unique("profiles_username_key").on(table.username),
	}
});

export const tweets = pgTable("tweets", {
	id: uuid("id").primaryKey().notNull(),
	text: text("text").notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
});

export const hashtags = pgTable("hashtags", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const replies = pgTable("replies", {
	id: uuid("id").primaryKey().notNull(),
	text: text("text").notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" } ),
	tweetId: uuid("tweet_id").references(() => tweets.id, { onDelete: "cascade" } ),
	replyId: uuid("reply_id"),
},
(table) => {
	return {
		repliesReplyIdFkey: foreignKey({
			columns: [table.replyId],
			foreignColumns: [table.id]
		}).onDelete("cascade"),
	}
});

export const likes = pgTable("likes", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" } ),
	tweetId: uuid("tweet_id").notNull().references(() => tweets.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
},
(table) => {
	return {
		likeUnique: unique("like_unique").on(table.userId, table.tweetId),
	}
});

export const bookmarks = pgTable("bookmarks", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => profiles.id, { onDelete: "cascade" } ),
	tweetId: uuid("tweet_id").references(() => tweets.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
},
(table) => {
	return {
		bookmarkUnique: unique("bookmark_unique").on(table.userId, table.tweetId),
	}
});

export const tweetHashtag = pgTable("tweet_hashtag", {
	tweetId: uuid("tweet_id").notNull().references(() => tweets.id, { onDelete: "cascade" } ),
	hashtagId: uuid("hashtag_id").notNull().references(() => hashtags.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		tweetHashtagPkey: primaryKey(table.tweetId, table.hashtagId)
	}
});