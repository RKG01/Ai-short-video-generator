import { pgTable, text, serial, varchar, boolean, json, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  subscription: boolean("subscription").default(false),
});

 
export const VideoData = pgTable("video_data", {
  id: serial("id").primaryKey(),
  script: json("script").notNull(),
  audioFileUrl: varchar("audio_file_url", { length: 255 }).notNull(),
  caption: json("caption").notNull(),
  imageList: varchar("image_list", { length: 255 }).array(),
  createdBy: varchar("created_by", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
